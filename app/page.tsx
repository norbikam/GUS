"use client";

import React, { useRef, useState, useEffect } from "react";
import HeroSection from "./components/mainVidBg";
import Link from "next/link";
import Image from "next/image";
import { Product } from './types/product';
import Particles from "./components/Particles";

export default function Home(): React.ReactElement {
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const scrollToNext = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById('produkty')?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const scrollTop = (): void => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="">
      <HeroSection/>

      <button 
        onClick={scrollTop}
        className="text-3xl fixed bottom-10 right-8 w-12 h-15 z-[10] rounded-full bg-yellow-500/70"
      >
        ↑
      </button>

      <div className="relative w-full">
        {/* Gwiazdy — mniej cząstek, większy rozmiar, prosty shader */}
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
          <Particles
            className="w-full h-full"
            particleCount={260}
            particleSpread={9}
            speed={0.006}
            particleColors={["#ffffff", "#f7e199", "#d4af37"]}
            alphaParticles={false}
            particleBaseSize={70}
            sizeRandomness={0.45}
            cameraDistance={22}
            moveParticlesOnHover={false}
          />
        </div>

        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:px-10 px-8 justify-center items-center font-light">
          <div className="grid grid-cols-2 w-full gap-4 text-gray-200 rounded text-center sm:aspect-square md:aspect-auto">
            <div className="py-10"><h2 className="text-3xl">LEASING</h2><p>Wszystkie produkty w dogodnych ratach</p></div>
            <div className="py-10"><h2 className="text-3xl">SZKOLENIE</h2><p>Możliwość odbycia szkolenia</p></div>
            <div className="py-10"><h2 className="text-3xl">15 LAT</h2><p>w branży beauty</p></div>
            <div className="py-10"><h2 className="text-3xl">GWARANCJA</h2><p>Obsługa w autoryzowanym serwisie</p></div>
          </div>
          <div className="w-full text-gray-200 h-full flex flex-col items-center justify-center text-center gap-4">
            <h1 className="text-4xl font-light">Najlepsza jakość w najlepszej cenie</h1>
            <p className="text-2xl">Sprawdź nasze polecane urządzenia</p>
            <button 
              onClick={scrollToNext} 
              className="bg-yellow-500 text-gray-900 text-xl py-3 px-8 rounded font-bold"
            >
              Polecane
            </button>
          </div>
        </div>
        {/* (Przeniesione) Separator pojawi się pod sekcją Lasery */}
        <div className="mt-10 w-full">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-stretch font-light text-center px-0">
          <div className="p-2 md:p-6 md:pl-2 md:pb-0">
            <div className="relative w-full pt-[56.25%] md:min-h-[420px] rounded-lg overflow-hidden bg-black/10">
              <Image src="/images/venusglow_img.png" alt="VenusGlow Pro" fill className="object-contain" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"/>
            </div>
          </div>
          <div className="relative h-full flex flex-col justify-center items-center text-left p-10 md:pl-10">
            <span aria-hidden className="hidden md:block absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <h1 className="text-7xl pb-2">VenusGlow Pro</h1>
            <p>Zainspiruj się możliwościami i odkryj zupełnie nową jakość pracy.</p>
            <Link href="/katalog/lumiglam-pro-19271550nm-zaawansowany-laser-frakcyjny-o-podwjnej-dugoci-fali"><button  
              className="bg-yellow-500 text-gray-900 md:w-1/3 sm:w-full text-xl py-3 px-6 rounded mt-4 font-bold min-w-full"
            >
              Sprawdź teraz
            </button></Link>
          </div>
        </div>
        {/* Mocniejszy separator pod sekcją Lasery */}
        

        {/* Sekcja polecanych produktów
        <div className="bg-[url(/images/starsbgalpha.png)] bg-cover">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
            {products.filter(p => p.featured).slice(0, 4).map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full">
                  <div className="relative h-64">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                      Polecane
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h2 className="text-lg font-bold mb-2">{product.title}</h2>
                    <p className="text-xl font-semibold text-blue-600 border-t pt-2">
                      {product.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div> */}

        {/* Reszta oryginalnej strony... */}
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-stretch font-light text-center gap-6 -mt-[32px]">
            {/* Lewa kolumna: tytuł i opis z delikatnym gradientowym paskiem po lewej */}
            <div className="relative h-full flex flex-col justify-center text-left py-10 pr-10 pl-0">
              <span aria-hidden className="hidden md:block absolute left-3 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <h1 className="text-7xl pb-2 pl-10">Lasery</h1>
              <p className="pl-10">Odkryj linię laserów nowej generacji – stworzoną, by zapewnić Twoim klientom naturalne odmłodzenie i długotrwałe efekty.</p>
            </div>
            {/* Prawa kolumna: surowe zdjęcie bez gradientu (zostaje padding) */}
            <div className="w-full flex justify-center items-center md:p-6 md:pr-2 md:pt-0 p-2">
              <div className="relative w-full pt-[56.25%] md:min-h-[420px] rounded-lg overflow-hidden bg-black/10">
                <Image src="/images/gus_machine.png" alt="Maszyna kosmetyczna" fill className="object-contain" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"/>
              </div>
            </div>
        </div>
        <div className="mt-10 w-full">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

          <div>
        <section ref={scrollRef} id="produkty" className="w-full px-8 md:px-10 pt-0">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-left p-10">
              <h1 className="text-4xl md:text-5xl pb-2">Odkryj najnowsze urządzenia</h1>
              <p>Z nami zawsze znajdziesz to, czego szukasz.</p>
            </div>
        <div style={{ width: '100%', height: '100%', position: 'absolute', zIndex:"-10" }}>
          <Particles
            particleColors={['#ffffff', '#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff','#ffffff', '#ff5050', '#50b3ff', '#fff20a']}
            particleCount={400}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={true}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div ref={scrollRef} id="produkty" className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6 p-10 pt-0 w-full z-10 relative">
          <div className="p-4 flex flex-col justify-center items-center">
            <h1 className="text-lg md:text-5xl pb-6">Odkryj najnowsze urządzenia</h1>
            <p>U nas, zawsze dostaniesz to, czego potrzebujesz</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-4">
            {products.slice(0, 6).map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`}>
                <div className="overflow-hidden transition flex flex-col text-center h-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    height={400}
                    width={300}
                    className="object-cover w-full"
                  />
                  <div className="flex flex-col justify-between flex-grow p-4">
                    <h2 className="text-xl font-bold min-h-[56px]">{product.title}</h2>
                    <p className="text-gray-600 border-t pt-2">{product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </section>
        </div>

        <div className="mt-10 w-full">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
        <div className="flex flex-col w-full justify-center items-center font-light text-center gap-4 py-6 px-6">
          <h2 className="text-3xl md:text-5xl">Zapraszamy do współpracy</h2>
          <p className="text-lg">Pomożemy Ci z wyborem odpowiedniego wyposażenia dla twojego salonu</p>
          <a
              href="/kontakt"
              className="inline-block bg-yellow-500/90 text-gray-900 px-10 py-3 rounded-lg hover:bg-yellow-600 transition text-center w-full md:w-auto font-bold"
            >
              Skontaktuj się już dziś
            </a>
            <p className="pt-4">Zapraszamy do zapoznania się z naszą ofertą. Jesteśmy pewni, że znajdziesz coś dla siebie.</p>
        </div>
        
      </main>
      </div>
    </div>
  );
}
