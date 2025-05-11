
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, User } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import SEO from "@/components/seo/SEO";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();

  // Get the return URL from location state or default to home page
  const from = (location.state as any)?.from?.pathname || "/";

  const validateForm = () => {
    setError(null);

    if (!email.trim()) {
      setError("กรุณากรอกอีเมล");
      return false;
    }

    if (!password) {
      setError("กรุณากรอกรหัสผ่าน");
      return false;
    }

    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message || "เข้าสู่ระบบล้มเหลว กรุณาตรวจสอบอีเมลและรหัสผ่าน");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <SEO 
        title="เข้าสู่ระบบ" 
        description="เข้าสู่ระบบที่นี่วังสามหมอ เพื่อสั่งอาหารออนไลน์จากร้านอาหารท้องถิ่นในวังสามหมอ"
        canonicalUrl="https://thineewangsammo.com/login"
      />
      <div className="max-w-md mx-auto py-8 px-4">
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-thai-highlight rounded-full mx-auto mb-4 flex items-center justify-center">
            <User size={32} />
          </div>
          <h1 className="text-2xl font-bold">บัญชีผู้ใช้</h1>
          <p className="text-muted-foreground mt-1">เข้าสู่ระบบเพื่อใช้งาน</p>
        </div>

        <div className="thai-container">
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="w-full mb-6">
              <TabsTrigger value="signin" className="flex-1">เข้าสู่ระบบ</TabsTrigger>
              <TabsTrigger value="signup" className="flex-1" onClick={() => navigate("/register")}>สมัครสมาชิก</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
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
                    aria-label="อีเมลสำหรับเข้าสู่ระบบ"
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
                    aria-label="รหัสผ่านสำหรับเข้าสู่ระบบ"
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
                  <Link to="#" className="text-primary hover:underline">ลืมรหัสผ่าน?</Link>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <div className="text-center py-8 text-muted-foreground">
                <p>กรุณาคลิกที่แท็บ "สมัครสมาชิก" ด้านบน</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
