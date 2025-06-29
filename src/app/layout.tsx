import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { Roboto } from "next/font/google";

const robotoFont = Roboto({
  subsets: ["latin"],
  weight: "400"
})


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LocalBee",
  description: "Map to find Local gems.",
  keywords: ['nextjs', 'fastapi', 'localbee', 'map', 'travel', 'local']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoFont.className} antialiased`}
      >
        <div className="fixed top-0 left-0 right-0 z-50">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
