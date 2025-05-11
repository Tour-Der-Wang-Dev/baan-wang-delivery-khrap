
import { useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import RestaurantMenu from "@/components/restaurants/RestaurantMenu";
import { Star, MapPin, Clock, PhoneCall, Info, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import SEO from "@/components/seo/SEO";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, we would fetch restaurant details based on the ID
  // For now, we'll use mock data
  const restaurant = {
    id: id || "1",
    name: "ส้มตำแซ่บนัว",
    coverImage: "https://placehold.co/1200x400/FFDAB9/333333?text=ส้มตำแซ่บนัว",
    logo: "https://placehold.co/200x200/FFEBCD/333333?text=Logo",
    cuisine: "อาหารอีสาน",
    rating: 4.7,
    reviewCount: 253,
    address: "123 ถนนวังสามหมอ ต.วังสามหมอ อ.วังสามหมอ จ.อุดรธานี 41280",
    distance: "1.2 กม.",
    openingHours: "10:00 - 21:00",
    deliveryTime: "15-25 นาที",
    minOrder: "฿50",
    description: "ร้านส้มตำรสชาติแซ่บถึงใจ สูตรต้นตำรับอีสาน ทุกจานปรุงสดใหม่ด้วยวัตถุดิบคุณภาพ",
    phone: "099-999-9999",
  };

  // Restaurant structured data for JSON-LD
  const restaurantStructuredData = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": restaurant.name,
    "image": restaurant.coverImage,
    "logo": restaurant.logo,
    "@id": `https://thineewangsammo.com/restaurant/${restaurant.id}`,
    "url": `https://thineewangsammo.com/restaurant/${restaurant.id}`,
    "telephone": restaurant.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": restaurant.address.split(",")[0],
      "addressLocality": "วังสามหมอ",
      "addressRegion": "อุดรธานี",
      "postalCode": "41280",
      "addressCountry": "TH"
    },
    "description": restaurant.description,
    "servesCuisine": restaurant.cuisine,
    "priceRange": "฿฿",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "10:00",
      "closes": "21:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": restaurant.rating,
      "reviewCount": restaurant.reviewCount
    },
    "potentialAction": {
      "@type": "OrderAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://thineewangsammo.com/restaurant/${restaurant.id}`,
        "inLanguage": "th",
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/IOSPlatform",
          "http://schema.org/AndroidPlatform"
        ]
      },
      "deliveryMethod": [
        "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet"
      ]
    }
  };

  return (
    <MainLayout>
      <SEO 
        title={restaurant.name}
        description={`${restaurant.name} - ${restaurant.description} ${restaurant.cuisine} เวลาเปิด ${restaurant.openingHours}`}
        canonicalUrl={`https://thineewangsammo.com/restaurant/${restaurant.id}`}
        ogType="restaurant"
        ogImage={restaurant.coverImage}
        structuredData={restaurantStructuredData}
      />
      
      <Link to="/" className="flex items-center gap-2 mb-4 text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} />
        <span>กลับไปหน้าหลัก</span>
      </Link>

      {/* Restaurant Cover Image */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden mb-6">
        <img
          src={restaurant.coverImage}
          alt={`หน้าร้าน ${restaurant.name} ร้านอาหาร${restaurant.cuisine}ในวังสามหมอ`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Restaurant Info */}
      <div className="thai-container p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={restaurant.logo}
              alt={`โลโก้ร้าน ${restaurant.name}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex-grow">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center bg-thai-highlight px-3 py-1 rounded-md">
                <Star size={18} className="text-yellow-500" />
                <span className="ml-1 font-semibold">{restaurant.rating}</span>
                <span className="text-sm ml-1">({restaurant.reviewCount} รีวิว)</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mt-1">{restaurant.cuisine}</p>
            <p className="mt-2">{restaurant.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-muted-foreground" />
                <span>{restaurant.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={16} className="text-muted-foreground" />
                <span>เปิด {restaurant.openingHours}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <PhoneCall size={16} className="text-muted-foreground" />
                <span>{restaurant.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Info size={16} className="text-muted-foreground" />
                <span>ส่งขั้นต่ำ {restaurant.minOrder} • เวลาจัดส่ง {restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant Menu */}
      <RestaurantMenu />
      
      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link to="/cart">
          <Button className="thai-button rounded-full px-6 shadow-lg">
            ตะกร้าสินค้า (2 รายการ) - ฿130.00
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
};

export default RestaurantDetail;
