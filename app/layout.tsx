import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
  description:
    "Detect acne, wrinkles, dryness & more with Aurora – an AI skin analyzer using deep learning & IoT for accurate, real-time skin health insights and care tips.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background">
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
