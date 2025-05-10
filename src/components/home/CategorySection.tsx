
import { Link } from "react-router-dom";
import { 
  Utensils, Coffee, Pizza, Soup, Fish, 
  Sandwich, IceCream, Beef, Apple 
} from "lucide-react";

interface CategoryCardProps {
  icon: React.ReactNode;
  name: string;
  link: string;
}

const CategoryCard = ({ icon, name, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="thai-container flex flex-col items-center p-4 transition-transform hover:scale-105">
      <div className="bg-thai-highlight rounded-full p-3 mb-3">
        {icon}
      </div>
      <span className="font-medium text-center">{name}</span>
    </Link>
  );
};

const CategorySection = () => {
  const categories = [
    { icon: <Utensils size={24} />, name: "อาหารไทย", link: "/category/thai" },
    { icon: <Soup size={24} />, name: "ก๋วยเตี๋ยว", link: "/category/noodles" },
    { icon: <Coffee size={24} />, name: "เครื่องดื่ม", link: "/category/drinks" },
    { icon: <Pizza size={24} />, name: "ฟาสต์ฟู้ด", link: "/category/fast-food" },
    { icon: <Fish size={24} />, name: "อาหารทะเล", link: "/category/seafood" },
    { icon: <Sandwich size={24} />, name: "ของว่าง", link: "/category/snacks" },
    { icon: <IceCream size={24} />, name: "ของหวาน", link: "/category/desserts" },
    { icon: <Apple size={24} />, name: "ผลไม้", link: "/category/fruits" },
  ];

  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-6">หมวดหมู่อาหาร</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            icon={category.icon}
            name={category.name}
            link={category.link}
          />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
