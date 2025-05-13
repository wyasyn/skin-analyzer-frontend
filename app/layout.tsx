import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
      <body
        className={cn(
          "flex flex-col min-h-screen bg-background mesh",
          inter.variable,
          playfair.variable
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
