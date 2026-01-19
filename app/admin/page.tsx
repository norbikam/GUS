"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/app/types/product';
import { parseImages } from './components/prisma-helpers';

export default function AdminPage(): React.ReactElement {
  // --- STATE: Autoryzacja ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // --- STATE: Dane ---
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // --- EFFECT: Inicjalizacja ---
  useEffect(() => { 
    setIsMounted(true); 
    const savedAuth = localStorage.getItem('admin_authenticated'); 
    if (savedAuth === 'true') setIsAuthenticated(true); 
  }, []);

  useEffect(() => { 
    if (isAuthenticated) { 
      fetchProducts(); 
    } 
  }, [isAuthenticated]);

  // --- FUNKCJE: Logowanie ---
  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoginError('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await response.json();
      if (data.success) { setIsAuthenticated(true); localStorage.setItem('admin_authenticated', 'true'); setPassword(''); setLoginError(''); } 
      else { setLoginError(data.error || 'Nieprawidłowe hasło'); setPassword(''); }
    } catch (error) { console.error('Błąd podczas logowania:', error); setLoginError('Błąd połączenia z serwerem'); setPassword(''); }
  };

  const handleLogout = (): void => { setIsAuthenticated(false); localStorage.removeItem('admin_authenticated'); setPassword(''); };

  // --- FUNKCJE: Dane ---
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products?active=all');
      if (!response.ok) {
        console.error('Failed to fetch products:', response.status);
        setProducts([]);
        return;
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      try { 
        setLoading(true); 
        const response = await fetch(`/api/products/${id}`, { method: 'DELETE' }); 
        if (response.ok) { 
          await fetchProducts(); 
          alert('Produkt usunięty!'); 
        } else { 
          alert('Błąd podczas usuwania'); 
        } 
      } catch (error) { 
        console.error('Błąd podczas usuwania:', error); 
        alert('Wystąpił błąd podczas usuwania'); 
      } finally { 
        setLoading(false); 
      }
    }
  };

  const toggleProductActive = async (id: string, currentStatus: boolean): Promise<void> => {
    try { 
      // Nie włączamy pełnego loading, żeby nie migać całą tabelą
      const response = await fetch(`/api/products/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ active: !currentStatus }) 
      }); 
      if (response.ok) { 
        fetchProducts(); // Odśwież listę w tle
      } else { 
        alert('Błąd podczas zmiany statusu'); 
      } 
    } catch (error) { 
      console.error('Błąd podczas zmiany statusu:', error); 
      alert('Wystąpił błąd podczas zmiany statusu'); 
    }
  };

  // --- HELPER: Zdjęcia ---
  const getPrimaryImage = (product: Product): string => {
    if (product.image && typeof product.image === 'string') {
      return product.image;
    }
    const parsedImages = parseImages(product.images);
    if (parsedImages && parsedImages.length > 0) {
      const primary = parsedImages.find(img => img.isPrimary);
      return primary ? primary.url : parsedImages[0].url;
    }
    return '/placeholder-product.jpg';
  };

  // --- RENDER: Widok logowania ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Panel Administracyjny</h1>
            <p className="text-gray-600 mt-2">Wprowadź hasło aby kontynuować</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div><label className="block text-sm font-medium text-gray-700 mb-2">Hasło administratora</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700 transition-colors" placeholder="••••••••" required /></div>
            {loginError && (<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center"><svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>{loginError}</div>)}
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02]">Zaloguj się</button>
          </form>
        </div>
      </div>
    );
  }

  // Obliczenia statystyk
  const activeProducts = Array.isArray(products) ? products.filter(p => p.active !== false) : [];
  const featuredProducts = Array.isArray(products) ? products.filter(p => p.featured) : [];
  const categories = Array.isArray(products) ? new Set(products.map(p => p.category).filter(Boolean)) : new Set();

  // --- RENDER: Główny Panel ---
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    <svg className="h-8 w-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    Panel Administracyjny
                </h1>
                <p className="text-gray-600 mt-1">Zarządzaj produktami w swoim sklepie</p>
            </div>
            <div className="flex items-center gap-4">
              {/* LINK DO DODAWANIA NOWEGO PRODUKTU */}
              <Link 
                href="/admin/products/new" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-200 flex items-center shadow-sm"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                Dodaj Produkt
              </Link>
              <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-200 flex items-center shadow-sm">
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* STATYSTYKI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="flex items-center"><div className="p-2 bg-blue-100 rounded-lg"><svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Wszystkie produkty</p><p className="text-2xl font-bold text-gray-900">{products.length}</p></div></div></div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="flex items-center"><div className="p-2 bg-green-100 rounded-lg"><svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Aktywne produkty</p><p className="text-2xl font-bold text-gray-900">{activeProducts.length}</p></div></div></div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="flex items-center"><div className="p-2 bg-yellow-100 rounded-lg"><svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Produkty polecane</p><p className="text-2xl font-bold text-gray-900">{featuredProducts.length}</p></div></div></div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"><div className="flex items-center"><div className="p-2 bg-purple-100 rounded-lg"><svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg></div><div className="ml-4"><p className="text-sm font-medium text-gray-500">Kategorie</p><p className="text-2xl font-bold text-gray-900">{categories.size}</p></div></div></div>
        </div>

        {/* LISTA PRODUKTÓW */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50"><h2 className="text-xl font-semibold text-gray-900 flex items-center"><svg className="h-6 w-6 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>Lista Produktów</h2></div>
          {loading && products.length === 0 ? (
            <div className="p-8 text-center"><div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150"><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Ładowanie...</div></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produkt</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategoria</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cena</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akcje</th></tr></thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center"><div className="text-gray-400"><svg className="mx-auto h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg><h3 className="text-sm font-medium text-gray-900 mb-1">Brak produktów</h3><p className="text-sm text-gray-500">Dodaj pierwszy produkt aby rozpocząć</p></div></td></tr>
                  ) : (
                    products.map((product) => {
                      let totalImages = 0;
                      if (product.image) totalImages++;
                      const additionalImages = parseImages(product.images);
                      if (additionalImages && additionalImages.length > 0) {
                        totalImages += additionalImages.length;
                      }
                      
                      return (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 relative">
                                <Image src={getPrimaryImage(product)} alt={product.title} width={48} height={48} className="h-12 w-12 object-cover rounded-lg border border-gray-200" unoptimized />
                                {totalImages > 1 && (
                                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{totalImages}</div>
                                )}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 max-w-xs truncate" title={product.title}>{product.title}</div>
                                <div className="text-sm text-gray-500">ID: {product.id.slice(0, 8)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">{product.category || 'Brak kategorii'}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap"><div className="flex flex-col gap-1">{product.featured && (<span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800 w-fit">⭐ Polecane</span>)}<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full w-fit ${product.active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{product.active !== false ? '✅ Aktywny' : '❌ Nieaktywny'}</span></div></td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                                {/* LINK DO EDYCJI ZAMIAST MODALA */}
                                <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900 transition duration-200 font-medium flex items-center">
                                    ✏️ Edytuj
                                </Link>
                                <button onClick={() => toggleProductActive(product.id, product.active !== false)} className={`transition duration-200 font-medium ${product.active !== false ? 'text-orange-600 hover:text-orange-900' : 'text-green-600 hover:text-green-900'}`}>{product.active !== false ? '⏸️ Dezaktywuj' : '▶️ Aktywuj'}</button>
                                <button onClick={() => deleteProduct(product.id)} className="text-red-600 hover:text-red-900 transition duration-200 font-medium">🗑️ Usuń</button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}