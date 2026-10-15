import axios from "axios";


// ==========================================
// API URL
// ==========================================

const API_URL =
  "/api/products/";


// ==========================================
// API CATEGORY
// ==========================================

export interface ApiProductCategory {
  id: number;
  name: string;
}


// ==========================================
// API PRODUCT
// ==========================================

export interface ApiProduct {
  id: number;

  name: string;

  category: ApiProductCategory;

  brand: string;

  image: string | null;

  price: string | number;

  oldPrice: string | number;

  rating: string | number;

  reviews: string | number;

  stock: string | number;

  discount: string | number;
}


// ==========================================
// GET PRODUCTS
// ==========================================

export const getProducts = async (): Promise<
  ApiProduct[]
> => {

  const response = await axios.get<ApiProduct[]>(
    API_URL
  );

  return response.data;
};
