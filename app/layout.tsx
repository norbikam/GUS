import type { Metadata } from "next";
import {Jost} from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

import { ReactLenis } from 'lenis/react'

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
      <body
        className={`${jost.variable} ${jost.variable} antialiased overflow-x-hidden`}
      >
        <Navbar />
        {children}
      </body>
      </ReactLenis>
    </html>
  );
}
