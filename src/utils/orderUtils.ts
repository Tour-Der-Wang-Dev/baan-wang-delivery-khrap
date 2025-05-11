
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MenuItem } from './restaurantUtils';
import { Address } from './addressUtils';

export type CartItem = {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
};

export type Order = {
  id: string;
  user_id: string;
  restaurant_id: string;
  driver_id: string | null;
  status: string;
  total_price: number;
  delivery_address_id: string | null;
  payment_method: string | null;
  payment_status: string | null;
  delivery_notes: string | null;
  created_at: string;
  updated_at: string;
};

export type OrderItem = {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  notes: string | null;
  created_at: string;
};

export type OrderDetails = Order & {
  restaurant: {
    name: string;
    address: string;
    phone: string | null;
  };
  items: (OrderItem & {
    menu_item: {
      name: string;
      price: number;
    };
  })[];
  delivery_address?: Address;
};

export const createOrder = async (
  restaurantId: string,
  cartItems: CartItem[],
  deliveryAddressId: string,
  paymentMethod: string,
  deliveryNotes?: string
): Promise<Order | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('คุณยังไม่ได้เข้าสู่ระบบ');
      return null;
    }
    
    if (!cartItems.length) {
      toast.error('ไม่พบรายการอาหารในตะกร้า');
      return null;
    }

    // Calculate total price
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0
    );

    // Create the order
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert([
        {
          user_id: user.id,
          restaurant_id: restaurantId,
          total_price: totalPrice,
          delivery_address_id: deliveryAddressId,
          payment_method: paymentMethod,
          delivery_notes: deliveryNotes,
        },
      ])
      .select()
      .single();

    if (orderError) {
      toast.error('ไม่สามารถสร้างออเดอร์ได้', {
        description: orderError.message,
      });
      throw orderError;
    }

    // Insert order items
    const orderItems = cartItems.map((item) => ({
      order_id: orderData.id,
      menu_item_id: item.menuItem.id,
      quantity: item.quantity,
      price: item.menuItem.price,
      notes: item.notes,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      toast.error('ไม่สามารถบันทึกรายการอาหารได้', {
        description: itemsError.message,
      });
      throw itemsError;
    }

    toast.success('สั่งอาหารสำเร็จ', {
      description: `หมายเลขออเดอร์: ${orderData.id.substring(0, 8)}`,
    });

    return orderData as Order;
  } catch (error) {
    console.error('Error creating order:', error);
    return null;
  }
};

export const fetchUserOrders = async (): Promise<Order[]> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('ไม่สามารถดึงข้อมูลออเดอร์ได้', {
        description: error.message,
      });
      throw error;
    }

    return data as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const getOrderDetails = async (orderId: string): Promise<OrderDetails | null> => {
  try {
    // Fetch the order with restaurant info
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select(`
        *,
        restaurant:restaurants (
          name,
          address,
          phone
        )
      `)
      .eq('id', orderId)
      .single();

    if (orderError) {
      toast.error('ไม่สามารถดึงข้อมูลออเดอร์ได้', {
        description: orderError.message,
      });
      throw orderError;
    }

    // Fetch order items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select(`
        *,
        menu_item:menu_items (
          name,
          price
        )
      `)
      .eq('order_id', orderId);

    if (itemsError) {
      toast.error('ไม่สามารถดึงข้อมูลรายการอาหารได้', {
        description: itemsError.message,
      });
      throw itemsError;
    }

    // Fetch delivery address if exists
    let deliveryAddress = null;
    if (orderData.delivery_address_id) {
      const { data: addressData, error: addressError } = await supabase
        .from('addresses')
        .select('*')
        .eq('id', orderData.delivery_address_id)
        .single();

      if (!addressError && addressData) {
        deliveryAddress = addressData;
      }
    }

    return {
      ...orderData,
      items: itemsData,
      delivery_address: deliveryAddress,
    } as OrderDetails;
  } catch (error) {
    console.error('Error fetching order details:', error);
    return null;
  }
};

export const trackOrderRealtime = (
  orderId: string,
  onUpdate: (order: Order) => void
): (() => void) => {
  // Subscribe to realtime updates for this order
  const channel = supabase
    .channel('order-updates')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'orders',
        filter: `id=eq.${orderId}`,
      },
      (payload) => {
        onUpdate(payload.new as Order);
      }
    )
    .subscribe();

  // Return a cleanup function
  return () => {
    supabase.removeChannel(channel);
  };
};
