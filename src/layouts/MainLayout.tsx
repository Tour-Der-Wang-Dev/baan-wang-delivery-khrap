
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HelmetProvider } from 'react-helmet-async';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-3 py-4 sm:px-4 sm:py-6">
          {children}
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default MainLayout;
