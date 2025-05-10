
import MainLayout from "@/layouts/MainLayout";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";

interface OrderItemProps {
  id: string;
  date: string;
  restaurant: string;
  items: string;
  total: string;
  status: string;
}

const OrderItem = ({ id, date, restaurant, items, total, status }: OrderItemProps) => {
  return (
    <Link to={`/order/${id}`}>
      <div className="thai-container p-4 mb-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold">{restaurant}</h3>
              <span className="text-sm text-muted-foreground">{date}</span>
            </div>
            <p className="text-sm mt-1">{items}</p>
            <p className="font-bold mt-1">{total}</p>
          </div>
          <div className="flex items-center">
            <span 
              className={`px-2 py-1 rounded-full text-xs mr-2 ${
                status === 'รอยืนยัน' 
                  ? 'bg-blue-100 text-blue-600' 
                  : status === 'กำลังจัดเตรียม' 
                    ? 'bg-yellow-100 text-yellow-600'
                    : status === 'กำลังจัดส่ง'
                      ? 'bg-orange-100 text-orange-600'
                      : 'bg-green-100 text-green-600'
              }`}
            >
              {status}
            </span>
            <ChevronRight size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </Link>
  );
};

const Orders = () => {
  const activeOrders = [
    {
      id: "1234567",
      date: "วันนี้, 15:30",
      restaurant: "ส้มตำแซ่บนัว",
      items: "ส้มตำไทย x1, ข้าวเหนียว x2, ต้มแซ่บกระดูกหมู x1",
      total: "฿190.00",
      status: "กำลังจัดส่ง"
    },
    {
      id: "1234566",
      date: "วันนี้, 13:45",
      restaurant: "ครัวคุณหนิง",
      items: "ข้าวผัดกะเพราหมูสับ x1, ไข่ดาว x1",
      total: "฿75.00",
      status: "กำลังจัดเตรียม"
    },
  ];

  const pastOrders = [
    {
      id: "1234565",
      date: "10 พ.ค. 2568, 18:30",
      restaurant: "พิซซ่าวังสามหมอ",
      items: "พิซซ่าฮาวายเอี้ยน x1, โค้ก x2",
      total: "฿259.00",
      status: "สำเร็จ"
    },
    {
      id: "1234564",
      date: "8 พ.ค. 2568, 12:15",
      restaurant: "ส้มตำแซ่บนัว",
      items: "ต้มยำกุ้งน้ำข้น x1, ปลากะพงทอดน้ำปลา x1, ข้าวสวย x2",
      total: "฿320.00",
      status: "สำเร็จ"
    },
    {
      id: "1234563",
      date: "7 พ.ค. 2568, 19:20",
      restaurant: "กาแฟบ้านสวน",
      items: "ลาเต้ x2, ชาไทย x1, ขนมปังกรอบ x1",
      total: "฿165.00",
      status: "สำเร็จ"
    },
    {
      id: "1234562",
      date: "5 พ.ค. 2568, 13:10",
      restaurant: "ก๋วยเตี๋ยวเรือลุงชาญ",
      items: "ก๋วยเตี๋ยวหมูตุ๋น x1, เกี๊ยวทอด x1",
      total: "฿95.00",
      status: "สำเร็จ"
    },
  ];

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">คำสั่งซื้อของฉัน</h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-6 w-full">
          <TabsTrigger value="active" className="flex-1">กำลังดำเนินการ</TabsTrigger>
          <TabsTrigger value="past" className="flex-1">ประวัติคำสั่งซื้อ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => (
              <OrderItem key={order.id} {...order} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">ไม่มีคำสั่งซื้อที่กำลังดำเนินการ</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          {pastOrders.length > 0 ? (
            pastOrders.map((order) => (
              <OrderItem key={order.id} {...order} />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-muted-foreground">ไม่มีประวัติคำสั่งซื้อ</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Orders;
