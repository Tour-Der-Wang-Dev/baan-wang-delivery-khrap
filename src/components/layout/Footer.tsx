
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-thai-container py-8 px-4 mt-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Site info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ที่นี่วังสามหมอ</h3>
            <p className="mb-4 text-sm">
              แพลตฟอร์มสั่งอาหารออนไลน์ที่ออกแบบสำหรับชุมชนวังสามหมอโดยเฉพาะ
              เพื่อให้การสั่งอาหารเป็นเรื่องง่ายและสะดวก
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-foreground hover:text-thai-accent">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-thai-accent">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-foreground hover:text-thai-accent">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-lg font-bold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-thai-accent">
                  เกี่ยวกับเรา
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-thai-accent">
                  ร้านอาหาร
                </Link>
              </li>
              <li>
                <Link to="/become-partner" className="hover:text-thai-accent">
                  ร่วมเป็นพาร์ทเนอร์
                </Link>
              </li>
              <li>
                <Link to="/become-driver" className="hover:text-thai-accent">
                  สมัครเป็นคนขับ
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-thai-accent">
                  ข้อตกลงการใช้บริการ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-thai-accent">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold mb-4">ติดต่อเรา</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Phone size={18} />
                <span>099-999-9999</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>contact@thineewangsammo.com</span>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold mb-2">เวลาทำการฝ่ายบริการลูกค้า</h4>
                <p className="text-sm">ทุกวัน - 9:00 น. ถึง 21:00 น.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-thai-accent mt-8 pt-4 text-center text-sm">
          <p>© 2025 ที่นี่วังสามหมอ. สงวนลิขสิทธิ์ทั้งหมด.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
