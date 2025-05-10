
import MainLayout from "@/layouts/MainLayout";
import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import RestaurantList from "@/components/restaurants/RestaurantList";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <MainLayout>
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
