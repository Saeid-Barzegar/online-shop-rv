import type { Metadata } from "next";
import AppProvider from "@/app/providers/AppProvider";

export const metadata: Metadata = {
  title: "Product details",
  description: "See product details and add to cart",
  keywords: "electronics, fashion, gadgets, best deals",
};

export default function ProductDetails({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
}
