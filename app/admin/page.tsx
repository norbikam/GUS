"use client";
import React, { useState, useEffect } from 'react';
import { Product } from '@/app/types/product';
import Image from 'next/image';
import RichEditor from '../components/RichEditor';

export default function AdminPage(): React.ReactElement {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // ✅ Zmieniona nazwa z formData na productData
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: '',
    tags: '',
    featured: false
  });

  // ✅ Dodane nowe state dla upload obrazków
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  // Sprawdź czy użytkownik jest już zalogowany (localStorage)
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_authenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Pobierz produkty gdy użytkownik jest zalogowany
  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoginError(''); // Wyczyść poprzednie błędy
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ password })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_authenticated', 'true');
        setPassword('');
        setLoginError('');
      } else {
        setLoginError(data.error || 'Nieprawidłowe hasło');
        setPassword('');
      }
    } catch (error) {
      console.error('Błąd podczas logowania:', error);
      setLoginError('Błąd połączenia z serwerem');
      setPassword('');
    }
  };

  const handleLogout = (): void => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  // Jeśli nie zalogowany, pokaż formularz logowania
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Panel Administracyjny</h1>
            <p className="text-gray-600 mt-2">Wprowadź hasło aby kontynuować</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hasło
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                placeholder="Wprowadź hasło"
                required
              />
            </div>
            
            {loginError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
            >
              Zaloguj się
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-500">
                🔒 Panel administracyjny jest chroniony hasłem
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Reszta kodu admina
  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Błąd podczas pobierania produktów:', error);
    }
  };

  // ✅ Poprawiona funkcja handleImageUpload
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const uploadFormData = new FormData(); // ✅ Zmieniona nazwa
      uploadFormData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData, // ✅ Używamy nowej nazwy
      });

      const data = await response.json();

      if (data.success) {
        setProductData({...productData, image: data.url}); // ✅ Zmieniona nazwa
        setImagePreview(data.url);
        alert('Obrazek przesłany pomyślnie!');
      } else {
        alert(`Błąd: ${data.error}`);
      }
    } catch (error) {
      console.error('Błąd uploadu:', error);
      alert('Wystąpił błąd podczas przesyłania obrazka');
    } finally {
      setUploadingImage(false);
    }
  };

  // ✅ Poprawiona funkcja handleSubmit
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData) // ✅ Zmieniona nazwa
      });

      if (response.ok) {
        await fetchProducts();
        closeModal();
        alert(editingProduct ? 'Produkt zaktualizowany!' : 'Produkt dodany!');
      } else {
        const error = await response.json();
        alert(`Błąd: ${error.error}`);
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
      alert('Wystąpił błąd podczas zapisywania');
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string): Promise<void> => {
    if (confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      try {
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
      }
    }
  };

  // ✅ Poprawiona funkcja openModal
  const openModal = (product?: Product): void => {
    if (product) {
      setEditingProduct(product);
      setProductData({ // ✅ Zmieniona nazwa
        title: product.title,
        description: product.description || '',
        price: product.price,
        category: product.category || '',
        image: product.image,
        tags: product.tags || '',
        featured: product.featured
      });
      setImagePreview(product.image);
    } else {
      setEditingProduct(null);
      setProductData({ // ✅ Zmieniona nazwa
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
        tags: '',
        featured: false
      });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Główny interfejs admin (zalogowany użytkownik)
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header z przyciskiem wylogowania */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel Administracyjny</h1>
              <p className="text-gray-600">Zarządzaj produktami w swoim sklepie</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => openModal()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                + Dodaj Produkt
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Wszystkie produkty</h3>
            <p className="text-3xl font-bold text-blue-600">{products.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Produkty polecane</h3>
            <p className="text-3xl font-bold text-green-600">{products.filter(p => p.featured).length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900">Kategorie</h3>
            <p className="text-3xl font-bold text-purple-600">
              {new Set(products.map(p => p.category).filter(Boolean)).size}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Lista Produktów</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produkt
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kategoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cena
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-cover rounded-lg mr-4"
                          unoptimized // Dodaj jeśli obrazki są zewnętrzne
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {product.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {product.id.slice(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category || 'Brak'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        {product.featured && (
                          <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Polecane
                          </span>
                        )}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {product.active ? 'Aktywny' : 'Nieaktywny'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openModal(product)}
                          className="text-blue-600 hover:text-blue-900 transition duration-200"
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900 transition duration-200"
                        >
                          Usuń
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Poprawiony Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingProduct ? 'Edytuj Produkt' : 'Dodaj Nowy Produkt'}
              </h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nazwa produktu *
                </label>
                <input
                  type="text"
                  value={productData.title}
                  onChange={(e) => setProductData({...productData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Opis
                </label>
                  <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opis produktu
                  </label>
                  <RichEditor
                    value={productData.description}
                    onChange={(value) => setProductData({...productData, description: value})}
                    placeholder="Wprowadź szczegółowy opis produktu. Możesz wkleić sformatowany tekst lub użyć przycisków formatowania."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cena *
                  </label>
                  <input
                    type="text"
                    value={productData.price}
                    onChange={(e) => setProductData({...productData, price: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    placeholder="np. 9 900 zł"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kategoria
                  </label>
                  <select
                    value={productData.category}
                    onChange={(e) => setProductData({...productData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  >
                    <option value="">Wybierz kategorię</option>
                    <option value="Lasery">Lasery</option>
                    <option value="HIFU">HIFU</option>
                    <option value="Plazma">Plazma</option>
                    <option value="Radiofrekwencja">Radiofrekwencja</option>
                  </select>
                </div>
              </div>

              {/* ✅ Nowa sekcja upload obrazków */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Obrazek produktu
                </label>
                
                {/* Upload button */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <label className={`cursor-pointer px-4 py-2 rounded-lg transition duration-200 text-sm ${
                      uploadingImage 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white`}>
                      {uploadingImage ? 'Przesyłanie...' : 'Wybierz plik'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                    <span className="text-sm text-gray-500">
                      JPG, PNG, WebP (max 5MB)
                    </span>
                  </div>

                  {/* Podgląd obrazka */}
                  {imagePreview && (
                    <div className="relative inline-block">
                      <Image
                        src={imagePreview}
                        alt="Podgląd"
                        width={128}
                        height={128}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                        unoptimized // Dodaj jeśli obrazki mogą być zewnętrzne
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setProductData({...productData, image: ''});
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}

                  {/* Alternatywnie - URL input */}
                  <div className="border-t pt-3">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Lub wklej URL obrazka
                    </label>
                    <input
                      type="text"
                      value={productData.image}
                      onChange={(e) => {
                        setProductData({...productData, image: e.target.value});
                        setImagePreview(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                      placeholder="/products/nazwa-produktu.webp"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tagi (oddzielone przecinkami)
                </label>
                <input
                  type="text"
                  value={productData.tags}
                  onChange={(e) => setProductData({...productData, tags: e.target.value})} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                  placeholder="laser,odmładzanie,skóra"
                />
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={productData.featured}
                    onChange={(e) => setProductData({...productData, featured: e.target.checked})}
                    className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Produkt polecany</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition duration-200"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200 disabled:opacity-50"
                >
                  {loading ? 'Zapisywanie...' : (editingProduct ? 'Zapisz zmiany' : 'Dodaj produkt')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
