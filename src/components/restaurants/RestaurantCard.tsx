
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: string;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  minOrder,
}: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${id}`}>
      <div className="restaurant-card overflow-hidden">
        <div className="aspect-video overflow-hidden rounded-lg mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg">{name}</h3>
            <div className="flex items-center bg-thai-highlight px-2 py-1 rounded-md">
              <Star size={16} className="text-yellow-500" />
              <span className="ml-1 text-sm font-semibold">{rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground">{cuisine}</p>
          
          <div className="flex justify-between text-sm mt-2">
            <span>🕒 {deliveryTime}</span>
            <span>🛵 ขั้นต่ำ {minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
