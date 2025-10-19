"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Particles from "../components/Particles";
import CategoryDropdown, { Category } from "../components/CategoryDropdown";
import { Product } from '../types/product';

// Komponent z useSearchParams opakowany w Suspense
function KatalogContent() {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Pobierz kategorie z API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch('/api/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data: Category[] = await response.json();
        console.log('📂 Pobrane kategorie:', data);
        setCategories(data);
      } catch (error) {
        console.error('❌ Błąd podczas pobierania kategorii:', error);
        // Fallback do podstawowej kategorii "wszystkie"
        setCategories([
          { key: 'all', label: 'Wszystkie kategorie', icon: '🔍' }
        ]);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Pobierz kategorię z URL przy pierwszym ładowaniu
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [searchParams]);

  // Pobierz produkty gdy zmienia się kategoria lub wyszukiwanie
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (searchTerm.trim()) {
          params.append('search', searchTerm.trim().toLowerCase());
        }
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }

        console.log('🔍 Pobieranie z parametrami:', params.toString());
        
        const response = await fetch(`/api/products?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data: Product[] = await response.json();
        console.log('📦 Otrzymano produktów:', data.length);
        setFilteredProducts(data);
      } catch (error) {
        console.error('❌ Błąd podczas pobierania produktów:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce dla wyszukiwania
    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Opcjonalnie: zaktualizuj URL bez przeładowania strony
    const url = new URL(window.location.href);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    const url = new URL(window.location.href);
    url.searchParams.delete('category');
    window.history.pushState({}, '', url);
  };

  return (
    <>
      {/* Sekcja filtrowania */}
      <section className="p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent">
        <div className="rounded-xl bg-black/30 backdrop-blur-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            
            {/* Pole wyszukiwania */}
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Szukaj produktów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-200"
                disabled={loading}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200 transition-colors"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Dropdown kategorii */}
            {loadingCategories ? (
              <div className="w-full md:w-64 px-4 py-3 bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-500"></div>
                <span className="ml-2 text-gray-400">Ładowanie...</span>
              </div>
            ) : (
              <CategoryDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                categories={categories}
              />
            )}

            {/* Przycisk resetowania */}
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-gray-900/30 backdrop-blur-sm border border-white/10 rounded-lg text-gray-300 hover:bg-gray-900/50 hover:text-white transition-all duration-200 whitespace-nowrap"
              >
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Wyczyść
                </span>
              </button>
            )}
          </div>

          {/* Aktywne filtry - chipsy */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex flex-wrap gap-2 items-center mt-4 pt-4 border-t border-white/10">
              <span className="text-sm text-gray-400">Aktywne filtry:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                  Szukaj: {`"${searchTerm}"`}
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-yellow-100"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {categories.find(c => c.key === selectedCategory)?.icon}{' '}
                  {categories.find(c => c.key === selectedCategory)?.label}
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className="ml-2 hover:text-blue-100"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          <span className="ml-4 text-xl text-gray-300">Ładowanie produktów...</span>
        </div>
      )}

      {/* Licznik produktów */}
      {!loading && filteredProducts.length > 0 && (
        <div className="text-center">
          <p className="text-gray-300 text-lg">
            Znaleziono <span className="font-bold text-yellow-500">{filteredProducts.length}</span>{" "}
            {filteredProducts.length === 1 ? "produkt" : filteredProducts.length < 5 ? "produkty" : "produktów"}
          </p>
        </div>
      )}

      {/* Siatka produktów */}
      {!loading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 z-[-10]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`}>
                <div className="group p-[1px] rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-transparent hover:from-yellow-500/30 hover:via-white/20 transition-all duration-300 h-full">
                  <div className="rounded-xl bg-black/30 backdrop-blur-sm overflow-hidden flex flex-col h-full">
                    <div className="relative h-64 bg-black/20 overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {product.featured && (
                        <div className="absolute top-3 right-3 bg-yellow-500 text-gray-900 px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                          POLECANE
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col justify-between flex-grow p-4">
                      <h2 className="text-lg font-bold min-h-[56px] text-gray-100 group-hover:text-yellow-500 transition-colors">
                        {product.title}
                      </h2>
                      <div className="border-t border-white/10 pt-3 mt-2">
                        <p className="text-xl font-bold text-yellow-500">{product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-300 mb-2">Brak produktów pasujących do kryteriów wyszukiwania</p>
              <p className="text-sm text-gray-400">Spróbuj zmienić filtry lub wyszukać coś innego</p>
              <button
                onClick={clearFilters}
                className="mt-6 px-6 py-3 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-600 transition-colors"
              >
                Pokaż wszystkie produkty
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

// Główny komponent ze Suspense boundary
export default function KatalogPage(): React.ReactElement {
  return (
    <div className="relative w-full pt-24 min-h-screen">
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

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col gap-8">
        <h1 className="text-4xl md:text-6xl text-white text-center font-light">Katalog produktów</h1>

        {/* Opakowujemy w Suspense */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
            <span className="ml-4 text-xl text-gray-300">Ładowanie...</span>
          </div>
        }>
          <KatalogContent />
        </Suspense>
      </main>
    </div>
  );
}
