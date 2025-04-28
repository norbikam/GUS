"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import Link from "next/link";
import { FacebookColor, InstagramColor, WhatsAppColor } from "./Social";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Strona Główna" },
    { href: "/sklep", label: "Sklep" },
    { href: "/onas", label: "O nas" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  const phoneNumber = "+48 510 255 279";

  return (
    <header>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-[80vw] mx-auto px-6 md:px-12 py-4 grid grid-cols-3 items-center">
          {/* Left placeholder / links */}
          <div className="col-span-1 flex items-center space-x-8">
            <div className="hidden md:flex">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors duration-300 ${
                    scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-300"
                  } mx-4`}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Center Logo */}
          <div className="col-span-1 flex justify-center">
            <Link
              href="/"
              className={`font-bold text-3xl transition-colors duration-300 ${
                scrolled ? "text-yellow-500" : "text-white"
              }`}
            >
              GUS
            </Link>
          </div>

          {/* Right Section: phone (desktop) + hamburger (mobile) */}
          <div className="col-span-1 flex justify-end items-center space-x-4">
            {/* Phone number on desktop */}
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className={`hidden md:block text-xl font-extralight transition-colors duration-300 ${
                scrolled ? "text-black hover:text-gray-700" : "text-white hover:text-gray-300"
              }`}
            >
              {phoneNumber}
            </a>
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden transition-colors duration-300 focus:outline-none ${
                scrolled ? "text-black" : "text-white"
              }`}
            >
              {menuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={`md:hidden fixed inset-0 z-[45] transition-colors duration-300 bg-black/90 ${
              scrolled ? "bg-white/90 text-black" : "bg-black text-white"
            }`}
            initial={{ opacity: 0}}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0,}}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-4 px-6 text-xl">
              <div className="flex justify-center gap-10 mb-4 pb-4">
                <FacebookColor />
                <InstagramColor />
                <WhatsAppColor />
              </div>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="transition-colors duration-300 py-2"
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}