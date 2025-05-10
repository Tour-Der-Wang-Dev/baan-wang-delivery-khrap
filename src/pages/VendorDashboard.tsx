
import MainLayout from "@/layouts/MainLayout";
import {
  BarChart3,
  Utensils,
  Clock,
  CheckCircle2,
  ThumbsUp,
  ChevronDown,
  Users,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const OrderCard = ({ 
  id, 
  customer, 
  items, 
  total, 
  time, 
  status 
}: { 
  id: string; 
  customer: string; 
  items: string; 
  total: string; 
  time: string; 
  status: string; 
}) => {
  return (
    <div className="thai-container p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="font-bold">#{id}</span>
          <span className="text-muted-foreground text-sm">{time}</span>
        </div>
        <div>
          <span className={`px-2 py-1 rounded-full text-xs ${
            status === 'ใหม่' 
              ? 'bg-blue-100 text-blue-600' 
              : status === 'กำลังเตรียม' 
                ? 'bg-orange-100 text-orange-600'
                : 'bg-green-100 text-green-600'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <p className="font-medium">{customer}</p>
      <p className="text-sm text-muted-foreground line-clamp-1">{items}</p>
      
      <div className="flex justify-between items-center mt-2">
        <span className="font-bold">{total}</span>
        <div className="space-x-2">
          {status === 'ใหม่' ? (
            <>
              <Button variant="outline" size="sm">ปฏิเสธ</Button>
              <Button className="thai-button py-1 h-8">รับออเดอร์</Button>
            </>
          ) : status === 'กำลังเตรียม' ? (
            <Button className="thai-button py-1 h-8">พร้อมส่งแล้ว</Button>
          ) : (
            <Button variant="outline" size="sm">ดูรายละเอียด</Button>
          )}
        </div>
      </div>
    </div>
  );
};

const VendorDashboard = () => {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">แดชบอร์ดร้านค้า</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">สถานะร้าน: เปิดให้บริการ</span>
          <Button variant="outline" size="sm">
            เปลี่ยน
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="thai-container p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">รายได้วันนี้</h3>
            <DollarSign className="text-thai-accent" size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">฿3,450.00</p>
          <p className="text-xs text-muted-foreground">+12% จากเมื่อวาน</p>
        </div>
        
        <div className="thai-container p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">ออเดอร์วันนี้</h3>
            <Utensils className="text-thai-accent" size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">24</p>
          <p className="text-xs text-muted-foreground">+5 จากเมื่อวาน</p>
        </div>
        
        <div className="thai-container p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">ลูกค้าใหม่</h3>
            <Users className="text-thai-accent" size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">7</p>
          <p className="text-xs text-muted-foreground">+2 จากเมื่อวาน</p>
        </div>
        
        <div className="thai-container p-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">คะแนนเฉลี่ย</h3>
            <ThumbsUp className="text-thai-accent" size={20} />
          </div>
          <p className="text-2xl font-bold mt-2">4.8/5.0</p>
          <p className="text-xs text-muted-foreground">จาก 253 รีวิว</p>
        </div>
      </div>

      {/* Orders & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders Section */}
        <div className="lg:col-span-2">
          <div className="thai-container p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">ออเดอร์</h2>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                วันนี้ <ChevronDown size={16} />
              </Button>
            </div>
            
            <Tabs defaultValue="new">
              <TabsList className="mb-4">
                <TabsTrigger value="new" className="flex items-center gap-1">
                  <Clock size={16} /> ใหม่ <span className="bg-thai-highlight rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">3</span>
                </TabsTrigger>
                <TabsTrigger value="preparing" className="flex items-center gap-1">
                  <Utensils size={16} /> กำลังเตรียม <span className="bg-thai-highlight rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">2</span>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-1">
                  <CheckCircle2 size={16} /> เสร็จสิ้น
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="new">
                <OrderCard 
                  id="12345" 
                  customer="คุณสมศรี" 
                  items="ส้มตำไทย x1, ไก่ย่าง x1, ข้าวเหนียว x2" 
                  total="฿195.00" 
                  time="15:30" 
                  status="ใหม่" 
                />
                <OrderCard 
                  id="12346" 
                  customer="คุณสมชาย" 
                  items="ต้มแซ่บกระดูกหมู x1, ส้มตำปูปลาร้า x1, ข้าวเหนียว x1" 
                  total="฿220.00" 
                  time="15:20" 
                  status="ใหม่" 
                />
                <OrderCard 
                  id="12347" 
                  customer="คุณวิชัย" 
                  items="ลาบหมู x1, น้ำตกหมู x1, ข้าวเหนียว x2" 
                  total="฿180.00" 
                  time="15:15" 
                  status="ใหม่" 
                />
              </TabsContent>
              
              <TabsContent value="preparing">
                <OrderCard 
                  id="12343" 
                  customer="คุณมานี" 
                  items="ต้มยำกุ้งน้ำข้น x1, ข้าวสวย x2" 
                  total="฿160.00" 
                  time="15:05" 
                  status="กำลังเตรียม" 
                />
                <OrderCard 
                  id="12344" 
                  customer="คุณประสิทธิ์" 
                  items="ส้มตำปูปลาร้า x1, ไก่ย่าง x1, ข้าวเหนียว x1" 
                  total="฿210.00" 
                  time="15:00" 
                  status="กำลังเตรียม" 
                />
              </TabsContent>
              
              <TabsContent value="completed">
                <OrderCard 
                  id="12342" 
                  customer="คุณสมหมาย" 
                  items="ส้มตำไทย x2, ต้มแซ่บ x1, ข้าวเหนียว x3" 
                  total="฿245.00" 
                  time="14:30" 
                  status="เสร็จสิ้น" 
                />
                <OrderCard 
                  id="12341" 
                  customer="คุณวิภา" 
                  items="ลาบหมู x1, น้ำตกหมู x1" 
                  total="฿160.00" 
                  time="14:15" 
                  status="เสร็จสิ้น" 
                />
                <OrderCard 
                  id="12340" 
                  customer="คุณเอกชัย" 
                  items="ต้มยำกุ้ง x1, ปลานิลทอดกระเทียม x1, ข้าวสวย x2" 
                  total="฿340.00" 
                  time="13:45" 
                  status="เสร็จสิ้น" 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Analytics Section */}
        <div>
          <div className="thai-container p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">ยอดขายประจำสัปดาห์</h2>
              <BarChart3 size={20} className="text-thai-accent" />
            </div>
            <div className="h-60 flex items-end justify-between gap-2 border-b border-thai-accent pb-4">
              {[60, 45, 75, 50, 80, 65, 40].map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-thai-accent rounded-t-sm transition-all duration-500" 
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs">
                    {['จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส', 'อา'][index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm">
              <span>ยอดขายรวม</span>
              <span className="font-bold">฿22,450.00</span>
            </div>
          </div>

          <div className="thai-container p-4">
            <h2 className="text-xl font-bold mb-4">เมนูยอดนิยม</h2>
            <div className="space-y-3">
              {[
                { name: "ส้มตำไทย", count: 56, percentage: 80 },
                { name: "ต้มแซ่บกระดูกหมู", count: 42, percentage: 65 },
                { name: "ลาบหมู", count: 38, percentage: 60 },
                { name: "ไก่ย่าง", count: 35, percentage: 55 },
                { name: "น้ำตกหมู", count: 28, percentage: 45 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{item.name}</span>
                    <span className="text-sm">{item.count} ออเดอร์</span>
                  </div>
                  <div className="w-full bg-thai-container rounded-full h-2.5">
                    <div 
                      className="bg-thai-accent h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VendorDashboard;
