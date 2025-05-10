
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import FoodItem from "./FoodItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data - would be replaced with API data in a real app
const menuCategories = [
  {
    id: "popular",
    name: "เมนูยอดนิยม"
  },
  {
    id: "main",
    name: "อาหารจานหลัก"
  },
  {
    id: "appetizers",
    name: "อาหารเรียกน้ำย่อย"
  },
  {
    id: "desserts",
    name: "ของหวาน"
  },
  {
    id: "drinks",
    name: "เครื่องดื่ม"
  }
];

const menuItems = {
  popular: [
    {
      id: "p1",
      name: "ข้าวผัดกระเพราหมูสับ",
      description: "ข้าวผัดกระเพราหมูสับ ไข่ดาว พริกแห้ง กระเทียม",
      price: 65,
      image: "https://placehold.co/600x400/FFDAB9/333333?text=กระเพรา"
    },
    {
      id: "p2",
      name: "ต้มยำกุ้งน้ำข้น",
      description: "ต้มยำกุ้งน้ำข้น รสชาติเข้มข้น กุ้งสด",
      price: 120,
      image: "https://placehold.co/600x400/FFEBCD/333333?text=ต้มยำกุ้ง"
    },
    {
      id: "p3",
      name: "ส้มตำไทย",
      description: "ส้มตำไทยรสจัดจ้าน มะละกอสด กุ้งแห้ง ถั่วลิสง",
      price: 60,
      image: "https://placehold.co/600x400/FFDEAD/333333?text=ส้มตำไทย"
    },
  ],
  main: [
    {
      id: "m1",
      name: "ข้าวผัดกระเพราหมูสับ",
      description: "ข้าวผัดกระเพราหมูสับ ไข่ดาว พริกแห้ง กระเทียม",
      price: 65,
      image: "https://placehold.co/600x400/FFDAB9/333333?text=กระเพรา"
    },
    {
      id: "m2",
      name: "ข้าวผัดปู",
      description: "ข้าวผัดปู เนื้อปูก้อน ไข่",
      price: 80,
      image: "https://placehold.co/600x400/FFEFD5/333333?text=ข้าวผัดปู"
    },
    {
      id: "m3",
      name: "ผัดไทยกุ้งสด",
      description: "ผัดไทยกุ้งสดรสชาติดั้งเดิม",
      price: 70,
      image: "https://placehold.co/600x400/FFFAF0/333333?text=ผัดไทย"
    },
    {
      id: "m4",
      name: "ข้าวหมกไก่",
      description: "ข้าวหอมมะลิหุงกับเครื่องเทศ เสิร์ฟพร้อมไก่ทอด",
      price: 75,
      image: "https://placehold.co/600x400/FFEBCD/333333?text=ข้าวหมก"
    },
  ],
  appetizers: [
    {
      id: "a1",
      name: "ปอเปี๊ยะทอด",
      description: "ปอเปี๊ยะทอดกรอบ ไส้หมูสับ วุ้นเส้น",
      price: 50,
      image: "https://placehold.co/600x400/FFDEAD/333333?text=ปอเปี๊ยะ"
    },
    {
      id: "a2",
      name: "ไก่ทอด",
      description: "ไก่ทอดกรอบนอกนุ่มใน เสิร์ฟพร้อมซอสพริกหวาน",
      price: 60,
      image: "https://placehold.co/600x400/FFDAB9/333333?text=ไก่ทอด"
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "ข้าวเหนียวมะม่วง",
      description: "ข้าวเหนียวมะม่วงน้ำดอกไม้สุก กะทิสด",
      price: 70,
      image: "https://placehold.co/600x400/FFEFD5/333333?text=ข้าวเหนียวมะม่วง"
    },
    {
      id: "d2",
      name: "บัวลอยน้ำขิง",
      description: "บัวลอยเผือก มัน ไข่หวาน น้ำขิงหอม",
      price: 45,
      image: "https://placehold.co/600x400/FFFAF0/333333?text=บัวลอย"
    },
  ],
  drinks: [
    {
      id: "dr1",
      name: "ชาไทยเย็น",
      description: "ชาไทยเย็น รสชาติเข้มข้น",
      price: 35,
      image: "https://placehold.co/600x400/FFEBCD/333333?text=ชาไทย"
    },
    {
      id: "dr2",
      name: "กาแฟโบราณ",
      description: "กาแฟโบราณรสเข้ม",
      price: 30,
      image: "https://placehold.co/600x400/FFDEAD/333333?text=กาแฟ"
    },
    {
      id: "dr3",
      name: "น้ำมะพร้าว",
      description: "น้ำมะพร้าวสด",
      price: 40,
      image: "https://placehold.co/600x400/FFDAB9/333333?text=มะพร้าว"
    },
  ]
};

const RestaurantMenu = () => {
  const { toast } = useToast();

  const handleAddToCart = (id: string, quantity: number) => {
    // This would integrate with a cart context/state in a real app
    toast({
      title: "เพิ่มลงตะกร้าแล้ว",
      description: `เพิ่มสินค้าจำนวน ${quantity} ชิ้นลงในตะกร้าแล้ว`,
    });
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-6">เมนูอาหาร</h2>
      
      <Tabs defaultValue="popular" className="w-full">
        <div className="overflow-x-auto pb-2">
          <TabsList className="mb-4">
            {menuCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="px-4 py-2">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {Object.entries(menuItems).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {items.map((item) => (
              <FoodItem
                key={item.id}
                {...item}
                onAddToCart={handleAddToCart}
              />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default RestaurantMenu;
