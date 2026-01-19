"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Product } from '@/app/types/product';
import { parseImages } from './prisma-helpers'; // Upewnij się, że ścieżka importu jest poprawna względem lokalizacji pliku
import type { ImageItem } from './MultiImageUpload';
import type { EditorContentChanged } from './MarkdownEditor';

// Dynamiczne importy (skopiowane z oryginału)
const PdfUpload = dynamic(() => import('../../components/PdfUpload'), { 
  ssr: false, 
  loading: () => <div className="h-[100px] bg-gray-100 animate-pulse rounded-lg"></div> 
});
const MarkdownEditor = dynamic(() => import('./MarkdownEditor'), { ssr: false, loading: () => <div className="h-[400px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-500">Ładowanie edytora...</span></div> });
const MarkdownViewer = dynamic(() => import('./MarkdownViewer'), { ssr: false, loading: () => <div className="animate-pulse bg-gray-100 rounded p-4"><span className="text-gray-500">Ładowanie podglądu...</span></div> });
const MultiImageUpload = dynamic(() => import('./MultiImageUpload'), { ssr: false, loading: () => <div className="h-[200px] bg-gray-100 animate-pulse rounded-lg flex items-center justify-center"><span className="text-gray-500">Ładowanie galerii...</span></div> });
const CategoryModal = dynamic(() => import('@/app/components/CategoryModal'), { ssr: false });

type Category = {
  key: string;
  label: string;
};

interface ProductFormProps {
  initialData?: Product | null; // Jeśli null, to tryb dodawania
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  // Kategorie
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Stan formularza
  const [productData, setProductData] = useState({
    title: '', description: '', price: '', category: '', image: '', images: [] as ImageItem[], tags: '', youtubeUrl: '', pdfUrl: '', featured: false, active: true
  });

  useEffect(() => {
    fetchCategories();
    
    // Inicjalizacja danych jeśli edytujemy
    if (initialData) {
      const allImages: ImageItem[] = [];
      if (initialData.image && typeof initialData.image === 'string') {
        allImages.push({ id: 'primary-image', url: initialData.image, isPrimary: true });
      }
      if (initialData.images) {
        const additionalImages = parseImages(initialData.images);
        if (additionalImages && additionalImages.length > 0) {
          additionalImages.forEach(img => allImages.push({ id: img.id, url: img.url, isPrimary: false }));
        }
      }

      setProductData({
        title: initialData.title,
        description: initialData.description || '',
        price: initialData.price,
        category: initialData.category || '',
        image: initialData.image || '',
        images: allImages,
        tags: initialData.tags || '',
        youtubeUrl: initialData.youtubeUrl || '',
        pdfUrl: initialData.pdfUrl || '',
        featured: initialData.featured,
        active: initialData.active ?? true
      });
    }
  }, [initialData]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        setAvailableCategories(data.filter((cat: Category) => cat.key !== 'all'));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryCreated = (newCategory: { key: string; label: string }) => {
    setAvailableCategories(prev => [...prev, newCategory]);
    setProductData(prev => ({ ...prev, category: newCategory.key }));
  };

  const handleDescriptionChange = (changes: EditorContentChanged) => { setProductData({ ...productData, description: changes.markdown }); };
  const handleImagesChange = (images: ImageItem[]) => { setProductData({ ...productData, images: images, image: images.find(img => img.isPrimary)?.url || images[0]?.url || '' }); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productData.title || !productData.price) { alert('Wypełnij wszystkie wymagane pola'); return; }
    
    setLoading(true);
    try {
      const method = initialData ? 'PUT' : 'POST';
      const url = initialData ? `/api/products/${initialData.id}` : '/api/products';
      
      const response = await fetch(url, { 
        method, 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify(productData) 
      });

      if (response.ok) { 
        alert(initialData ? 'Produkt zaktualizowany!' : 'Produkt dodany!');
        router.push('/admin'); // Powrót do listy po zapisie
        router.refresh(); // Odświeżenie danych na liście
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* LEWA KOLUMNA */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nazwa produktu *</label>
              <input type="text" value={productData.title} onChange={(e) => setProductData({...productData, title: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cena *</label>
                <input type="text" value={productData.price} onChange={(e) => setProductData({...productData, price: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Kategoria</label>
                  <button type="button" onClick={() => setIsCategoryModalOpen(true)} className="text-sm text-blue-600 hover:text-blue-800 font-medium">+ Nowa</button>
                </div>
                <select value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Wybierz kategorię</option>
                  {availableCategories.map(cat => <option key={cat.key} value={cat.key}>{cat.label}</option>)}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Galeria zdjęć</label>
              <MultiImageUpload images={productData.images} onChange={handleImagesChange} maxImages={10} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagi</label>
              <input type="text" value={productData.tags} onChange={(e) => setProductData({...productData, tags: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="laser, odmładzanie..." />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link do YouTube</label>
              <input type="url" value={productData.youtubeUrl} onChange={(e) => setProductData({...productData, youtubeUrl: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
            </div>

            <div><PdfUpload pdfUrl={productData.pdfUrl} onChange={(url) => setProductData({...productData, pdfUrl: url})} /></div>
            
            <div className="space-y-4">
              <label className="flex items-center"><input type="checkbox" checked={productData.featured} onChange={(e) => setProductData({...productData, featured: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-3 text-sm font-medium text-gray-700">⭐ Polecany</span></label>
              <label className="flex items-center"><input type="checkbox" checked={productData.active} onChange={(e) => setProductData({...productData, active: e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded" /><span className="ml-3 text-sm font-medium text-gray-700">✅ Aktywny</span></label>
            </div>
          </div>
          
          {/* PRAWA KOLUMNA */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Opis produktu</label>
                {productData.description && (
                  <button type="button" onClick={() => setShowPreview(!showPreview)} className="text-sm text-blue-600 font-medium">
                    {showPreview ? '✏️ Edytuj' : '👁️ Podgląd'}
                  </button>
                )}
              </div>
              {!showPreview ? (
                <MarkdownEditor value={productData.description} onChange={handleDescriptionChange} placeholder="Opis produktu..." />
              ) : (
                <div className="border border-gray-200 rounded-lg p-6 bg-gray-50 min-h-[400px] max-h-[400px] overflow-y-auto">
                  <MarkdownViewer value={productData.description} />
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* BUTTONS */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 mt-8">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium">Anuluj</button>
          <button type="submit" disabled={loading} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center">
            {loading ? 'Zapisywanie...' : (initialData ? 'Zapisz zmiany' : 'Dodaj produkt')}
          </button>
        </div>
      </form>
      
      {isCategoryModalOpen && (
        <CategoryModal isOpen={isCategoryModalOpen} onClose={() => setIsCategoryModalOpen(false)} onCategoryCreated={handleCategoryCreated} />
      )}
    </div>
  );
}