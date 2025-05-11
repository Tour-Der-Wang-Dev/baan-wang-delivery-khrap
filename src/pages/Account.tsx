
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import ProfileForm from "@/components/account/ProfileForm";
import AddressesManager from "@/components/account/AddressesManager";
import { useNavigate } from "react-router-dom";

const Account = () => {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">บัญชีของฉัน</h1>
          <Button
            variant="outline"
            className="flex items-center"
            onClick={handleSignOut}
          >
            <LogOut size={16} className="mr-2" />
            ออกจากระบบ
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
            <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
            <TabsTrigger value="addresses">ที่อยู่จัดส่ง</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <ProfileForm />
            </div>
          </TabsContent>
          
          <TabsContent value="addresses" className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
              <AddressesManager />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Account;
