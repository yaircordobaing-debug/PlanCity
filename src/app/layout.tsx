import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/layout/BottomNav";
import Sidebar from "@/components/layout/Sidebar";
import TopHeader from "@/components/layout/TopHeader";
import Toast from "@/components/ui/Toast";
import OnboardingTooltip from "@/components/ui/OnboardingTooltip";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "PlanCity - Prototype",
  description: "Platform to discover what is happening in the city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${nunito.variable} antialiased bg-gray-100 font-sans text-gray-800 flex justify-center h-screen overflow-hidden`}>
         <Sidebar />
         
         {/* Content Wrapper - Center it perfectly, expand on desktop */}
         <div className="w-full h-full relative isolate flex flex-col bg-background shadow-2xl mx-auto lg:max-w-6xl lg:ml-64 xl:max-w-7xl xl:ml-72 transition-all duration-300">
           <TopHeader />
           <Toast />
           <OnboardingTooltip />
           <main className="flex-1 overflow-y-auto relative w-full h-full scrollbar-hide lg:border-x lg:border-gray-200 bg-gray-50 pb-20 lg:pb-0">
              {children}
           </main>
           
           <BottomNav />
         </div>
      </body>
    </html>
  );
}
