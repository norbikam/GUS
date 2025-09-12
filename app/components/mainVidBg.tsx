"use client";

import { motion } from "framer-motion";
import { Manrope } from "next/font/google";

const heroFont = Manrope({ subsets: ["latin"], weight: ["200","300","400"], variable: "--font-hero" });

export default function HeroSection() {
  // Smooth scroll to next section or by one viewport height
  const scrollToNext = () => {
    const next = document.getElementById("next-section");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight-60, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden mainvideobg">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/lumiglam_video.mp4" type="video/mp4" />
        Twoja przeglądarka nie wspiera odtwarzania wideo.
      </video>
      
      {/* Overlay to darken video for readability */}
      <div className="absolute inset-0 bg-black/50"/>
      
      

      {/* Centered Text */}
      
      <div className={`relative z-10 flex flex-col justify-center items-center h-full px-6 text-center ${heroFont.className}`}>
        <h1
          className="text-4xl md:text-6xl font-extralight text-white tracking-wide"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.25)" }}
        >
          Profesjonalne wyposażenie salonów
        </h1>
        <p
          className="mt-3 md:mt-4 text-lg md:text-2xl text-gray-200 font-light"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.2)" }}
        >
          Sprawdź nasze urządzenia i rozwiązania
        </p>
      </div>

      {/* Animated Scroll Button */}
      <div className="absolute bottom-32 w-full flex justify-center z-10">
        <motion.button
          type="button"
          onClick={scrollToNext}
          className="p-4 bg-yellow-500 rounded-full shadow-lg focus:outline-none"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          ↓
        </motion.button>
      </div>
    </section>
  );
}