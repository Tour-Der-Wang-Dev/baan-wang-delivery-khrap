
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { User } from "@supabase/supabase-js";
import { Phone, MapPin, CreditCard, UserCircle, Truck, Receipt, Settings, LogOut } from "lucide-react";

const Account = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [updating, setUpdating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      setUser(session.user);
      setEmail(session.user.email || "");
      
      // Fetch user profile from a profiles table if you have one
      // This is just a placeholder - you'll need to create this table in Supabase
      // const { data, error } = await supabase
      //   .from('profiles')
      //   .select('full_name, phone_number')
      //   .eq('id', session.user.id)
      //   .single();
      
      // if (data) {
      //   setFullName(data.full_name || "");
      //   setPhoneNumber(data.phone_number || "");
      // }
      
      setLoading(false);
    };

    checkUser();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          navigate("/login");
        } else if (session) {
          setUser(session.user);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const updateProfile = async () => {
    if (!user) return;
    
    setUpdating(true);
    
    // This is where you would update the user's profile in a profiles table
    // const { error } = await supabase
    //   .from('profiles')
    //   .upsert({
    //     id: user.id,
    //     full_name: fullName,
    //     phone_number: phoneNumber,
    //     updated_at: new Date(),
    //   });

    // if (error) {
    //   toast({
    //     title: "เกิดข้อผิดพลาด",
    //     description: "ไม่สามารถอัพเดทข้อมูลได้ กรุณาลองใหม่อีกครั้ง",
    //     variant: "destructive",
    //   });
    // } else {
    //   toast({
    //     title: "อัพเดทข้อมูลสำเร็จ",
    //     description: "ข้อมูลของคุณได้รับการอัพเดทเรียบร้อยแล้ว",
    //   });
    // }

    // Simulating update for now
    setTimeout(() => {
      toast({
        title: "อัพเดทข้อมูลสำเร็จ",
        description: "ข้อมูลของคุณได้รับการอัพเดทเรียบร้อยแล้ว",
      });
      setUpdating(false);
    }, 1000);
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถออกจากระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } else {
      toast({
        title: "ออกจากระบบสำเร็จ",
        description: "คุณได้ออกจากระบบเรียบร้อยแล้ว",
      });
      navigate("/");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-lg">กำลังโหลด...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6">
        <div className="mb-8 text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-thai-highlight">
            <AvatarImage src={user?.user_metadata?.avatar_url || ""} alt={fullName || email} />
            <AvatarFallback className="text-3xl bg-thai-accent">
              {(fullName && fullName[0]) || (email && email[0]) || "ผ"}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1">{fullName || "ผู้ใช้งาน"}</h1>
          <p className="text-muted-foreground">{email}</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="profile" className="flex-1">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">ประวัติคำสั่งซื้อ</TabsTrigger>
            <TabsTrigger value="addresses" className="flex-1">ที่อยู่</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="thai-container">
            <h2 className="text-xl font-semibold mb-4">แก้ไขข้อมูลส่วนตัว</h2>

            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="ชื่อ-นามสกุลของคุณ"
                />
              </div>

              <div>
                <Label htmlFor="email">อีเมล</Label>
                <Input
                  id="email"
                  value={email}
                  disabled
                  placeholder="อีเมลของคุณ"
                />
              </div>

              <div>
                <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="เบอร์โทรศัพท์ของคุณ"
                />
              </div>
            </div>

            <Button 
              className="w-full mb-4" 
              onClick={updateProfile} 
              disabled={updating}
            >
              {updating ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
            </Button>
          </TabsContent>

          <TabsContent value="orders" className="thai-container">
            <h2 className="text-xl font-semibold mb-4">ประวัติคำสั่งซื้อ</h2>
            
            <div className="space-y-4 divide-y">
              <div className="py-4">
                <p className="text-lg font-medium mb-1">คำสั่งซื้อเลขที่ #12345</p>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">วันที่ 10 พฤษภาคม 2568</span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">จัดส่งสำเร็จ</span>
                </div>
                <p className="mb-2">ร้านลาบวังสามหมอ - ลาบหมู, ส้มตำไทย, ข้าวเหนียว</p>
                <p className="font-semibold">฿250</p>
              </div>
              
              <div className="py-4">
                <p className="text-lg font-medium mb-1">คำสั่งซื้อเลขที่ #12344</p>
                <div className="flex justify-between mb-1">
                  <span className="text-muted-foreground">วันที่ 8 พฤษภาคม 2568</span>
                  <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">จัดส่งสำเร็จ</span>
                </div>
                <p className="mb-2">ร้านก๋วยเตี๋ยวเรือนำโชค - ก๋วยเตี๋ยวหมูน้ำตก, เกี๊ยวทอด</p>
                <p className="font-semibold">฿120</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4">ดูคำสั่งซื้อเพิ่มเติม</Button>
          </TabsContent>

          <TabsContent value="addresses" className="thai-container">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">ที่อยู่จัดส่ง</h2>
              <Button size="sm">+ เพิ่มที่อยู่ใหม่</Button>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4 relative">
                <div className="absolute top-2 right-2 px-2 py-0.5 bg-thai-accent text-xs rounded">ค่าเริ่มต้น</div>
                <h3 className="font-medium">บ้าน</h3>
                <p>123 หมู่ 4 ตำบลวังสามหมอ อำเภอวังสามหมอ จังหวัดอุดรธานี 41280</p>
                <p className="text-sm text-muted-foreground mt-1">โทร: 08x-xxx-xxxx</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">แก้ไข</Button>
                  <Button variant="outline" size="sm">ลบ</Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium">ที่ทำงาน</h3>
                <p>456 อาคารสำนักงานเทศบาล ตำบลวังสามหมอ อำเภอวังสามหมอ จังหวัดอุดรธานี 41280</p>
                <p className="text-sm text-muted-foreground mt-1">โทร: 08x-xxx-xxxx</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm">แก้ไข</Button>
                  <Button variant="outline" size="sm">ลบ</Button>
                  <Button variant="outline" size="sm">ตั้งเป็นค่าเริ่มต้น</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="thai-container mt-8">
          <h2 className="text-xl font-semibold mb-4">เมนูลัด</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="flex flex-col h-24 gap-2">
              <Receipt size={24} />
              <span>คำสั่งซื้อของฉัน</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 gap-2">
              <MapPin size={24} />
              <span>ที่อยู่จัดส่ง</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 gap-2">
              <CreditCard size={24} />
              <span>การชำระเงิน</span>
            </Button>
            <Button variant="outline" className="flex flex-col h-24 gap-2">
              <Settings size={24} />
              <span>ตั้งค่า</span>
            </Button>
          </div>
        </div>

        <Separator className="my-8" />

        <Button 
          variant="outline" 
          className="w-full flex items-center justify-center gap-2 text-destructive hover:text-destructive"
          onClick={handleSignOut}
        >
          <LogOut size={16} />
          ออกจากระบบ
        </Button>
      </div>
    </MainLayout>
  );
};

export default Account;
