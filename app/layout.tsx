import type { Metadata } from "next";
import AppProvider from "./providers/AppProvider";
import Navigation from "./components/Navigation/Navigation.component";
import "./global.css";

export const metadata: Metadata = {
  title: "RoomVU Shop",
  description: "An onlineshop service",
  keywords: "electronics, fashion, gadgets, best deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navigation />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
