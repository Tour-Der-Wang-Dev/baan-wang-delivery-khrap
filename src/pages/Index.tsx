
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import RestaurantList from "@/components/restaurants/RestaurantList";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";

const Index = () => {
  // Organization structured data for JSON-LD
  const organizationStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ที่นี่วังสามหมอ",
    "url": "https://thineewangsammo.com",
    "logo": "https://thineewangsammo.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-99-999-9999",
      "contactType": "customer service",
      "availableLanguage": ["Thai", "English"]
    },
    "sameAs": [
      "https://www.facebook.com/thineewangsammo",
      "https://www.instagram.com/thineewangsammo",
      "https://twitter.com/thineewangsammo"
    ]
  };

  return (
    <MainLayout>
      <SEO 
        title="หน้าแรก" 
        description="บริการส่งอาหารจากร้านอาหารท้องถิ่นในวังสามหมอ จัดส่งรวดเร็ว อาหารร้อน อร่อย จากร้านอาหารในชุมชน"
        structuredData={organizationStructuredData}
        canonicalUrl="https://thineewangsammo.com/"
      />
      <div className="space-y-12">
        <Hero />
        
        <CategorySection />
        
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">ร้านอาหารยอดนิยม</h2>
            <Link to="/restaurants">
              <Button variant="link" className="flex items-center gap-1">
                ดูทั้งหมด <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
          <RestaurantList />
        </section>
        
        <section className="bg-thai-container p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">เป็นเจ้าของร้านอาหารใช่ไหม?</h2>
          <p className="mb-6 max-w-xl mx-auto">
            เพิ่มยอดขายให้ร้านของคุณด้วยการร่วมเป็นพาร์ทเนอร์กับที่นี่วังสามหมอ
            เข้าถึงลูกค้าในท้องถิ่นมากขึ้น และเพิ่มรายได้ให้กับร้านของคุณ
          </p>
          <Link to="/become-partner">
            <Button className="thai-button">สมัครเป็นพาร์ทเนอร์</Button>
          </Link>
        </section>
      </div>
    </MainLayout>
  );
};

export default Index;
