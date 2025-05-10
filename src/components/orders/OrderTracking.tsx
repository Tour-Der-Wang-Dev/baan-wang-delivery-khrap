
import { CheckCircle2, Clock, Truck, ShoppingBag, Utensils } from "lucide-react";

interface OrderTrackingProps {
  status: "pending" | "confirmed" | "preparing" | "delivery" | "completed";
  estimatedDeliveryTime?: string;
  restaurantName: string;
  orderNumber: string;
}

const OrderTracking = ({
  status,
  estimatedDeliveryTime,
  restaurantName,
  orderNumber,
}: OrderTrackingProps) => {
  const steps = [
    { id: "pending", label: "รอการยืนยัน", icon: Clock },
    { id: "confirmed", label: "ยืนยันคำสั่งซื้อ", icon: CheckCircle2 },
    { id: "preparing", label: "กำลังจัดเตรียมอาหาร", icon: Utensils },
    { id: "delivery", label: "กำลังจัดส่ง", icon: Truck },
    { id: "completed", label: "จัดส่งสำเร็จ", icon: ShoppingBag },
  ];

  const currentStepIndex = steps.findIndex((step) => step.id === status);

  return (
    <div className="thai-container p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="font-bold text-lg">คำสั่งซื้อ #{orderNumber}</h3>
          <p className="text-muted-foreground">{restaurantName}</p>
        </div>
        {estimatedDeliveryTime && (
          <div className="text-right">
            <span className="text-sm text-muted-foreground">เวลาจัดส่งโดยประมาณ</span>
            <p className="font-bold">{estimatedDeliveryTime}</p>
          </div>
        )}
      </div>

      <div className="relative pt-8">
        {/* Progress bar */}
        <div className="absolute top-14 left-0 right-0 h-1 bg-thai-container">
          <div 
            className="h-full bg-thai-accent transition-all duration-500 ease-in-out"
            style={{ 
              width: `${Math.min(100, (currentStepIndex / (steps.length - 1)) * 100)}%` 
            }}
          />
        </div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all
                    ${isCompleted 
                      ? "bg-thai-accent text-primary-foreground" 
                      : "bg-thai-container text-muted-foreground"
                    }
                    ${isCurrent ? "ring-2 ring-thai-highlight ring-offset-2" : ""}
                  `}
                >
                  <Icon size={20} />
                </div>
                <span className={`text-xs text-center max-w-[70px] ${isCurrent ? "font-bold" : ""}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
