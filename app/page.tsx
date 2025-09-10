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
        className="text-3xl fixed bottom-10 right-8 w-12 h-15 z-[0] rounded-full bg-yellow-500/70"
      >
        ↑
      </button>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:px-10 px-8 justify-center items-center font-light bg-gray-200">
          <div className="grid grid-cols-2 w-full gap-4 bg-gray-200 text-black rounded text-center sm:aspect-square md:aspect-auto">
            <div className="py-10"><h2 className="text-3xl">LEASING</h2><p>Wszystkie produkty w dogodnych ratach</p></div>
            <div className="py-10"><h2 className="text-3xl">SZKOLENIE</h2><p>Możliwość odbycia szkolenia</p></div>
            <div className="py-10"><h2 className="text-3xl">15 LAT</h2><p>w branży beauty</p></div>
            <div className="py-10"><h2 className="text-3xl">JAKOŚĆ</h2><p>Urządzenia tylko najwyższej klasy</p></div>
          </div>
          <div className="w-full bg-gray-200 text-black h-full justify-center flex flex-col gap-4 md:p-10 p-6">
              <h1 className="text-4xl font-light">Najlepsza jakość w najlepszej cenie</h1>
              <p className="text-2xl">Sprawdź nasze polecane urządzenia</p>
              <button 
                onClick={scrollToNext} 
                className="bg-yellow-500 md:w-1/3 sm:w-full text-xl py-3 px-6 rounded"
              >
                Polecane
              </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-center font-light text-center">
          <div className="flex justify-center items-center">
              <Image width={400} height={400} alt="GUS" src={`/products/lumiglam.webp`}></Image>
              <Image width={400} height={400} alt="GUS" src={`/products/lumiglam.webp`} className="absolute bg-cover blur-2xl"></Image>
              </div>
            <div className="border-l text-left p-10 mx-10">
              <h1 className="text-4xl pb-2">LumiGlam Pro 1550+1927nm</h1>
              <p>Odkryj LumiGlam Pro i wnieś swoją pracę na nowy poziom</p>
              
              
              <Link href="/katalog/lumiglam-pro-19271550nm-zaawansowany-laser-frakcyjny-o-podwjnej-dugoci-fali"><button  
                className="bg-yellow-500 md:w-1/3 sm:w-full text-xl py-3 px-6 rounded mt-4"
              >
                Sprawdź teraz
              </button></Link>
            </div>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-center font-light text-center ">
          
            <div className="border-l text-left p-10 mx-10">
              <h1 className="text-7xl pb-2">Lasery</h1>
              <p>Odkryj naszą zaawansowaną linię laserów, która wykorzystują najnowsze technologie, by zapewnić Twoim klientom naturalny efekt odmłodzenia i długotrwałe rezultaty.</p>
            </div>
            <div>
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
              <video src="/videos/lasertreatment.mp4" autoPlay muted loop playsInline preload="auto"></video>
              </div>
        </div>

          <div>
        <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
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
          {products.slice(1, 6).map((product) => (
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
        </div>

        <div className="flex flex-col w-full justify-center items-center font-light text-center gap-4 py-6 px-6">
          <h2 className="text-3xl md:text-5xl">Zapraszamy do współpracy</h2>
          <p className="text-lg">Pomożemy Ci z wyborem odpowiedniego wyposażenia dla twojego salonu</p>
          <a
              href="/kontakt"
              className="inline-block bg-yellow-500/90 text-gray-900 px-10 py-3 rounded-lg hover:bg-yellow-600 transition text-center w-full md:w-auto"
            >
              Skontaktuj się już dziś
            </a>
            <p>Zapraszamy do zapoznania się z naszą ofertą. Jesteśmy pewni, że znajdziesz coś dla siebie.</p>
        </div>
        
      </main>
    </div>
  );
}
