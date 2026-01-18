import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Maicon Lara",
  description: "Personal website and portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          <TooltipProvider>
            <div className="min-h-screen">
              <Header />
              <main className="pt-16">
                {children}
              </main>
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
