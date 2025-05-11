
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export type AuthError = {
  message: string;
  status?: number;
};

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  is_driver: boolean | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<string | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // First set up the auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          await fetchProfile(currentSession.user.id);
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    // Then fetch the initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Unexpected error fetching profile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error('เข้าสู่ระบบไม่สำเร็จ', {
          description: error.message || 'กรุณาตรวจสอบอีเมลและรหัสผ่าน',
        });
        throw error;
      }

      toast.success('เข้าสู่ระบบสำเร็จ', {
        description: 'ยินดีต้อนรับกลับมา',
      });

      navigate('/');
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    metadata?: { first_name?: string; last_name?: string }
  ) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        }
      });

      if (error) {
        toast.error('สมัครสมาชิกไม่สำเร็จ', {
          description: error.message || 'กรุณาตรวจสอบข้อมูลของคุณและลองใหม่อีกครั้ง',
        });
        throw error;
      }

      toast.success('สมัครสมาชิกสำเร็จ', {
        description: 'กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัคร',
      });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('ออกจากระบบสำเร็จ');
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
      toast.error('ไม่สามารถออกจากระบบได้', {
        description: 'กรุณาลองใหม่อีกครั้ง',
      });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      toast.error('กรุณาเข้าสู่ระบบก่อนดำเนินการ');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select();

      if (error) {
        toast.error('อัปเดตข้อมูลไม่สำเร็จ', {
          description: error.message,
        });
        throw error;
      }

      if (data && data[0]) {
        setProfile(data[0] as Profile);
        toast.success('อัปเดตข้อมูลสำเร็จ');
      }
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  const uploadAvatar = async (file: File): Promise<string | null> => {
    if (!user) {
      toast.error('กรุณาเข้าสู่ระบบก่อนดำเนินการ');
      return null;
    }

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

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('ไฟล์มีขนาดใหญ่เกินไป', {
          description: 'กรุณาใช้ไฟล์ที่มีขนาดไม่เกิน 2MB',
        });
        return null;
      }

      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        toast.error('อัปโหลดรูปโปรไฟล์ไม่สำเร็จ', {
          description: error.message,
        });
        throw error;
      }

      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const avatarUrl = publicUrlData.publicUrl;
      
      // Update profile with new avatar URL
      await updateProfile({ avatar_url: avatarUrl });
      
      toast.success('อัปโหลดรูปโปรไฟล์สำเร็จ');
      return avatarUrl;
    } catch (error) {
      console.error('Avatar upload error:', error);
      return null;
    }
  };

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    uploadAvatar,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
