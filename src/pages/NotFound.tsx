
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout>
      <Helmet>
        <title>404 - Page Not Found | ที่นี่วังสามหมอ</title>
        <meta name="description" content="ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา" />
      </Helmet>
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center min-h-[60vh]">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-thai-accent">404</h1>
        <p className="text-xl sm:text-2xl font-medium mb-6 sm:mb-8">ไม่พบหน้าที่คุณกำลังค้นหา</p>
        <p className="text-base sm:text-lg mb-8 text-muted-foreground max-w-md">
          หน้าที่คุณกำลังมองหาอาจถูกย้าย ถูกลบ หรือไม่มีอยู่ในระบบ
        </p>
        <Link 
          to="/" 
          className="bg-thai-highlight hover:bg-thai-accent text-foreground px-6 py-3 rounded-lg font-medium transition-colors"
        >
          กลับไปยังหน้าหลัก
        </Link>
      </div>
    </MainLayout>
  );
};

export default NotFound;
