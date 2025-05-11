
import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, Check, Loader, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/contexts/AuthContext";
import {
  Address,
  fetchUserAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from "@/utils/addressUtils";

const AddressesManager = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAddress, setEditAddress] = useState<Address | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Form state
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  // Load addresses when component mounts
  useEffect(() => {
    loadAddresses();
  }, []);

  // Load addresses from Supabase
  const loadAddresses = async () => {
    setLoading(true);
    try {
      const userAddresses = await fetchUserAddresses();
      setAddresses(userAddresses);
    } catch (error) {
      console.error("Error loading addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setDescription("");
    setStreet("");
    setCity("");
    setState("");
    setZipCode("");
    setIsDefault(false);
    setEditAddress(null);
  };

  // Initialize form with address data for editing
  const initializeEditForm = (address: Address) => {
    setEditAddress(address);
    setDescription(address.description);
    setStreet(address.street);
    setCity(address.city);
    setState(address.state);
    setZipCode(address.zip_code);
    setIsDefault(address.is_default || false);
    setIsEditDialogOpen(true);
  };

  // Handle form submission for adding new address
  const handleAddAddress = async () => {
    if (!description || !street || !city || !state || !zipCode) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setFormLoading(true);
    try {
      const newAddress = await createAddress({
        description,
        street,
        city,
        state,
        zip_code: zipCode,
        is_default: isDefault,
      });

      if (newAddress) {
        resetForm();
        setIsAddDialogOpen(false);
        await loadAddresses();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle form submission for updating address
  const handleUpdateAddress = async () => {
    if (!editAddress || !description || !street || !city || !state || !zipCode) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setFormLoading(true);
    try {
      const updatedAddress = await updateAddress(editAddress.id, {
        description,
        street,
        city,
        state,
        zip_code: zipCode,
        is_default: isDefault,
      });

      if (updatedAddress) {
        resetForm();
        setIsEditDialogOpen(false);
        await loadAddresses();
      }
    } catch (error) {
      console.error("Error updating address:", error);
    } finally {
      setFormLoading(false);
    }
  };

  // Handle address deletion
  const handleDeleteAddress = async (addressId: string) => {
    try {
      const result = await deleteAddress(addressId);
      if (result) {
        await loadAddresses();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // Handle setting default address
  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      const result = await setDefaultAddress(addressId);
      if (result) {
        await loadAddresses();
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">ที่อยู่จัดส่ง</h2>
          <p className="text-sm text-muted-foreground">
            จัดการที่อยู่จัดส่งของคุณ
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus size={16} className="mr-2" /> เพิ่มที่อยู่
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>เพิ่มที่อยู่ใหม่</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="description">ชื่อที่อยู่</Label>
                <Input
                  id="description"
                  placeholder="บ้าน, ที่ทำงาน, ฯลฯ"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">ที่อยู่</Label>
                <Input
                  id="street"
                  placeholder="บ้านเลขที่, อาคาร, ซอย, ถนน"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">เขต/อำเภอ</Label>
                  <Input
                    id="city"
                    placeholder="เขต/อำเภอ"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">จังหวัด</Label>
                  <Input
                    id="state"
                    placeholder="จังหวัด"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip_code">รหัสไปรษณีย์</Label>
                <Input
                  id="zip_code"
                  placeholder="รหัสไปรษณีย์"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="is_default"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_default" className="cursor-pointer">
                  ตั้งเป็นที่อยู่จัดส่งหลัก
                </Label>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                disabled={formLoading}
              >
                ยกเลิก
              </Button>
              <Button onClick={handleAddAddress} disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader className="w-4 h-4 mr-2 animate-spin" />
                    กำลังบันทึก...
                  </>
                ) : (
                  "บันทึก"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : addresses.length === 0 ? (
        <div className="text-center py-10 border rounded-lg">
          <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">ไม่มีที่อยู่</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            คุณยังไม่มีที่อยู่จัดส่ง กรุณาเพิ่มที่อยู่ใหม่
          </p>
          <Button
            className="mt-4"
            onClick={() => setIsAddDialogOpen(true)}
          >
            เพิ่มที่อยู่
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <p className="font-medium">{address.description}</p>
                      {address.is_default && (
                        <span className="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                          ค่าเริ่มต้น
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {address.street}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state}, {address.zip_code}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {!address.is_default && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleSetDefaultAddress(address.id)}
                        title="ตั้งเป็นค่าเริ่มต้น"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}

                    <Dialog
                      open={isEditDialogOpen && editAddress?.id === address.id}
                      onOpenChange={(open) => {
                        if (!open) setIsEditDialogOpen(false);
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => initializeEditForm(address)}
                          title="แก้ไข"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>แก้ไขที่อยู่</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">ชื่อที่อยู่</Label>
                            <Input
                              id="edit-description"
                              placeholder="บ้าน, ที่ทำงาน, ฯลฯ"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-street">ที่อยู่</Label>
                            <Input
                              id="edit-street"
                              placeholder="บ้านเลขที่, อาคาร, ซอย, ถนน"
                              value={street}
                              onChange={(e) => setStreet(e.target.value)}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-city">เขต/อำเภอ</Label>
                              <Input
                                id="edit-city"
                                placeholder="เขต/อำเภอ"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-state">จังหวัด</Label>
                              <Input
                                id="edit-state"
                                placeholder="จังหวัด"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-zip_code">รหัสไปรษณีย์</Label>
                            <Input
                              id="edit-zip_code"
                              placeholder="รหัสไปรษณีย์"
                              value={zipCode}
                              onChange={(e) => setZipCode(e.target.value)}
                            />
                          </div>
                          <div className="flex items-center space-x-2 pt-2">
                            <input
                              type="checkbox"
                              id="edit-is_default"
                              checked={isDefault}
                              onChange={(e) => setIsDefault(e.target.checked)}
                              className="w-4 h-4"
                            />
                            <Label
                              htmlFor="edit-is_default"
                              className="cursor-pointer"
                            >
                              ตั้งเป็นที่อยู่จัดส่งหลัก
                            </Label>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            variant="outline"
                            onClick={() => setIsEditDialogOpen(false)}
                            disabled={formLoading}
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            onClick={handleUpdateAddress}
                            disabled={formLoading}
                          >
                            {formLoading ? (
                              <>
                                <Loader className="w-4 h-4 mr-2 animate-spin" />
                                กำลังบันทึก...
                              </>
                            ) : (
                              "บันทึก"
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          title="ลบ"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>ยืนยันการลบที่อยู่</AlertDialogTitle>
                          <AlertDialogDescription>
                            คุณแน่ใจหรือไม่ว่าต้องการลบที่อยู่นี้? การกระทำนี้ไม่สามารถยกเลิกได้
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteAddress(address.id)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            ลบ
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddressesManager;
