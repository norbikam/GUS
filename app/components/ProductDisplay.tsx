"use client";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductsDisplayProps } from '../types/product';

export const ProductsDisplay: React.FC<ProductsDisplayProps> = ({ products = [], amount }) => {
  // Jeśli amount jest podane, ogranicz liczbę produktów
  const displayProducts: Product[] = amount ? products.slice(0, amount) : products;

  if (!displayProducts || displayProducts.length === 0) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 text-xl">Brak produktów do wyświetlenia</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-10">
      {displayProducts.map((product: Product) => (
        <Link key={product.id || product.slug} href={`/katalog/${product.slug}`}>
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 flex flex-col h-full">
            <div className="relative h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {product.featured && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 text-xs rounded">
                  Polecane
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h2 className="text-lg font-bold mb-2 line-clamp-2">{product.title}</h2>
                {product.category && (
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                )}
              </div>
              {/* <p className="text-xl font-semibold text-blue-600 border-t pt-2">{product.price}</p> */}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
