
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import MainLayout from "@/layouts/MainLayout";
import { User } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "ยินดีต้อนรับกลับมา",
      });
      
      navigate("/account");
    } catch (error: any) {
      toast({
        title: "เข้าสู่ระบบล้มเหลว",
        description: error.message || "กรุณาตรวจสอบอีเมลและรหัสผ่าน",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "สมัครสมาชิกสำเร็จ",
        description: "กรุณาตรวจสอบอีเมลของคุณเพื่อยืนยันการสมัคร",
      });
    } catch (error: any) {
      toast({
        title: "สมัครสมาชิกล้มเหลว",
        description: error.message || "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-thai-highlight rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-bold">บัญชีผู้ใช้</h1>
          <p className="text-muted-foreground mt-1">เข้าสู่ระบบหรือสมัครสมาชิกเพื่อใช้งาน</p>
        </div>

        <div className="thai-container">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="signin" className="flex-1">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1">สมัครสมาชิก</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label htmlFor="signin-email">อีเมล</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="อีเมลของคุณ"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signin-password">รหัสผ่าน</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="รหัสผ่านของคุณ"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                </Button>

                <p className="text-center text-sm">
                  <a href="#" className="text-primary hover:underline">ลืมรหัสผ่าน?</a>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signup-email">อีเมล</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="อีเมลของคุณ"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">รหัสผ่าน</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="รหัสผ่านของคุณ"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  การสมัครสมาชิก หมายความว่าคุณยอมรับ <a href="#" className="underline">ข้อตกลงและเงื่อนไข</a> ของเรา
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
