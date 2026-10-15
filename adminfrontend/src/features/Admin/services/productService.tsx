import axios from "axios";

import type {
  Product,
  ProductCategory,
  ProductFormData,
} from "../../../features/Admin/types/product";


// ==========================================================
// API URLS
// ==========================================================

const API_URL =
  "/api/admin/products/";

const CATEGORY_API_URL =
  "/api/admin/categories/";


// ==========================================================
// ADMIN AUTH CONFIG
// ==========================================================

const getAdminAuthConfig = () => {

  const token =
    localStorage.getItem("adminAccess") ||
    sessionStorage.getItem("adminAccess");

  if (!token) {
    throw new Error(
      "Admin authentication token is missing."
    );
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};


// ==========================================================
// GET PRODUCTS
// ==========================================================

export const getProducts = async (): Promise<Product[]> => {

  const response = await axios.get<Product[]>(
    API_URL,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// GET SINGLE PRODUCT
// ==========================================================

export const getProduct = async (
  id: number
): Promise<Product> => {

  const response = await axios.get<Product>(
    `${API_URL}${id}/`,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// CREATE PRODUCT
// ==========================================================

export const createProduct = async (
  product: ProductFormData
): Promise<Product> => {

  const formData = new FormData();

  formData.append(
    "name",
    product.name
  );

  formData.append(
    "category_id",
    product.category
  );

  formData.append(
    "brand",
    product.brand
  );

  formData.append(
    "price",
    product.price
  );

  formData.append(
    "oldPrice",
    product.oldPrice || "0"
  );

  formData.append(
    "rating",
    product.rating || "0"
  );

  formData.append(
    "reviews",
    product.reviews || "0"
  );

  formData.append(
    "stock",
    product.stock
  );

  formData.append(
    "discount",
    product.discount || "0"
  );


  // ========================================================
  // IMAGE
  // ========================================================

  if (product.image) {

    formData.append(
      "image",
      product.image
    );

  }


  // ========================================================
  // REQUEST
  // ========================================================

  const response = await axios.post<Product>(
    API_URL,
    formData,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// UPDATE PRODUCT
// ==========================================================

export const updateProduct = async (
  id: number,
  product: ProductFormData
): Promise<Product> => {

  const formData = new FormData();

  formData.append(
    "name",
    product.name
  );

  formData.append(
    "category_id",
    product.category
  );

  formData.append(
    "brand",
    product.brand
  );

  formData.append(
    "price",
    product.price
  );

  formData.append(
    "oldPrice",
    product.oldPrice || "0"
  );

  formData.append(
    "rating",
    product.rating || "0"
  );

  formData.append(
    "reviews",
    product.reviews || "0"
  );

  formData.append(
    "stock",
    product.stock
  );

  formData.append(
    "discount",
    product.discount || "0"
  );


  // ========================================================
  // IMAGE
  // ========================================================

  if (product.image) {

    formData.append(
      "image",
      product.image
    );

  }


  // ========================================================
  // REQUEST
  // ========================================================

  const response = await axios.put<Product>(
    `${API_URL}${id}/`,
    formData,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// DELETE PRODUCT
// ==========================================================

export const deleteProduct = async (
  id: number
): Promise<void> => {

  await axios.delete(
    `${API_URL}${id}/`,
    getAdminAuthConfig()
  );

};


// ==========================================================
// GET CATEGORIES
// ==========================================================

export const getCategories =
  async (): Promise<ProductCategory[]> => {

    const response = await axios.get<ProductCategory[]>(
      CATEGORY_API_URL,
      getAdminAuthConfig()
    );

    return response.data;
  };