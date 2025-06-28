"use client";
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import ProductSearch from '../components/ProductSearch';
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
    <div>
      <section className="relative w-screen h-[30vh] overflow-hidden mainvideobg">
        {/* Background Video */}
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

        {/* Overlay to darken video for readability */}
        <div className="absolute inset-0 bg-black/50"/>

        {/* Centered Text */}
        <div className="relative z-10 flex flex-col justify-end h-full px-6 text-center pb-10">
          <h1 className="text-4xl md:text-6xl text-white uppercase">
            Urządzenia
          </h1>
        </div>
      </section>

      {/* Sekcja wyszukiwania */}
      <div className="w-full px-8 md:px-10 py-8 ">
        <h2 className="text-2xl font-bold text-center mb-6">Znajdź idealne urządzenie</h2>
        <ProductSearch onFilteredProducts={handleFilteredProducts} />
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-xl text-gray-600">Ładowanie produktów...</span>
        </div>
      )}

      {/* Products grid - Twój oryginalny layout */}
      {!loading && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 p-10 pt-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`}>
                <div className="overflow-hidden shadow hover:shadow-lg transition flex flex-col text-center h-full">
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
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-xl text-gray-500">Brak produktów pasujących do kryteriów wyszukiwania</p>
              <p className="text-sm text-gray-400 mt-2">Spróbuj zmienić filtry lub wyszukać coś innego</p>
            </div>
          )}
        </div>
      )}

      {/* Info o liczbie znalezionych produktów */}
      {!loading && filteredProducts.length > 0 && (
        <div className="text-center pb-8">
          <p className="text-gray-600">
            Znaleziono {filteredProducts.length} {filteredProducts.length === 1 ? 'produkt' : 
            filteredProducts.length < 5 ? 'produkty' : 'produktów'}
          </p>
        </div>
      )}
    </div>
  );
}
