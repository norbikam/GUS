// types/product.ts
export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  image: string;
  category: string | null;
  tags: string;
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
