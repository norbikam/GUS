"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface ImageItem {
  id: string;
  url: string;
  isPrimary?: boolean;
}

interface ProductGalleryProps {
  mainImage: string;
  additionalImages?: ImageItem[] | null;
  productTitle: string;
}

export default function ProductGallery({ 
  mainImage, 
  additionalImages, 
  productTitle 
}: ProductGalleryProps) {
  // Połącz główne zdjęcie + pozostałe w jedną tablicę
  const allImages: string[] = [
    mainImage,
    ...(additionalImages?.map(img => img.url) || [])
  ].filter(Boolean); // Usuń null/undefined

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Jeśli tylko jedno zdjęcie, pokaż proste wyświetlanie
  if (allImages.length === 1) {
    return (
      <div className="relative flex w-full rounded-lg overflow-hidden items-center justify-center bg-black/20">
        <Image
          src={allImages[0]}
          alt={productTitle}
          height={500}
          width={500}
          className="object-contain w-full h-auto max-h-[500px] p-4"
          priority
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Główne zdjęcie */}
      <div 
        className="relative w-full rounded-lg overflow-hidden bg-black/20 cursor-zoom-in group"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <div className="relative aspect-square md:aspect-[4/3] flex items-center justify-center">
          <Image
            src={allImages[selectedImageIndex]}
            alt={`${productTitle} - zdjęcie ${selectedImageIndex + 1}`}
            fill
            className={`object-contain p-4 transition-transform duration-300 ${
              isZoomed ? 'scale-110' : 'scale-100'
            }`}
            priority={selectedImageIndex === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent" />
        </div>

        {/* Licznik zdjęć */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
          {selectedImageIndex + 1} / {allImages.length}
        </div>

        {/* Strzałki nawigacji (tylko na hover na desktop) */}
        {allImages.length > 1 && (
          <>
            {/* Poprzednie */}
            {selectedImageIndex > 0 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Poprzednie zdjęcie"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Następne */}
            {selectedImageIndex < allImages.length - 1 && (
              <button
                onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                aria-label="Następne zdjęcie"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* Miniaturki (jak na Allegro) */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {allImages.map((imageUrl, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                selectedImageIndex === index
                  ? 'border-yellow-500 shadow-lg shadow-yellow-500/50'
                  : 'border-white/20 hover:border-white/50'
              }`}
              aria-label={`Pokaż zdjęcie ${index + 1}`}
            >
              <Image
                src={imageUrl}
                alt={`${productTitle} miniaturka ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
              {/* Overlay dla aktywnej miniaturki */}
              {selectedImageIndex !== index && (
                <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Wskazówka zoom (tylko desktop) */}
      {isZoomed && (
        <p className="hidden md:block text-center text-sm text-gray-400">
          🔍 Najedź myszką aby powiększyć
        </p>
      )}
    </div>
  );
}