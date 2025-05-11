
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
        <div className="aspect-video overflow-hidden rounded-lg mb-2 sm:mb-3">
          <img
            src={image}
            alt={`ร้านอาหาร ${name} ประเภทอาหาร ${cuisine} ในวังสามหมอ`}
            className="w-full h-full object-cover transition-transform hover:scale-105"
            loading="lazy"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-base sm:text-lg line-clamp-1">{name}</h3>
            <div className="flex items-center bg-thai-highlight px-2 py-1 rounded-md shrink-0 ml-1">
              <Star size={14} className="text-yellow-500 sm:size-16" aria-hidden="true" />
              <span className="ml-1 text-xs sm:text-sm font-semibold">{rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm">{cuisine}</p>
          
          <div className="flex justify-between text-xs sm:text-sm mt-2">
            <span className="whitespace-nowrap">🕒 {deliveryTime}</span>
            <span className="whitespace-nowrap">🛵 ขั้นต่ำ {minOrder}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
