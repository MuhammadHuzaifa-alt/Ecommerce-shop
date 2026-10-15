export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  brand: string;
  image: string | null;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  discount: number;
}

export interface ProductFormData {
  name: string;
  category: string;
  brand: string;
  image: File | null;
  price: string;
  oldPrice: string;
  rating: string;
  reviews: string;
  stock: string;
  discount: string;
}