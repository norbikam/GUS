"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductForm from '../../components/ProductForm';
import { Product } from '@/app/types/product';
import AdminGuard from '../../components/AdminGuard'; // Import Guarda

export default function EditProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${params.id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          alert('Nie znaleziono produktu');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
             <div className="flex justify-center py-10">Ładowanie danych...</div>
          ) : !product ? (
             <div className="flex justify-center py-10">Produkt nie istnieje.</div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edycja Produktu</h1>
                <p className="text-gray-600 mt-1">Edytujesz: {product.title}</p>
              </div>
              <ProductForm initialData={product} />
            </>
          )}
        </div>
      </div>
    </AdminGuard>
  );
}