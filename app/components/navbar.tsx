"use client";

import { useState, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX, HiSearch, HiStar, HiShieldCheck, HiCurrencyDollar, HiCog } from "react-icons/hi";
import Link from "next/link";
import { FacebookColor, InstagramColor, WhatsAppColor } from "./Social";
import Image from "next/image";
import CategoryMenu from "./CategoryMenu";
import { useRouter } from "next/navigation";
import { getPrimaryImage, Product } from "../types/product";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [recommendedProducts, setRecommendedProducts] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "STRONA GŁÓWNA" },
    { href: "/katalog", label: "SKLEP" },
    { href: "/onas", label: "O NAS" },
    { href: "/kontakt", label: "KONTAKT" },
  ];

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const query = searchTerm.trim();

    if (!query) {
      setSearchResults([]);
      setRecommendedProducts([]);
      setSearching(false);
      return;
    }

    setSearching(true);
    const controller = new AbortController();
    const searchTimer = setTimeout(async () => {
      try {
        const [response, recommendationsResponse] = await Promise.all([
          fetch(`/api/products?search=${encodeURIComponent(query)}`, {
            signal: controller.signal,
          }),
          fetch("/api/products?featured=true", { signal: controller.signal }),
        ]);

        if (!response.ok) {
          throw new Error(`Search request failed with status ${response.status}`);
        }
        if (!recommendationsResponse.ok) {
          throw new Error(`Recommendations request failed with status ${recommendationsResponse.status}`);
        }

        const products: Product[] = await response.json();
        const recommendations: Product[] = await recommendationsResponse.json();
        setSearchResults(products.slice(0, 6));
        setRecommendedProducts(
          recommendations.filter((product) => !products.some((result) => result.id === product.id)).slice(0, 4)
        );
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Błąd wyszukiwania produktów w navbarze:", error);
        setSearchResults([]);
      } finally {
        if (!controller.signal.aborted) setSearching(false);
      }
    }, 250);

    return () => {
      controller.abort();
      clearTimeout(searchTimer);
    };
  }, [searchTerm]);

  // Rozdzielamy linki na lewą i prawą stronę
  const leftLinks = navLinks.filter(link => ["/", "/katalog"].includes(link.href));
  const rightLinks = navLinks.filter(link => ["/onas", "/kontakt"].includes(link.href));

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    const params = new URLSearchParams();

    if (query) params.set("search", query);

    router.push(`/katalog${params.toString() ? `?${params.toString()}` : ""}`);
    setSearchTerm("");
    setSearchFocused(false);
    setMenuOpen(false);
  };

  const handleSuggestionClick = () => {
    setSearchTerm("");
    setSearchFocused(false);
    setMenuOpen(false);
  };

  const searchResultsList = (mobile = false) => (
    <div
      className={`absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-xl border border-white/15 bg-[#111]/[.98] shadow-2xl backdrop-blur-xl ${
        mobile ? "z-[60]" : "z-[70]"
      }`}
    >
      {searching ? (
        <div className="px-4 py-3 text-sm text-gray-400">Wyszukiwanie...</div>
      ) : (
        <div className="overflow-y-auto py-2">
          {searchResults.length > 0 && (
            <div>
              <p className="px-4 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-500">
                Wyniki wyszukiwania
              </p>
              {searchResults.map((product) => (
                <Link
                  key={product.id}
                  href={`/katalog/${product.slug}`}
                  onClick={handleSuggestionClick}
                  className="flex items-center gap-3 px-3 py-2 text-left transition hover:bg-white/10"
                >
                  <Image
                    src={getPrimaryImage(product)}
                    alt=""
                    width={48}
                    height={40}
                    className="h-10 w-12 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-white">{product.title}</span>
                    {product.category && (
                      <span className="block truncate text-xs text-gray-400">{product.category}</span>
                    )}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {recommendedProducts.length > 0 && (
            <div className={searchResults.length > 0 ? "mt-2 border-t border-white/10 pt-2" : ""}>
              <p className="px-4 pb-1 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-yellow-500">
                Podobne i polecane
              </p>
              {recommendedProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/katalog/${product.slug}`}
                  onClick={handleSuggestionClick}
                  className="flex items-center gap-3 px-3 py-2 text-left transition hover:bg-white/10"
                >
                  <Image
                    src={getPrimaryImage(product)}
                    alt=""
                    width={48}
                    height={40}
                    className="h-10 w-12 rounded-md object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-white">{product.title}</span>
                    <span className="block truncate text-xs text-gray-400">Polecane urządzenie</span>
                  </span>
                </Link>
              ))}
            </div>
          )}

          {searchResults.length === 0 && recommendedProducts.length === 0 && (
            <p className="px-4 py-3 text-sm text-gray-400">Nie znaleziono produktów.</p>
          )}

          <div className="mt-2 grid grid-cols-2 gap-1 border-t border-white/10 px-2 pt-2">
            <Link href="/katalog" onClick={handleSuggestionClick} className="rounded-lg p-2 text-left transition hover:bg-yellow-500/10">
              <HiStar className="mb-1 h-4 w-4 text-yellow-500" />
              <span className="block text-xs font-semibold text-white">Hit roku</span>
              <span className="block text-[10px] text-gray-400">Najlepsze urządzenia</span>
            </Link>
            <Link href="/katalog" onClick={handleSuggestionClick} className="rounded-lg p-2 text-left transition hover:bg-yellow-500/10">
              <HiCurrencyDollar className="mb-1 h-4 w-4 text-yellow-500" />
              <span className="block text-xs font-semibold text-white">Najlepsza cena</span>
              <span className="block text-[10px] text-gray-400">Oferta dla salonów</span>
            </Link>
            <Link href="/serwis" onClick={handleSuggestionClick} className="rounded-lg p-2 text-left transition hover:bg-yellow-500/10">
              <HiCog className="mb-1 h-4 w-4 text-yellow-500" />
              <span className="block text-xs font-semibold text-white">Serwis i gwarancja</span>
              <span className="block text-[10px] text-gray-400">Spokojna praca</span>
            </Link>
            <Link href="/kontakt" onClick={handleSuggestionClick} className="rounded-lg p-2 text-left transition hover:bg-yellow-500/10">
              <HiShieldCheck className="mb-1 h-4 w-4 text-yellow-500" />
              <span className="block text-xs font-semibold text-white">Ubezpieczenie</span>
              <span className="block text-[10px] text-gray-400">Zapytaj o szczegóły</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className="navbar">
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          scrolled ? "bg-[#0a0a0a]" : "bg-transparent"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="lg:max-w-[90vw] md:max-w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 grid grid-cols-3 items-center">
          
          {/* LEWA STRONA - Home, Sklep, Kategorie */}
          <div className="flex items-center">
            <div className="hidden lg:flex gap-6 items-center">
              {leftLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors duration-300 text-white hover:text-gray-300 text-nowrap"
                >
                  {label}
                </Link>
              ))}
              <CategoryMenu />
            </div>
          </div>

          {/* ŚRODEK - Logo */}
          <div className="flex justify-center z-100">
            <Link
              href="/"
              className={`font-semibold text-3xl transition-colors duration-300 ${
                scrolled ? "text-yellow-500" : "text-white"
              }`}
            >
              <Image width={50} height={50} src={`/images/guslogo.png`} alt="GUS" />
            </Link>
          </div>

          {/* PRAWA STRONA - O nas, Kontakt oraz Mobile Hamburger */}
          <div className="flex justify-end items-center">
            <form onSubmit={handleSearch} className="relative hidden w-full lg:block">
              <label htmlFor="navbar-search" className="sr-only">
                Szukaj produktów
              </label>
              <HiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="navbar-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => window.setTimeout(() => setSearchFocused(false), 150)}
                placeholder="Szukaj..."
                className="w-full rounded-full border border-white/20 bg-white/10 py-2 pl-9 pr-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              />
              {searchFocused && searchTerm.trim() && searchResultsList()}
            </form>

            <div className="hidden lg:flex gap-5 items-center ml-4">
              {rightLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors duration-300 text-white hover:text-gray-300 text-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden transition-colors duration-300 focus:outline-none text-white"
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
            className="lg:hidden fixed inset-0 z-45 bg-black/95 overflow-y-auto overscroll-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Ten div odpowiada za bezpieczne odstępy na górze i na dole, aby nic nie było ucięte */}
            <div className="min-h-full flex flex-col items-center justify-start py-24 px-6">
              <form onSubmit={handleSearch} className="relative mb-8 w-full max-w-sm">
                <label htmlFor="mobile-navbar-search" className="sr-only">
                  Szukaj produktów
                </label>
                <HiSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  id="mobile-navbar-search"
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => window.setTimeout(() => setSearchFocused(false), 150)}
                  placeholder="Szukaj produktów..."
                  className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-12 pr-4 text-base text-white outline-none transition placeholder:text-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
                {searchFocused && searchTerm.trim() && searchResultsList(true)}
              </form>

              <div className="flex justify-center gap-10 mb-8 pb-4 border-b border-white/10 w-full max-w-xs">
                <FacebookColor />
                <InstagramColor />
                <WhatsAppColor />
              </div>
              
              <div className="flex flex-col items-center w-full space-y-4 text-xl">
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
                <div className="w-full max-w-xs mt-4">
                  <CategoryMenu isMobile={true} onLinkClick={() => setMenuOpen(false)} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}