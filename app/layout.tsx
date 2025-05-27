import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Roboto, Cormorant_Garamond } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
  description:
    "Detect acne, wrinkles, dryness & more with Aurora – an AI skin analyzer using deep learning & IoT for accurate, real-time skin health insights and care tips.",
  openGraph: {
    type: "website",
    url: "https://skin-analyzer-frontend.vercel.app/",
    title: "Aurora Skin Analyzer – AI-Powered Skin Condition Detection & Care",
    description:
      "Detect acne, wrinkles, dryness & more with Aurora – an AI skin analyzer using deep learning & IoT for accurate, real-time skin health insights and care tips.",
    siteName: "Skin Analyzer",
    images: [
      { url: "https://skin-analyzer-frontend.vercel.app/opengraph-image.webp" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background mesh",
          roboto.variable,
          cormorant.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            {children}
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
