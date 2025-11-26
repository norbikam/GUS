export interface ImageItem {
  url: string;
  id: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  image: string;
  images?: ImageItem[] | null;
  category: string | null;
  tags: string;
  youtubeUrl?: string | null;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSearchProps {
  onFilteredProducts: (products: Product[]) => void;
}

export interface ProductsDisplayProps {
  products: Product[];
  amount?: number;
}

export interface Category {
  key: string;
  label: string;
}

// Helper function do pobierania głównego zdjęcia
export function getPrimaryImage(product: Product): string {
  // Sprawdź czy images istnieje i jest tablicą
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const primary = product.images.find(img => img.isPrimary);
    return primary ? primary.url : product.images[0].url;
  }
  return product.image || '/placeholder-product.jpg';
}

// Helper function do pobierania wszystkich zdjęć jako tablica
export function getAllImages(product: Product): ImageItem[] {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }
  // Fallback do starego formatu z pojedynczym obrazkiem
  if (product.image) {
    return [{
      id: 'legacy-image',
      url: product.image,
      isPrimary: true
    }];
  }
  return [];
}