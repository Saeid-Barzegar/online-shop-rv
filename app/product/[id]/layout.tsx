import type { Metadata } from "next";
import AppProvider from "@/app/providers/AppProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
