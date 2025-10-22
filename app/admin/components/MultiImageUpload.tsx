"use client";
import React, { useState } from 'react';
import Image from 'next/image';

export interface ImageItem {
  url: string;
  id: string;
  isPrimary?: boolean;
}

export interface MultiImageUploadProps {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
  maxImages?: number;
}

export default function MultiImageUpload({ 
  images, 
  onChange, 
  maxImages = 10 
}: MultiImageUploadProps): React.ReactElement {
  const [uploading, setUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleImageUpload = async (files: FileList | null): Promise<void> => {
    if (!files || files.length === 0) return;

    const remainingSlots = maxImages - images.length;
    if (remainingSlots <= 0) {
      alert(`Możesz dodać maksymalnie ${maxImages} zdjęć`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remainingSlots);
    
    for (const file of filesToUpload) {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Plik ${file.name} jest za duży. Maksymalny rozmiar to 5MB.`);
        continue;
      }

      setUploading(true);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const newImage: ImageItem = {
            id: `img-${Date.now()}-${Math.random()}`,
            url: data.url,
            isPrimary: images.length === 0 // Pierwsze zdjęcie jako główne
          };
          onChange([...images, newImage]);
        } else {
          alert(`Błąd uploadu ${file.name}: ${data.error}`);
        }
      } catch (error) {
        console.error('Błąd uploadu:', error);
        alert(`Wystąpił błąd podczas przesyłania ${file.name}`);
      }
    }

    setUploading(false);
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleImageUpload(event.target.files);
  };

  const handleDrag = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string): void => {
    const updatedImages = images.filter(img => img.id !== id);
    
    // Jeśli usunięto główne zdjęcie, ustaw nowe główne
    if (images.find(img => img.id === id)?.isPrimary && updatedImages.length > 0) {
      updatedImages[0].isPrimary = true;
    }
    
    onChange(updatedImages);
  };

  const setPrimaryImage = (id: string): void => {
    const updatedImages = images.map(img => ({
      ...img,
      isPrimary: img.id === id
    }));
    onChange(updatedImages);
  };

  const moveImage = (fromIndex: number, toIndex: number): void => {
    const updatedImages = [...images];
    const [movedItem] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, movedItem);
    onChange(updatedImages);
  };

  const handleUrlAdd = (): void => {
    const url = prompt('Wklej URL obrazka:');
    if (url && url.trim()) {
      const newImage: ImageItem = {
        id: `img-${Date.now()}-${Math.random()}`,
        url: url.trim(),
        isPrimary: images.length === 0
      };
      onChange([...images, newImage]);
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="multi-image-upload"
          accept="image/*"
          multiple
          onChange={handleFileInput}
          className="hidden"
          disabled={uploading || images.length >= maxImages}
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg className="h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              {uploading ? 'Przesyłanie...' : 'Przeciągnij i upuść zdjęcia tutaj'}
            </p>
            <p className="text-xs text-gray-500">lub</p>
          </div>
          
          <div className="flex gap-2 justify-center flex-wrap">
            <label
              htmlFor="multi-image-upload"
              className={`cursor-pointer px-4 py-2 rounded-lg transition duration-200 text-sm font-medium ${
                uploading || images.length >= maxImages
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {uploading ? 'Przesyłanie...' : 'Wybierz pliki'}
            </label>
            
            <button
              type="button"
              onClick={handleUrlAdd}
              disabled={uploading || images.length >= maxImages}
              className={`px-4 py-2 rounded-lg transition duration-200 text-sm font-medium ${
                uploading || images.length >= maxImages
                  ? 'bg-gray-400 cursor-not-allowed text-white' 
                  : 'bg-gray-600 hover:bg-gray-700 text-white'
              }`}
            >
              Wklej URL
            </button>
          </div>
          
          <p className="text-xs text-gray-500">
            JPG, PNG, WebP (max 5MB każdy) • {images.length}/{maxImages} zdjęć
          </p>
        </div>
      </div>

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative group bg-white border-2 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              style={{
                borderColor: image.isPrimary ? '#3B82F6' : '#E5E7EB'
              }}
            >
              {/* Primary Badge */}
              {image.isPrimary && (
                <div className="absolute top-2 left-2 z-10">
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-bold bg-blue-600 text-white shadow-sm">
                    <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Główne
                  </span>
                </div>
              )}

              {/* Image */}
              <div className="aspect-square relative bg-gray-100">
                <Image
                  src={image.url}
                  alt={`Zdjęcie ${index + 1}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Controls Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  {/* Set as Primary */}
                  {!image.isPrimary && (
                    <button
                      type="button"
                      onClick={() => setPrimaryImage(image.id)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg"
                      title="Ustaw jako główne"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  )}

                  {/* Move Left */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-lg"
                      title="Przesuń w lewo"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                  )}

                  {/* Move Right */}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-2 bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-colors shadow-lg"
                      title="Przesuń w prawo"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors shadow-lg"
                    title="Usuń"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image Number */}
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-md font-medium">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Text */}
      {images.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Wskazówki:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Pierwsze zdjęcie jest automatycznie ustawiane jako główne</li>
                <li>Kliknij gwiazdkę aby ustawić inne zdjęcie jako główne</li>
                <li>Użyj strzałek aby zmienić kolejność zdjęć</li>
                <li>Główne zdjęcie jest wyświetlane na liście produktów</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}