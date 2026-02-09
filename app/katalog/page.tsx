"use client";
import React, { useState, useEffect, Suspense } from 'react';
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import Particles from "../components/Particles";
import CategoryDropdown, { Category } from "../components/CategoryDropdown";
import { Product } from '../types/product';

// --- Komponent dekoracyjny tła (Ambient Light) ---
const AmbientBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
    {/* Złota poświata z lewej góry */}
    <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-yellow-600/10 rounded-full blur-[100px] mix-blend-screen" />
    {/* Niebieska/Chłodna poświata z prawej dołu dla kontrastu */}
    <div className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
    {/* Dolna poświata */}
    <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[40vw] bg-gray-800/20 rounded-full blur-[100px]" />
  </div>
);

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
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('❌ Błąd pobierania kategorii:', error);
        setCategories([{ key: 'all', label: 'Wszystkie kategorie', icon: '🔍' }]);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Synchronizacja URL -> Stan
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl) setSelectedCategory(categoryFromUrl);
  }, [searchParams]);

  // Pobieranie produktów
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchTerm.trim()) params.append('search', searchTerm.trim().toLowerCase());
        if (selectedCategory !== 'all') params.append('category', selectedCategory);

        const response = await fetch(`/api/products?${params}`);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data: Product[] = await response.json();
        setFilteredProducts(data);
      } catch (error) {
        console.error('❌ Błąd pobierania produktów:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const url = new URL(window.location.href);
    if (category === 'all') url.searchParams.delete('category');
    else url.searchParams.set('category', category);
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
      <section className="relative z-10 mb-10">
        <div className="p-[1px] rounded-2xl bg-gradient-to-r from-white/10 via-white/20 to-white/10 shadow-2xl">
          <div className="rounded-2xl bg-[#0a0a0a]/80 backdrop-blur-xl p-6 border border-white/5">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              
              {/* Pole wyszukiwania */}
              <div className="flex-1 w-full relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-500 group-focus-within:text-yellow-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Czego szukasz? (np. Laser, HIFU)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 bg-black/40 border border-white/10 rounded-xl text-gray-200 placeholder-gray-600 focus:outline-none focus:border-yellow-500/50 focus:ring-1 focus:ring-yellow-500/50 transition-all duration-300"
                  disabled={loading}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-white transition-colors"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Dropdown kategorii */}
              <div className="w-full md:w-auto min-w-[280px]">
                {loadingCategories ? (
                  <div className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center text-gray-400">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-500 mr-2"></div>
                    Ładowanie...
                  </div>
                ) : (
                  <CategoryDropdown
                    selectedCategory={selectedCategory}
                    onCategoryChange={handleCategoryChange}
                    categories={categories}
                  />
                )}
              </div>

              {/* Przycisk resetowania */}
              {(searchTerm || selectedCategory !== 'all') && (
                <button
                  onClick={clearFilters}
                  className="w-full md:w-auto px-6 py-4 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 rounded-xl text-gray-400 hover:text-red-400 transition-all duration-300 whitespace-nowrap group"
                >
                   <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Wyczyść filtry
                  </span>
                </button>
              )}
            </div>

            {/* Aktywne filtry - chipsy */}
            {(searchTerm || selectedCategory !== 'all') && (
              <div className="flex flex-wrap gap-2 items-center mt-5 pt-5 border-t border-white/5">
                <span className="text-xs uppercase tracking-widest text-gray-500 mr-2">Filtrowanie:</span>
                {searchTerm && (
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                    "{searchTerm}"
                  </span>
                )}
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {categories.find(c => c.key === selectedCategory)?.label}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-32 opacity-70">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500 mb-6"></div>
          <span className="text-xl text-gray-300 font-light tracking-wide">Przeszukiwanie katalogu...</span>
        </div>
      )}

      {/* Licznik produktów */}
      {!loading && filteredProducts.length > 0 && (
        <div className="mb-8 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <p className="text-gray-400 text-sm uppercase tracking-widest">
            Znaleziono <span className="text-white font-bold">{filteredProducts.length}</span> urządzeń
          </p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
      )}

      {/* Siatka produktów */}
      {!loading && (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 z-0">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link key={product.id} href={`/katalog/${product.slug}`} className="group h-full">
                <div className="relative h-full flex flex-col bg-[#111] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_0_30px_-5px_rgba(234,179,8,0.15)] hover:-translate-y-2">
                  
                  {/* Obrazek */}
                  <div className="relative aspect-[4/3] bg-gradient-to-b from-white/5 to-transparent overflow-hidden p-6">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    
                    {/* Badge Featured */}
                    {product.featured && (
                      <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur text-black px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-lg">
                        Polecane
                      </div>
                    )}

                    {/* Badge Category (opcjonalnie, jeśli masz category w obiekcie) */}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-gray-300 px-3 py-1 text-[10px] font-medium uppercase tracking-wider rounded border border-white/10">
                      {product.category || 'Urządzenie'}
                    </div>
                  </div>

                  {/* Treść */}
                  <div className="flex flex-col justify-between flex-grow p-6 bg-[#0a0a0a]">
                    <div>
                        <h2 className="text-lg font-medium text-gray-100 group-hover:text-yellow-400 transition-colors line-clamp-2 min-h-[3.5rem]">
                        {product.title}
                        </h2>
                    </div>
                    
                    <div className="pt-6 mt-auto">
                        <div className="w-full py-3 rounded-lg border border-white/10 text-center text-sm text-gray-400 group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-all duration-300 font-semibold flex items-center justify-center gap-2">
                            Zobacz szczegóły
                            <svg className="w-4 h-4 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 px-4 text-center bg-white/5 rounded-3xl border border-white/5 border-dashed">
              <div className="text-6xl mb-6 opacity-20 grayscale">🤷‍♂️</div>
              <h3 className="text-2xl font-light text-white mb-2">Brak wyników</h3>
              <p className="text-gray-400 mb-8 max-w-md">Nie znaleźliśmy produktów pasujących do Twoich kryteriów. Spróbuj zmienić kategorię lub wpisać inną frazę.</p>
              <button
                onClick={clearFilters}
                className="px-8 py-3 bg-yellow-500 text-black rounded-lg font-bold hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.2)]"
              >
                Wyczyść filtry i pokaż wszystko
              </button>
            </div>
          )}
        </section>
      )}
    </>
  );
}

export default function KatalogPage(): React.ReactElement {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] selection:bg-yellow-500 selection:text-black">
      
      {/* 1. Tło dekoracyjne */}
      <AmbientBackground />
      
      {/* 2. Cząsteczki */}
      <div className="fixed inset-0 z-[1] opacity-30 pointer-events-none">
        <Particles
          className="w-full h-full"
          particleCount={80}
          particleSpread={10}
          speed={0.004}
          particleColors={["#ffffff", "#f7e199"]}
          particleBaseSize={60}
          sizeRandomness={0.5}
          cameraDistance={25}
          moveParticlesOnHover={false}
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 md:py-32 flex flex-col gap-6">
        
        {/* Nagłówek Sekcji */}
        <div className="text-center mb-8 space-y-4">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
                Profesjonalne Urządzenia
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light">
                Przeglądaj naszą ofertę najwyższej klasy technologii kosmetycznych i medycznych. 
                Znajdź idealne rozwiązanie dla swojego biznesu.
            </p>
        </div>

        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
          </div>
        }>
          <KatalogContent />
        </Suspense>
      </main>
    </div>
  );
}