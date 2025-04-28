"use client";

import Image from "next/image";
import HeroSection from "./components/mainVidBg";
import {Button} from "@heroui/button";
import {useRef} from "react";
import { products } from "@/app/products";
import Link from "next/link";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight-60, behavior: "smooth" });
    }
  }
  return (
    <div className="">
      <HeroSection/>

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        
        <div className="grid md:grid-cols-2 sm:grid-cols-1 w-full md:px-10 px-8 justify-center items-center font-light bg-gray-200">
          <div className="grid grid-cols-2 w-full gap-4 bg-gray-200 text-black rounded text-center">
            <div className="p-10">1</div>
            <div className="p-10">2</div>
            <div className="p-10">3</div>
            <div className="p-10">4</div>
          </div>
          <div className="w-full grid-col-span-2 bg-gray-200 text-black h-full justify-center flex flex-col gap-4 md:p-10 p-6">
              <h1 className="text-4xl font-light">Najlepsza jakość w najlepszej cenie</h1>
              <p className="text-2xl">Sprawdź nasze polecane urządzenia</p>
              <Button onPress={scrollToNext} className="bg-yellow-500 md:w-1/3 sm:w-full text-xl">Polecane</Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-10 pt-0 w-full">
          {products.slice(4).map((product) => (
            <Link key={product.title} href={`/katalog/${product.slug}`}>
              <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition items-center justify-center flex flex-col text-center">
                <Image src={product.image} alt={product.title} height={400} width={300}  />
                <div className="p-4">
                  <h2 className="text-xl font-bold">{product.title}</h2>
                  <p className="text-gray-600">{product.price}</p>  
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full md:px-10 px-8 justify-center items-center font-light text-center">
            <div>Left</div>
            <div>Right</div>
        </div>

        
      </main>
    </div>
  );
}
