"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import ProductSearch from '../components/ProductSearch';
import Particles from "../components/Particles";
import { Product } from '../types/product';

export default function KatalogPage(): React.ReactElement {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Pobierz wszystkie produkty przy pierwszym ładowaniu
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: Product[] = await response.json();
        setFilteredProducts(data); // Ustaw wszystkie produkty na początku
      } catch (error) {
        console.error('❌ Błąd podczas pobierania produktów:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  const handleFilteredProducts = (products: Product[]): void => {
    if (Array.isArray(products)) {
      setFilteredProducts(products);
    } else {
      console.error('Otrzymane dane nie są tablicą:', products);
      setFilteredProducts([]);
    }
  };

  return (
    <div className="relative w-full pt-24">
      {/* Subtelne gwiazdki w tle */}
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-45 md:opacity-55">
        <Particles
          className="w-full h-full"
          particleCount={120}
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

      <main className="relative z-10 max-w-6xl mx-auto px-8 md:px-10 py-12 md:py-16 flex flex-col gap-8">
        <h1 className="text-4xl md:text-6xl text-white text-center">Sklep</h1>

        {/* Wyszukiwarka w karcie glass */}
        <section className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
          <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Znajdź idealne urządzenie</h2>
            <ProductSearch onFilteredProducts={handleFilteredProducts} />
          </div>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <span className="ml-4 text-xl text-gray-300">Ładowanie produktów...</span>
          </div>
        )}

        {/* Siatka produktów w stylu glass */}
        {!loading && (
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link key={product.id} href={`/katalog/${product.slug}`}>
                  <div className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent hover:via-white/20 transition h-full">
                    <div className="rounded-xl bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                      <Image
                        src={product.image}
                        alt={product.title}
                        height={400}
                        width={300}
                        className="object-cover w-full"
                      />
                      <div className="flex flex-col justify-between flex-grow p-4">
                        <h2 className="text-lg font-bold min-h-[56px]">{product.title}</h2>
                        <p className="text-gray-300 border-t border-white/10 pt-2">{product.price}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-300">Brak produktów pasujących do kryteriów wyszukiwania</p>
                <p className="text-sm text-gray-400 mt-2">Spróbuj zmienić filtry lub wyszukać coś innego</p>
              </div>
            )}
          </section>
        )}

        {/* Info o liczbie znalezionych produktów */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center">
            <p className="text-gray-300">
              Znaleziono {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "produkt" : filteredProducts.length < 5 ? "produkty" : "produktów"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
