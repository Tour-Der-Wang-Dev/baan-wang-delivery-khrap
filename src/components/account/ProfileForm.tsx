
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";

const ProfileForm = () => {
  const { user, profile, updateProfile, uploadAvatar } = useAuth();
  
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Initialize form with user data
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || "");
      setLastName(profile.last_name || "");
      setPhone(profile.phone || "");
      setAvatar(profile.avatar_url || null);
    }
  }, [profile]);

  // Get initials for avatar fallback
  const getInitials = () => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    
    return firstInitial + lastInitial || user?.email?.charAt(0).toUpperCase() || "U";
  };

  // Handle avatar file selection
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    
    try {
      const avatarUrl = await uploadAvatar(file);
      if (avatarUrl) {
        setAvatar(avatarUrl);
      }
    } catch (error: any) {
      setError(error.message || "อัปโหลดรูปโปรไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        phone,
      });
      
      setSuccess("อัปเดตข้อมูลส่วนตัวเรียบร้อยแล้ว");
    } catch (error: any) {
      setError(error.message || "อัปเดตข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">ข้อมูลส่วนตัว</h2>
        <p className="text-sm text-muted-foreground">
          อัปเดตข้อมูลส่วนตัวและรูปโปรไฟล์ของคุณ
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          {avatar && <AvatarImage src={avatar} alt="รูปโปรไฟล์" />}
          <AvatarFallback className="text-lg">{getInitials()}</AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor="avatar" className="cursor-pointer">
            <div className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-primary rounded-md shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {loading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  กำลังอัปโหลด...
                </>
              ) : (
                "อัปโหลดรูปภาพ"
              )}
            </div>
            <Input
              id="avatar"
              type="file"
              accept="image/png, image/jpeg, image/gif"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={loading}
            />
          </Label>
          <p className="mt-2 text-xs text-muted-foreground">
            รองรับไฟล์ PNG, JPG หรือ GIF ขนาดไม่เกิน 2MB
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">ชื่อ</Label>
            <Input
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ชื่อ"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">นามสกุล</Label>
            <Input
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="นามสกุล"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">อีเมล</Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            disabled
            className="bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            หากต้องการเปลี่ยนอีเมล กรุณาติดต่อฝ่ายบริการลูกค้า
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="เบอร์โทรศัพท์"
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              กำลังบันทึก...
            </>
          ) : (
            "บันทึกข้อมูล"
          )}
        </Button>
      </form>
    </div>
  );
};

export default ProfileForm;
