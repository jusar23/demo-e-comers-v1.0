import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/cart/CartProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "Repuestos",
  description:
    "Tienda de repuestos para motos y motocargueros.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CartProvider>
        <div className="flex min-h-screen flex-col">

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </div>
        </CartProvider>
      </body>
    </html>
  );
}