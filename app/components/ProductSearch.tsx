"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { Product, ProductSearchProps, Category } from '../types/product';

const ProductSearch: React.FC<ProductSearchProps> = ({ onFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [category, setCategory] = useState<string>('all');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Stabilna referencja do funkcji callback
  const stableOnFilteredProducts = useCallback(onFilteredProducts, []);

  // Pobierz kategorie przy pierwszym ładowaniu - TYLKO RAZ
  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        const response = await fetch('/api/products');
        const products: Product[] = await response.json();
        const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
        setCategories([
          { key: 'all', label: 'Wszystkie kategorie' },
          ...uniqueCategories.map(cat => ({ key: cat!, label: cat! }))
        ]);
        
        // Ustaw wszystkie produkty na początku
        stableOnFilteredProducts(products);
      } catch (error) {
        console.error('Błąd podczas pobierania kategorii:', error);
      }
    };

    fetchCategories();
  }, []); // Pusty array - uruchomi się tylko raz!

  // Wyszukiwanie z debounce - NAPRAWIONE
  useEffect(() => {
    // W funkcji searchProducts dodaj logowanie:


// W ProductSearch.tsx, w funkcji searchProducts:
const searchProducts = async (): Promise<void> => {
  setLoading(true);
  try {
    const params = new URLSearchParams();
    
    // Konwertuj wyszukiwanie na małe litery dla SQLite
    if (searchTerm.trim()) {
      params.append('search', searchTerm.trim().toLowerCase());
    }
    if (category !== 'all') params.append('category', category);

    console.log('🔍 Wyszukuję z parametrami:', params.toString());
    
    const response = await fetch(`/api/products?${params}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const filteredProducts: Product[] = await response.json();
    
    console.log('📦 Otrzymane produkty:', filteredProducts.length);
    
    if (Array.isArray(filteredProducts)) {
      stableOnFilteredProducts(filteredProducts);
    } else {
      console.error('API nie zwróciło tablicy:', filteredProducts);
      stableOnFilteredProducts([]);
    }
  } catch (error) {
    console.error('❌ Błąd wyszukiwania:', error);
    stableOnFilteredProducts([]);
  } finally {
    setLoading(false);
  }
};



    // Debounce - opóźnienie 500ms
    const debounceTimer = setTimeout(searchProducts, 500);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, category, stableOnFilteredProducts]); // Dodaj stableOnFilteredProducts

  const clearSearch = (): void => {
    setSearchTerm('');
    setCategory('all');
  };

  return (
    <div className="space-y-4 p-6 rounded-xl shadow-sm border bg-black">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Pole wyszukiwania */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Szukaj produktów..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={loading}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        
        {/* Select kategorii */}
        <div className="md:w-48">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="block w-full px-3 py-3 border bg-black text-gray-300 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {categories.map(cat => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Przycisk resetowania */}
        {(searchTerm || category !== 'all') && (
          <button
            onClick={clearSearch}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      {/* Status ładowania */}
      {loading && (
        <div className="flex items-center justify-center py-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">Wyszukiwanie...</span>
        </div>
      )}

      {/* Aktywne filtry
      {(searchTerm || category !== 'all') && !loading && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-600">Aktywne filtry:</span>
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Szukaj: "{searchTerm}"
              <button
                onClick={() => setSearchTerm('')}
                className="ml-2 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          {category !== 'all' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Kategoria: {categories.find(c => c.key === category)?.label}
              <button
                onClick={() => setCategory('all')}
                className="ml-2 hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )} */}
    </div>
  );
};

export default ProductSearch;
