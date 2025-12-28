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
  pdfUrl?: string | null; // ✅ NOWE POLE
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

export function getPrimaryImage(product: Product): string {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    const primary = product.images.find(img => img.isPrimary);
    return primary ? primary.url : product.images[0].url;
  }
  return product.image || '/placeholder-product.jpg';
}

export function getAllImages(product: Product): ImageItem[] {
  if (product.images && Array.isArray(product.images) && product.images.length > 0) {
    return product.images;
  }
  if (product.image) {
    return [{
      id: 'legacy-image',
      url: product.image,
      isPrimary: true
    }];
  }
  return [];
}
