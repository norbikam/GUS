"use client";
import React from 'react';
import ProductForm from '../../components/ProductForm';
import AdminGuard from '../../components/AdminGuard'; // Import Guarda

export default function NewProductPage() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12 text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dodaj Nowy Produkt</h1>
            <p className="text-gray-600 mt-1">Uzupełnij formularz, aby dodać produkt do sklepu.</p>
          </div>
          <ProductForm />
        </div>
      </div>
    </AdminGuard>
  );
}