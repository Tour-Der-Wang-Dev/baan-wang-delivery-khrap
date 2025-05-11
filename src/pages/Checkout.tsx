
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, ShoppingBag, Loader } from "lucide-react";
import MainLayout from "@/layouts/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { fetchUserAddresses, Address } from "@/utils/addressUtils";
import { createOrder } from "@/utils/orderUtils";

const Checkout = () => {
  const { cart, restaurantId, restaurantName, subTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [deliveryNotes, setDeliveryNotes] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAddresses, setLoadingAddresses] = useState<boolean>(true);

  const deliveryFee = 40;
  const total = subTotal + deliveryFee;

  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
      return;
    }

    const loadAddresses = async () => {
      setLoadingAddresses(true);
      try {
        const userAddresses = await fetchUserAddresses();
        setAddresses(userAddresses);
        
        // Select default address if available
        const defaultAddress = userAddresses.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (userAddresses.length > 0) {
          setSelectedAddressId(userAddresses[0].id);
        }
      } catch (error) {
        console.error("Error loading addresses:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    loadAddresses();
  }, [cart.length, navigate]);

  const handleSubmitOrder = async () => {
    if (!selectedAddressId) {
      alert("กรุณาเลือกที่อยู่จัดส่ง");
      return;
    }

    if (!restaurantId) {
      alert("ข้อมูลร้านอาหารไม่ถูกต้อง");
      return;
    }

    setLoading(true);

    try {
      const order = await createOrder(
        restaurantId,
        cart,
        selectedAddressId,
        paymentMethod,
        deliveryNotes
      );

      if (order) {
        clearCart();
        navigate(`/order/${order.id}`);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">ชำระเงิน</h1>

        {cart.length === 0 ? (
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>ไม่มีรายการสินค้าในตะกร้า</AlertTitle>
            <AlertDescription>
              กรุณาเลือกรายการอาหารก่อนดำเนินการชำระเงิน
            </AlertDescription>
          </Alert>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              {/* Delivery Address Section */}
              <div className="bg-white rounded-lg border shadow p-4">
                <h2 className="text-lg font-semibold mb-4">ที่อยู่จัดส่ง</h2>
                
                {loadingAddresses ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader className="h-5 w-5 animate-spin mr-2" />
                    <span>กำลังโหลดที่อยู่...</span>
                  </div>
                ) : addresses.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground mb-2">คุณยังไม่มีที่อยู่จัดส่ง</p>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/account")}
                    >
                      เพิ่มที่อยู่ใหม่
                    </Button>
                  </div>
                ) : (
                  <RadioGroup
                    value={selectedAddressId}
                    onValueChange={setSelectedAddressId}
                    className="space-y-3"
                  >
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={`flex items-start space-x-2 border rounded-md p-3 ${
                          selectedAddressId === address.id
                            ? "border-primary"
                            : "border-gray-200"
                        }`}
                      >
                        <RadioGroupItem value={address.id} id={address.id} />
                        <div className="grid gap-1">
                          <Label
                            htmlFor={address.id}
                            className="font-medium cursor-pointer"
                          >
                            {address.description}
                            {address.is_default && (
                              <span className="ml-2 text-xs bg-muted px-2 py-0.5 rounded">
                                ค่าเริ่มต้น
                              </span>
                            )}
                          </Label>
                          <div className="text-sm text-muted-foreground">
                            {address.street}, {address.city}, {address.state},{" "}
                            {address.zip_code}
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                <div className="mt-4 text-right">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => navigate("/account")}
                  >
                    จัดการที่อยู่
                  </Button>
                </div>
              </div>

              {/* Payment Method Section */}
              <div className="bg-white rounded-lg border shadow p-4">
                <h2 className="text-lg font-semibold mb-4">วิธีชำระเงิน</h2>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value="cash" id="payment-cash" />
                    <Label htmlFor="payment-cash">เงินสด</Label>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem
                      value="promptpay"
                      id="payment-promptpay"
                    />
                    <Label htmlFor="payment-promptpay">พร้อมเพย์</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Delivery Notes */}
              <div className="bg-white rounded-lg border shadow p-4">
                <h2 className="text-lg font-semibold mb-4">ข้อมูลเพิ่มเติม</h2>
                <div className="space-y-2">
                  <Label htmlFor="delivery-notes">หมายเหตุการจัดส่ง (ถ้ามี)</Label>
                  <Textarea
                    id="delivery-notes"
                    placeholder="ระบุข้อมูลเพิ่มเติมสำหรับการจัดส่ง เช่น แลนด์มาร์ค จุดสังเกต หรือคำแนะนำในการจัดส่ง"
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg border shadow p-4 h-fit">
              <h2 className="text-lg font-semibold mb-4">สรุปรายการ</h2>
              
              <div className="mb-4">
                <h3 className="font-medium text-thai-highlight">
                  {restaurantName}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between">
                    <div className="flex items-start">
                      <span className="mr-1">{item.quantity} x</span>
                      <span>{item.menuItem.name}</span>
                    </div>
                    <span className="font-medium">
                      {(item.menuItem.price * item.quantity).toFixed(2)} ฿
                    </span>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>ราคารวม</span>
                  <span>{subTotal.toFixed(2)} ฿</span>
                </div>
                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{deliveryFee.toFixed(2)} ฿</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between font-bold text-lg">
                <span>รวมทั้งสิ้น</span>
                <span>{total.toFixed(2)} ฿</span>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={loading || addresses.length === 0}
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" /> กำลังดำเนินการ...
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-4 w-4" /> ยืนยันคำสั่งซื้อ
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Checkout;
