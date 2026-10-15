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

  price: number | string;

  oldPrice: number | string;

  rating: number;

  reviews: number;

  stock: number;

  discount: number;

  isNew?: boolean;

}