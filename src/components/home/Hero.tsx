
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative bg-thai-container rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-thai-highlight/80 to-transparent" aria-hidden="true"></div>
      
      <div className="relative py-8 sm:py-12 px-4 sm:px-6 md:py-16 md:px-10 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          สั่งอาหารโปรดของคุณ<br />
          <span className="text-thai-accent">ที่วังสามหมอ</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-md">
          อาหารท้องถิ่นที่คุณชื่นชอบ ส่งตรงถึงบ้านคุณอย่างรวดเร็ว
          พร้อมบริการคุณภาพ จากร้านในชุมชนวังสามหมอ
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Link to="/restaurants" aria-label="สั่งอาหารเลย">
            <Button className="thai-button w-full sm:w-auto text-sm sm:text-base">
              สั่งอาหารเลย
            </Button>
          </Link>
          <Link to="/become-partner" aria-label="ร่วมเป็นพาร์ทเนอร์">
            <Button variant="outline" className="thai-button-secondary w-full sm:w-auto text-sm sm:text-base">
              ร่วมเป็นพาร์ทเนอร์
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
