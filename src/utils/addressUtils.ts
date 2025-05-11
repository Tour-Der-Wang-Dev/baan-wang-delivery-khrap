
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type Address = {
  id: string;
  user_id: string;
  description: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  is_default: boolean | null;
  created_at: string;
  updated_at: string;
};

export const fetchUserAddresses = async (): Promise<Address[]> => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .order('is_default', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      toast.error('ไม่สามารถดึงข้อมูลที่อยู่ได้', {
        description: error.message,
      });
      throw error;
    }

    return data as Address[];
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};

export const getAddressById = async (id: string): Promise<Address | null> => {
  try {
    const { data, error } = await supabase
      .from('addresses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
        toast.error('ไม่สามารถดึงข้อมูลที่อยู่ได้', {
          description: error.message,
        });
      }
      return null;
    }

    return data as Address;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
};

export const createAddress = async (
  address: Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>
): Promise<Address | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('คุณยังไม่ได้เข้าสู่ระบบ');
      return null;
    }

    // If this is set as default, unset other defaults first
    if (address.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('is_default', true)
        .eq('user_id', user.id);
    }

    const { data, error } = await supabase
      .from('addresses')
      .insert([{ ...address, user_id: user.id }])
      .select()
      .single();

    if (error) {
      toast.error('ไม่สามารถบันทึกที่อยู่ได้', {
        description: error.message,
      });
      throw error;
    }

    toast.success('บันทึกที่อยู่สำเร็จ');
    return data as Address;
  } catch (error) {
    console.error('Error creating address:', error);
    return null;
  }
};

export const updateAddress = async (
  id: string, 
  updates: Partial<Omit<Address, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
): Promise<Address | null> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('คุณยังไม่ได้เข้าสู่ระบบ');
      return null;
    }

    // If this is set as default, unset other defaults first
    if (updates.is_default) {
      await supabase
        .from('addresses')
        .update({ is_default: false })
        .eq('is_default', true)
        .eq('user_id', user.id);
    }

    const { data, error } = await supabase
      .from('addresses')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      toast.error('ไม่สามารถอัปเดตที่อยู่ได้', {
        description: error.message,
      });
      throw error;
    }

    toast.success('อัปเดตที่อยู่สำเร็จ');
    return data as Address;
  } catch (error) {
    console.error('Error updating address:', error);
    return null;
  }
};

export const deleteAddress = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('addresses')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('ไม่สามารถลบที่อยู่ได้', {
        description: error.message,
      });
      throw error;
    }

    toast.success('ลบที่อยู่สำเร็จ');
    return true;
  } catch (error) {
    console.error('Error deleting address:', error);
    return false;
  }
};

export const setDefaultAddress = async (id: string): Promise<boolean> => {
  try {
    // Get the current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error('คุณยังไม่ได้เข้าสู่ระบบ');
      return false;
    }
    
    // First unset all defaults for this user
    await supabase
      .from('addresses')
      .update({ is_default: false })
      .eq('is_default', true)
      .eq('user_id', user.id);
    
    // Then set the new default
    const { error } = await supabase
      .from('addresses')
      .update({ is_default: true })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      toast.error('ไม่สามารถตั้งค่าที่อยู่เริ่มต้นได้', {
        description: error.message,
      });
      throw error;
    }

    toast.success('ตั้งค่าที่อยู่เริ่มต้นสำเร็จ');
    return true;
  } catch (error) {
    console.error('Error setting default address:', error);
    return false;
  }
};
