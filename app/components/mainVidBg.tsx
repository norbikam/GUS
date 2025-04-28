"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  // Smooth scroll to next section or by one viewport height
  const scrollToNext = () => {
    const next = document.getElementById("next-section");
    if (next) {
      next.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-screen h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
      >
        <source src="/videos/bgsmokecoloredcompressed.mp4" type="video/mp4" />
        Twoja przeglądarka nie wspiera odtwarzania wideo.
      </video>

      {/* Overlay to darken video for readability */}
      <div className="absolute inset-0 bg-black/50"/>

      {/* Centered Text */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Witaj na naszej stronie
        </h1>
        <p className="mt-4 text-lg md:text-2xl text-gray-200">
          Odkryj, jak możemy Ci pomóc
        </p>
      </div>

      {/* Animated Scroll Button */}
      <div className="absolute bottom-16 w-full flex justify-center z-10">
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
