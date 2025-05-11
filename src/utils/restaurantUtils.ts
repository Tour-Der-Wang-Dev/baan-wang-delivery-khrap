
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Restaurant = {
  id: string;
  name: string;
  description: string | null;
  address: string;
  phone: string | null;
  image_url: string | null;
  owner_id: string | null;
  cuisine_type: string | null;
  operating_hours: any | null;
  rating: number | null;
  created_at: string;
  updated_at: string;
};

export type MenuItem = {
  id: string;
  restaurant_id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean | null;
  category: string | null;
  created_at: string;
  updated_at: string;
};

export const fetchRestaurants = async (searchQuery?: string): Promise<Restaurant[]> => {
  try {
    let query = supabase
      .from('restaurants')
      .select('*')
      .order('name');
    
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }
    
    const { data, error } = await query;

    if (error) {
      toast.error('ไม่สามารถดึงข้อมูลร้านอาหารได้', {
        description: error.message,
      });
      throw error;
    }

    return data as Restaurant[];
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    return [];
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant | null> => {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // Not Found
        toast.error('ไม่สามารถดึงข้อมูลร้านอาหารได้', {
          description: error.message,
        });
      }
      return null;
    }

    return data as Restaurant;
  } catch (error) {
    console.error('Error fetching restaurant:', error);
    return null;
  }
};

export const fetchRestaurantMenuItems = async (restaurantId: string, category?: string): Promise<MenuItem[]> => {
  try {
    let query = supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('is_available', true);
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;

    if (error) {
      toast.error('ไม่สามารถดึงข้อมูลเมนูอาหารได้', {
        description: error.message,
      });
      throw error;
    }

    return data as MenuItem[];
  } catch (error) {
    console.error('Error fetching menu items:', error);
    return [];
  }
};

export const uploadRestaurantImage = async (restaurantId: string, file: File): Promise<string | null> => {
  try {
    // Validate file type
    const fileExt = file.name.split('.').pop();
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!fileExt || !allowedTypes.includes(fileExt.toLowerCase())) {
      toast.error('รูปแบบไฟล์ไม่รองรับ', {
        description: 'กรุณาใช้ไฟล์รูปภาพ JPG, PNG หรือ GIF',
      });
      return null;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('ไฟล์มีขนาดใหญ่เกินไป', {
        description: 'กรุณาใช้ไฟล์ที่มีขนาดไม่เกิน 5MB',
      });
      return null;
    }

    const fileName = `${restaurantId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('restaurant_images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      toast.error('อัปโหลดรูปภาพไม่สำเร็จ', {
        description: error.message,
      });
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('restaurant_images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Restaurant image upload error:', error);
    return null;
  }
};

export const uploadMenuItemImage = async (menuItemId: string, file: File): Promise<string | null> => {
  try {
    // Validate file type
    const fileExt = file.name.split('.').pop();
    const allowedTypes = ['jpg', 'jpeg', 'png', 'gif'];
    
    if (!fileExt || !allowedTypes.includes(fileExt.toLowerCase())) {
      toast.error('รูปแบบไฟล์ไม่รองรับ', {
        description: 'กรุณาใช้ไฟล์รูปภาพ JPG, PNG หรือ GIF',
      });
      return null;
    }

    // Validate file size (max 3MB)
    if (file.size > 3 * 1024 * 1024) {
      toast.error('ไฟล์มีขนาดใหญ่เกินไป', {
        description: 'กรุณาใช้ไฟล์ที่มีขนาดไม่เกิน 3MB',
      });
      return null;
    }

    const fileName = `${menuItemId}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('menu_item_images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      toast.error('อัปโหลดรูปภาพไม่สำเร็จ', {
        description: error.message,
      });
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('menu_item_images')
      .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Menu item image upload error:', error);
    return null;
  }
};
