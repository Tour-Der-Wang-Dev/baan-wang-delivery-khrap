
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';

import Index from "./pages/Index";
import RestaurantDetail from "./pages/RestaurantDetail";
import Orders from "./pages/Orders";
import OrderDetail from "./pages/OrderDetail";
import VendorDashboard from "./pages/VendorDashboard";
import Account from "./pages/Account";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import RequireAuth from "./components/auth/RequireAuth";
import { useEffect } from "react";

// Create a client with mobile-optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnReconnect: true,
      gcTime: 1000 * 60 * 30, // 30 minutes (Updated from cacheTime which is deprecated)
    },
  }
});

const App = () => {
  // Add meta viewport tag to ensure proper scaling on mobile
  useEffect(() => {
    // Make sure the viewport meta tag is properly set
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0');
      document.head.appendChild(meta);
    } else if (viewportMeta instanceof HTMLMetaElement && !viewportMeta.content.includes('viewport-fit=cover')) {
      viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0');
    }
  }, []);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider disableHoverableContent>
          <Toaster />
          <Sonner closeButton position="top-center" />
          <BrowserRouter>
            <AuthProvider>
              <CartProvider>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/restaurant/:id" element={<RestaurantDetail />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  
                  {/* Protected routes */}
                  <Route element={<RequireAuth />}>
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/order/:id" element={<OrderDetail />} />
                    <Route path="/vendor-dashboard" element={<VendorDashboard />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/checkout" element={<Checkout />} />
                  </Route>
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </CartProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
