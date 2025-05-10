
import MainLayout from "@/layouts/MainLayout";
import OrderTracking from "@/components/orders/OrderTracking";
import { Link } from "react-router-dom";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const OrderDetail = () => {
  // This would come from a real order in a production app
  const order = {
    id: "1234567",
    status: "delivery" as const, // Type assertion for the union type
    restaurant: {
      name: "ส้มตำแซ่บนัว",
      phone: "099-999-9999"
    },
    items: [
      { id: "1", name: "ส้มตำไทย", price: 60, quantity: 1 },
      { id: "2", name: "ข้าวเหนียว", price: 10, quantity: 2 },
      { id: "3", name: "ต้มแซ่บกระดูกหมู", price: 80, quantity: 1 }
    ],
    subtotal: 160,
    deliveryFee: 30,
    discount: 0,
    total: 190,
    paymentMethod: "เงินสด",
    deliveryAddress: "123 ถนนวังสามหมอ ต.วังสามหมอ อ.วังสามหมอ จ.อุดรธานี 41280",
    estimatedDelivery: "15:45 - 16:00 น.",
    driver: {
      name: "คุณสมชาย ใจดี",
      phone: "088-888-8888",
      licensePlate: "กข 1234 อุดรธานี"
    },
    createdAt: "2025-05-10T14:30:00Z"
  };

  return (
    <MainLayout>
      <Link to="/orders" className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        <span>กลับไปที่คำสั่งซื้อทั้งหมด</span>
      </Link>

      <h1 className="text-2xl font-bold mb-6">รายละเอียดคำสั่งซื้อ</h1>

      <OrderTracking
        status={order.status}
        estimatedDeliveryTime={order.estimatedDelivery}
        restaurantName={order.restaurant.name}
        orderNumber={order.id}
      />

      {order.status === "delivery" && (
        <div className="thai-container p-6 mt-4">
          <h2 className="font-bold mb-2">ข้อมูลคนขับ</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{order.driver.name}</p>
              <p className="text-sm text-muted-foreground">{order.driver.licensePlate}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Phone size={18} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <MessageCircle size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="thai-container p-6 mt-4">
        <h2 className="font-bold mb-4">รายการสั่งซื้อ</h2>
        
        <div className="border-b border-thai-accent pb-4 mb-4">
          <h3 className="font-medium mb-2">{order.restaurant.name}</h3>
          
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <div className="flex gap-2">
                <span>{item.quantity} x</span>
                <span>{item.name}</span>
              </div>
              <span>฿{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>ราคาอาหาร</span>
            <span>฿{order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>ค่าจัดส่ง</span>
            <span>฿{order.deliveryFee.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between">
              <span>ส่วนลด</span>
              <span className="text-green-600">-฿{order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold pt-2 border-t border-thai-accent">
            <span>รวมทั้งสิ้น</span>
            <span>฿{order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="thai-container p-6 mt-4">
        <h2 className="font-bold mb-2">รายละเอียดการจัดส่ง</h2>
        <p className="mb-4">{order.deliveryAddress}</p>
        
        <h2 className="font-bold mb-2">วิธีการชำระเงิน</h2>
        <p>{order.paymentMethod}</p>
      </div>
    </MainLayout>
  );
};

export default OrderDetail;
