
import RestaurantCard from "./RestaurantCard";

// Mock data - would be replaced with API data in a real app
const mockRestaurants = [
  {
    id: "1",
    name: "ส้มตำแซ่บนัว",
    image: "https://placehold.co/600x400/FFDAB9/333333?text=ส้มตำแซ่บนัว",
    cuisine: "อาหารอีสาน",
    rating: 4.7,
    deliveryTime: "15-25 นาที",
    minOrder: "฿50",
  },
  {
    id: "2",
    name: "ครัวคุณหนิง",
    image: "https://placehold.co/600x400/FFEBCD/333333?text=ครัวคุณหนิง",
    cuisine: "อาหารไทย",
    rating: 4.5,
    deliveryTime: "20-30 นาที",
    minOrder: "฿80",
  },
  {
    id: "3",
    name: "พิซซ่าวังสามหมอ",
    image: "https://placehold.co/600x400/FFDEAD/333333?text=พิซซ่า",
    cuisine: "พิซซ่า, ฟาสต์ฟู้ด",
    rating: 4.3,
    deliveryTime: "25-35 นาที",
    minOrder: "฿120",
  },
  {
    id: "4",
    name: "ก๋วยเตี๋ยวเรือลุงชาญ",
    image: "https://placehold.co/600x400/FFEFD5/333333?text=ก๋วยเตี๋ยว",
    cuisine: "ก๋วยเตี๋ยว",
    rating: 4.8,
    deliveryTime: "15-25 นาที",
    minOrder: "฿60",
  },
  {
    id: "5",
    name: "กาแฟบ้านสวน",
    image: "https://placehold.co/600x400/FFFAF0/333333?text=กาแฟ",
    cuisine: "กาแฟ, เบเกอรี่",
    rating: 4.6,
    deliveryTime: "10-20 นาที",
    minOrder: "฿70",
  },
  {
    id: "6",
    name: "ซีฟู้ดท่าเรือ",
    image: "https://placehold.co/600x400/FFDAB9/333333?text=อาหารทะเล",
    cuisine: "อาหารทะเล",
    rating: 4.4,
    deliveryTime: "25-40 นาที",
    minOrder: "฿150",
  },
];

const RestaurantList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockRestaurants.map((restaurant) => (
        <RestaurantCard key={restaurant.id} {...restaurant} />
      ))}
    </div>
  );
};

export default RestaurantList;
