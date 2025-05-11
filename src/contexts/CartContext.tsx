
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { MenuItem } from '@/utils/restaurantUtils';
import { CartItem } from '@/utils/orderUtils';

type CartContextType = {
  cart: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
  addToCart: (menuItem: MenuItem, quantity: number, restaurantId: string, restaurantName: string, notes?: string) => void;
  updateQuantity: (menuItemId: string, quantity: number) => void;
  updateNotes: (menuItemId: string, notes: string) => void;
  removeFromCart: (menuItemId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'food-delivery-cart';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart.cart || []);
        setRestaurantId(parsedCart.restaurantId || null);
        setRestaurantName(parsedCart.restaurantName || null);
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({
          cart,
          restaurantId,
          restaurantName,
        })
      );
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart, restaurantId, restaurantName]);
  
  const addToCart = (menuItem: MenuItem, quantity: number, newRestaurantId: string, newRestaurantName: string, notes?: string) => {
    // Check if trying to add item from different restaurant
    if (restaurantId && restaurantId !== newRestaurantId) {
      const confirmChange = window.confirm(
        `คุณมีรายการอาหารจากร้าน ${restaurantName} ในตะกร้าอยู่แล้ว ต้องการล้างตะกร้าและเพิ่มรายการใหม่จากร้าน ${newRestaurantName} หรือไม่?`
      );
      
      if (!confirmChange) {
        return;
      }
      
      // Clear cart if confirmed
      setCart([]);
      setRestaurantId(newRestaurantId);
      setRestaurantName(newRestaurantName);
    }
    
    // Set restaurant info if this is the first item
    if (!restaurantId) {
      setRestaurantId(newRestaurantId);
      setRestaurantName(newRestaurantName);
    }
    
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item.menuItem.id === menuItem.id
      );
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
          notes: notes || updatedCart[existingItemIndex].notes,
        };
        
        toast.success('อัปเดตรายการในตะกร้า', {
          description: `${menuItem.name} x${updatedCart[existingItemIndex].quantity}`,
        });
        
        return updatedCart;
      } else {
        // Add new item
        toast.success('เพิ่มลงตะกร้าแล้ว', {
          description: `${menuItem.name} x${quantity}`,
        });
        
        return [
          ...prevCart,
          {
            menuItem,
            quantity,
            notes,
          },
        ];
      }
    });
  };
  
  const updateQuantity = (menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(menuItemId);
      return;
    }
    
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === menuItemId
          ? { ...item, quantity }
          : item
      )
    );
  };
  
  const updateNotes = (menuItemId: string, notes: string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.menuItem.id === menuItemId
          ? { ...item, notes }
          : item
      )
    );
  };
  
  const removeFromCart = (menuItemId: string) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item.menuItem.id !== menuItemId
      );
      
      // If cart is now empty, reset restaurant info
      if (updatedCart.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
      }
      
      return updatedCart;
    });
    
    toast.success('นำรายการออกจากตะกร้าแล้ว');
  };
  
  const clearCart = () => {
    setCart([]);
    setRestaurantId(null);
    setRestaurantName(null);
    toast.success('ล้างตะกร้าแล้ว');
  };
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  const subTotal = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );
  
  const contextValue: CartContextType = {
    cart,
    restaurantId,
    restaurantName,
    addToCart,
    updateQuantity,
    updateNotes,
    removeFromCart,
    clearCart,
    totalItems,
    subTotal,
  };
  
  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
