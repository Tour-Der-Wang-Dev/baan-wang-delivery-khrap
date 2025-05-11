
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };

    checkUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (isMenuOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('[data-mobile-menu]') && !target.closest('[data-mobile-button]')) {
          setIsMenuOpen(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-thai-background border-b border-thai-accent py-3 sm:py-4 px-3 sm:px-6">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and site title */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-thai-highlight rounded-full p-1.5 sm:p-2">
            <ShoppingBag size={20} className="text-foreground" />
          </div>
          <h1 className="text-lg sm:text-xl font-bold hidden sm:block">
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
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="outline" size="icon" className="hidden sm:flex">
            <Search size={18} />
          </Button>
          
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative h-8 w-8 sm:h-9 sm:w-9">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 bg-thai-accent text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                2
              </span>
            </Button>
          </Link>
          
          <Link to={isLoggedIn ? "/account" : "/login"}>
            <Button variant="outline" size="icon" className="h-8 w-8 sm:h-9 sm:w-9">
              <User size={18} />
            </Button>
          </Link>
          
          {/* Mobile menu button */}
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden h-8 w-8 sm:h-9 sm:w-9"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-mobile-button
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div 
          className="md:hidden absolute top-full left-0 right-0 bg-thai-container p-3 sm:p-4 shadow-lg animate-fade-in"
          data-mobile-menu
        >
          <nav className="flex flex-col space-y-2">
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
              to={isLoggedIn ? "/account" : "/login"}
              className="p-2 hover:bg-thai-highlight rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              {isLoggedIn ? "บัญชีของฉัน" : "เข้าสู่ระบบ"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
