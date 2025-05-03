"use client";

import HeroSection from "./components/mainVidBg";
import {Button} from "@heroui/button";
import {useRef} from "react";
import { ProductsDisplay } from "./components/productsdisplay";
import { products } from "./products";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      document.getElementById('produkty')?.scrollIntoView({ behavior: "smooth" });
    }
  }

  const ScrollTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <div className="">
      <HeroSection/>

      <Button onPress={ScrollTop} className="text-3xl fixed bottom-10 right-8 w-12 h-15 z-[0] rounded-full bg-yellow-500/70 ">↑</Button>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:px-10 px-8 justify-center items-center font-light bg-gray-200">
          <div className="grid grid-cols-2 w-full gap-4 bg-gray-200 text-black rounded text-center sm:aspect-square md:aspect-auto">
            <div className="py-10"><h2 className="text-3xl">12 RAT</h2><p>bez żadnej prowizji</p></div>
            <div className="py-10"><h2 className="text-3xl">SZKOLENIE</h2><p>wliczone w cenę</p></div>
            <div className="py-10"><h2 className="text-3xl">15 LAT</h2><p>w branży beauty</p></div>
            <div className="py-10"><h2 className="text-3xl">ROK</h2><p>gwarancji na wszystkie urządzenia</p></div>
          </div>
          <div className="w-full bg-gray-200 text-black h-full justify-center flex flex-col gap-4 md:p-10 p-6">
              <h1 className="text-4xl font-light">Najlepsza jakość w najlepszej cenie</h1>
              <p className="text-2xl">Sprawdź nasze polecane urządzenia</p>
              <Button onPress={scrollToNext} className="bg-yellow-500 md:w-1/3 sm:w-full text-xl">Polecane</Button>
          </div>
        </div>

        <ProductsDisplay amount={4}/>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full justify-center items-center font-light text-center">
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
                  <source src="/videos/bgsmokecoloredcompressed.mp4" type="video/mp4" />
                  Twoja przeglądarka nie wspiera odtwarzania wideo.
              </video>
              <video src="/videos/lasertreatment.mp4" autoPlay muted loop playsInline preload="auto"></video>
              </div>
        </div>

        <div id="produkty" className="grid grid-cols-2 lg:grid-cols-6 md:grid-cols-3 gap-6 p-10 pt-0 w-full">
          <div className="p-4 flex flex-col justify-center items-center">
            <h1 className="text-lg md:text-5xl pb-6">Odkryj najnowsze urządzenia</h1><p>U nas, zawsze dostaniesz to, czego potrzebujesz</p>
          </div>
          {products.slice(1, 6).map((product) => (
            <Link key={product.title} href={`/katalog/${product.slug}`}>
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
