
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-thai-background border-b border-thai-accent py-4 px-4 md:px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and site title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-thai-highlight rounded-full p-2">
            <ShoppingBag size={24} className="text-foreground" />
          </div>
          <h1 className="text-xl font-bold hidden sm:block">
            ที่นี่<span className="text-thai-accent">วังสามหมอ</span>
          </h1>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="font-medium hover:text-thai-accent">
            หน้าแรก
          </Link>
          <Link to="/restaurants" className="font-medium hover:text-thai-accent">
            ร้านอาหาร
          </Link>
          <Link to="/orders" className="font-medium hover:text-thai-accent">
            คำสั่งซื้อของฉัน
          </Link>
          <Link to="/help" className="font-medium hover:text-thai-accent">
            ช่วยเหลือ
          </Link>
        </nav>

        {/* Right section - search, cart, account */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Search size={20} />
          </Button>
          
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 bg-thai-accent text-xs rounded-full w-5 h-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          
          <Link to="/account" className="hidden sm:block">
            <Button variant="outline" size="icon">
              <User size={20} />
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-thai-container p-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-thai-highlight rounded-md" 
              onClick={() => setIsMenuOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link 
              to="/restaurants" 
              className="p-2 hover:bg-thai-highlight rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ร้านอาหาร
            </Link>
            <Link 
              to="/orders" 
              className="p-2 hover:bg-thai-highlight rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              คำสั่งซื้อของฉัน
            </Link>
            <Link 
              to="/help" 
              className="p-2 hover:bg-thai-highlight rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              ช่วยเหลือ
            </Link>
            <Link 
              to="/account" 
              className="p-2 hover:bg-thai-highlight rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              บัญชีของฉัน
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
