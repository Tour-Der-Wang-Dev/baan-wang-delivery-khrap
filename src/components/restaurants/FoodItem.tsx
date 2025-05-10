
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  onAddToCart: (id: string, quantity: number) => void;
}

const FoodItem = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart
}: FoodItemProps) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    onAddToCart(id, quantity);
    setQuantity(1);
  };

  return (
    <div className="food-card">
      {image && (
        <div className="w-24 h-24 rounded overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="flex-grow">
        <h3 className="font-medium text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold">฿{price.toFixed(2)}</span>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-thai-accent rounded-md">
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={decrementQuantity}
              >
                <Minus size={14} />
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 p-0"
                onClick={incrementQuantity}
              >
                <Plus size={14} />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart} 
              className="thai-button py-1 px-3 h-8 text-sm"
            >
              เพิ่ม
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
