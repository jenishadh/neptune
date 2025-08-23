import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neptune",
  description: "Music recognition and recommendation system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col min-h-screen antialiased`}
      >
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
