import type { Metadata } from "next";
import {Jost} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";
import Link from "next/link";

import { ReactLenis } from 'lenis/react'
import Footer from "./components/footer";
import { Analytics } from "@vercel/analytics/next"
import { FaWhatsapp } from "react-icons/fa";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Profesjonalne wyposażenie do salonów",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <ReactLenis root>
        <Analytics />
      <body
        className={`${jost.variable} ${jost.variable} antialiased overflow-x-hidden overflow-hidden`}
      >
        <Navbar />
        {children}
        <Footer />
        <div className="pointer-events-none fixed bottom-6 right-4 z-[60] sm:bottom-10 sm:right-8">
          <Link
            href="https://wa.me/48510255279"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500/70 text-white shadow-lg transition hover:bg-green-600 hover:scale-110 focus-visible:bg-green-600 focus-visible:scale-110"
          >
            <FaWhatsapp className="h-8 w-8" />
          </Link>
        </div>
      </body>
      </ReactLenis>
    </html>
  );
}
