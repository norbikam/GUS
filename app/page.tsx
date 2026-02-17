"use client";

import React, { useRef, useState, useEffect } from "react";
import HeroSection from "./components/mainVidBg";
import Link from "next/link";
import Image from "next/image";
import { Product } from './types/product';
import Particles from "./components/Particles";
import ProductCarousel from "./components/ProductCarousel";
import FinancingPartner from "./components/FinancingPartner";
import MedicalLasersComponent from "./components/MedicalLaserComponent";

// Mapa ładnych nazw dla kategorii
const CATEGORY_LABELS: Record<string, string> = {
  "Lasery": "Lasery",
  "HIFU": "Urządzenia HIFU",
  "Radiofrekwencja": "Radiofrekwencja",
  "Plazma": "Urządzenia plazmowe",
  "IPL": "Technologia IPL",
  "Kriolipoliza": "Kriolipoliza",
  "Mezoterapia": "Mezoterapia",
  "Inne": "Pozostałe urządzenia"
};

export default function Home(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const financingRef = useRef<HTMLDivElement>(null);

  // Pobierz produkty z bazy danych
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (response.ok) {
          const data: Product[] = await response.json();
          setProducts(data);
        }
      } catch (error) {
        console.error('Błąd podczas pobierania produktów:', error);
      }
    };

    fetchProducts();
  }, []);

  // --- POPRAWKA TUTAJ ---
  // Używamy predykatu typu (c is string), aby TS był pewien, że nie ma nulli
  const activeCategories = Array.from(new Set(products
    .filter(p => p.active)
    .map(p => p.category)
  )).filter((c): c is string => typeof c === 'string' && c.length > 0);

  // Funkcja pomocnicza do pobierania produktów danej kategorii
  const getProductsByCategory = (category: string) => {
    return products.filter(p => p.category === category && p.active);
  };

  const featuredProducts = products.filter(p => p.featured && p.active);

  const scrollToNext = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById('produkty')?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const scrollToFinancing = (): void => {
    if (financingRef.current) {
      financingRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Wspólny styl dla przycisków (Premium Gold)
  const buttonBaseClass = "inline-block px-8 py-3 bg-gradient-to-r from-[#d4af37] to-[#f7e199] text-gray-900 font-bold rounded shadow-[0_4px_14px_0_rgba(212,175,55,0.39)] hover:shadow-[0_6px_20px_rgba(212,175,55,0.23)] hover:scale-105 transition-all duration-300 transform text-center cursor-pointer";
  
  // Wspólny styl dla kart
  const cardClass = "group flex flex-col items-center justify-between p-6 md:p-8 rounded-xl bg-gradient-to-br from-gray-900 via-[#111] to-gray-900 border border-white/10 text-center hover:border-[#d4af37]/50 transition duration-300 h-full min-h-[240px] shadow-lg";

  return (
    <div className="bg-[#050505] text-gray-200 selection:bg-[#d4af37] selection:text-black">
      <HeroSection/>

      <div className="relative w-full">
        {/* Gwiazdy — tło */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
          <Particles
            className="w-full h-full"
            particleCount={140}
            particleSpread={9}
            speed={0.006}
            particleColors={["#ffffff", "#f7e199", "#d4af37"]}
            alphaParticles={false}
            particleBaseSize={55}
            sizeRandomness={0.45}
            cameraDistance={22}
            moveParticlesOnHover={false}
          />
        </div>

        <main className="flex flex-col gap-[48px] md:gap-[64px] relative z-10 items-center w-full">
        
        {/* SEPARATOR */}
        <div className="mt-10 w-full max-w-7xl mx-auto px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        {/* HERO PRODUKTU - VENUSGLOW */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-7xl mx-auto justify-center items-center px-6 md:px-12 gap-8 md:gap-0">
          <div className="p-2 md:p-6 w-full">
            <div className="relative w-full pt-[56.25%] md:min-h-[420px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl shadow-black/50">
              <Image 
                src="/images/venusglow_black.png" 
                alt="VenusGlow Pro" 
                fill 
                className="object-contain scale-x-[-1] p-4 drop-shadow-2xl"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/5"/>
            </div>
          </div>
          
          <div className="relative h-full flex flex-col justify-center items-center md:items-start text-center md:text-left p-4 md:pl-12 space-y-6">
            <span aria-hidden className="hidden md:block absolute left-0 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37]/40 to-transparent" />
            
            <h1 className="text-5xl md:text-7xl font-extralight text-transparent bg-clip-text bg-gradient-to-b from-[#ffedb3] to-[#d4af37]">
              VenusGlow Pro
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-md">
              Zainspiruj się możliwościami i odkryj zupełnie nową jakość pracy w Twoim salonie.
            </p>
            <Link href="/katalog" className="w-full md:w-auto">
              <button className={`${buttonBaseClass} w-full md:w-auto min-w-[200px]`}>
                Sprawdź teraz
              </button>
            </Link>
          </div>
        </div>

        {/* SEKCJA KARUZELI - Polecane produkty */}
        <div ref={scrollRef} id="produkty" className="w-full">
          {featuredProducts.length > 0 && (
            <ProductCarousel
              title="Hity sprzedaży"
              products={featuredProducts}
            />
          )}
        </div>

        {/* SEKCJA NAWIGACYJNA - KAFELKI */}
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">
           <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
              
              {/* Karta 1: Leasing */}
              <div className={cardClass}>
                 <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-[#d4af37] mb-2">LEASING</h2>
                    <p className="text-gray-300 text-xs md:text-sm mb-4">Wygodne raty dla Twojego biznesu</p>
                 </div>
                 <button onClick={scrollToFinancing} className={buttonBaseClass + " text-xs md:text-sm px-4 md:px-6 py-2 w-full mt-auto"}>
                    Kalkulator
                 </button>
              </div>

              {/* Karta 2: Szkolenia */}
              <Link href="/szkolenia" className={cardClass}>
                 <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-light mb-2 group-hover:text-[#d4af37] transition-colors">Szkolenia</h2>
                    <p className="text-gray-400 text-xs md:text-sm mb-4">Podnieś kwalifikacje swojego zespołu</p>
                 </div>
                 <div className={buttonBaseClass + " text-xs md:text-sm px-4 md:px-6 py-2 w-full mt-auto"}>Oferta</div>
              </Link>

              {/* Karta 3: Ambasadorzy */}
              <Link href="/ambasadorzy" className={cardClass}>
                 <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-light mb-2 group-hover:text-[#d4af37] transition-colors">Współpraca</h2>
                    <p className="text-gray-400 text-xs md:text-sm mb-4">Dołącz do programu Ambasador</p>
                 </div>
                 <div className={buttonBaseClass + " text-xs md:text-sm px-4 md:px-6 py-2 w-full mt-auto"}>Dołącz</div>
              </Link>

              {/* Karta 4: Serwis */}
              <Link href="/serwis" className={cardClass}>
                 <div className="flex flex-col items-center">
                    <h2 className="text-xl md:text-2xl font-light mb-2 group-hover:text-[#d4af37] transition-colors">Serwis</h2>
                    <p className="text-gray-400 text-xs md:text-sm mb-4">Szybka pomoc i wsparcie techniczne</p>
                 </div>
                 <div className={buttonBaseClass + " text-xs md:text-sm px-4 md:px-6 py-2 w-full mt-auto"}>Wsparcie</div>
              </Link>
           </div>
        </div>

        {/* CTA "POLECANE" */}
        <div className="w-full flex flex-col items-center justify-center text-center gap-6 py-10 px-4">
          <h1 className="text-3xl md:text-5xl font-extralight tracking-tight">Najlepsza jakość w najlepszej cenie</h1>
          <p className="text-xl text-gray-400">Sprawdź nasze polecane urządzenia</p>
          <button 
            onClick={scrollToNext} 
            className={buttonBaseClass}
          >
            Zobacz Polecane
          </button>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        {/* Sekcja Finansowania */}
        <div ref={financingRef} className="w-full">
            <FinancingPartner />
        </div>

        <MedicalLasersComponent />

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        {/* ODKRYJ NAJNOWSZE - GRID PRODUKTÓW */}
        <section className="w-full px-4 md:px-10 max-w-[1400px]">
          <div className="text-left py-10">
            <h1 className="text-3xl md:text-5xl font-light pb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Odkryj najnowsze urządzenia
            </h1>
            <p className="text-gray-400 mt-2">Z nami zawsze znajdziesz to, czego szukasz.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`} className="group">
                <div className="flex flex-col h-full bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#d4af37]/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#d4af37]/10">
                  <div className="relative aspect-[3/4] w-full bg-black/20 overflow-hidden">
                     <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow p-4 bg-gradient-to-b from-transparent to-black/40">
                    <h2 className="text-sm md:text-base font-semibold text-gray-200 group-hover:text-[#d4af37] transition-colors line-clamp-2">
                      {product.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* DYNAMICZNE KARUZELE DLA RÓŻNYCH KATEGORII */}
        <div className="w-full space-y-12 pb-10">
          {activeCategories.map((categoryKey) => {
             const categoryProducts = getProductsByCategory(categoryKey);
             const displayTitle = CATEGORY_LABELS[categoryKey] || categoryKey;

             return (
               <ProductCarousel
                 key={categoryKey}
                 title={displayTitle}
                 products={categoryProducts}
                 categorySlug={categoryKey.toLowerCase()}
               />
             );
          })}
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
        </div>

        {/* SEKCJA KONTAKTOWA */}
        <div className="flex flex-col w-full justify-center items-center text-center gap-6 py-16 px-6 bg-gradient-to-b from-transparent to-[#d4af37]/5">
          <h2 className="text-3xl md:text-6xl font-extralight">Zapraszamy do współpracy</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Pomożemy Ci z wyborem odpowiedniego wyposażenia dla twojego salonu.
          </p>
          
          <Link href="/kontakt">
            <button className={`${buttonBaseClass} px-12 py-4 text-xl`}>
              Skontaktuj się już dziś
            </button>
          </Link>
          
          <p className="pt-4 text-sm text-gray-500">
            Zapraszamy do zapoznania się z naszą ofertą. Jesteśmy pewni, że znajdziesz coś dla siebie.
          </p>
        </div>
        
      </main>
      </div>
    </div>
  );
}