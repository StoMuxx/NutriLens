import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";
import { LanguageProvider } from "@/components/LanguageProvider";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "NutriLens | AI Healthy Meal Insights",
  description:
    "AI-powered meal insights for healthier youth eating across Chinese and American campus food cultures.",
  applicationName: "NutriLens",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "NutriLens",
    statusBarStyle: "default"
  }
};

export const viewport: Viewport = {
  themeColor: "#16a34a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <LanguageProvider>
          <Navbar />
          <main className="pb-24 md:pb-8">{children}</main>
          <BottomNav />
        </LanguageProvider>
      </body>
    </html>
  );
}
