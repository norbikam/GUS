"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "../types/product";

interface ProductCarouselProps {
  title: string;
  products: Product[];
  categorySlug?: string;
}

export default function ProductCarousel({
  title,
  products,
  categorySlug,
}: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (products.length === 0) return null;

  return (
    <section className="w-full px-4 md:px-10 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl md:text-4xl font-light">{title}</h2>
        {categorySlug && (
          <Link
            href={`/katalog?category=${categorySlug}`}
            className="text-yellow-500 hover:text-yellow-400 transition text-sm md:text-base"
          >
            Zobacz wszystkie →
          </Link>
        )}
      </div>

      <div className="relative group">
        {/* Przycisk przewijania w lewo */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          aria-label="Przewiń w lewo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Kontener karuzeli */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory pb-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/katalog/${product.slug}`}
              className="flex-shrink-0 w-[280px] md:w-[320px] snap-start"
            >
              <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg overflow-hidden transition-all hover:scale-105 hover:bg-gray-900/50 flex flex-col h-full border border-white/10">
                <div className="relative h-64 bg-black/20">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 280px, 320px"
                  />
                  {product.featured && (
                    <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold rounded">
                      POLECANE
                    </div>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 min-h-[56px]">
                    {product.title}
                  </h3>
                  <div className="border-t border-white/20 pt-3 mt-2">
                    {/* <p className="text-xl font-bold text-yellow-500">{product.price}</p> */}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Przycisk przewijania w prawo */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-900 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block"
          aria-label="Przewiń w prawo"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
