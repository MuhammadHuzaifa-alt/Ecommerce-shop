import axios from "axios";

import type {
  ProductCategory,
} from "../../../../features/Admin/types/product";


// ==========================================================
// API URL
// ==========================================================

const CATEGORY_API_URL = "/api/admin/categories/";


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
// GET CATEGORIES
// ==========================================================

export const getCategories = async (): Promise<
  ProductCategory[]
> => {

  const response = await axios.get<ProductCategory[]>(
    CATEGORY_API_URL,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// GET SINGLE CATEGORY
// ==========================================================

export const getCategory = async (
  id: number
): Promise<ProductCategory> => {

  const response = await axios.get<ProductCategory>(
    `${CATEGORY_API_URL}${id}/`,
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// CREATE CATEGORY
// ==========================================================

export const createCategory = async (
  name: string
): Promise<ProductCategory> => {

  const response = await axios.post<ProductCategory>(
    CATEGORY_API_URL,
    {
      name,
    },
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// UPDATE CATEGORY
// ==========================================================

export const updateCategory = async (
  id: number,
  name: string
): Promise<ProductCategory> => {

  const response = await axios.put<ProductCategory>(
    `${CATEGORY_API_URL}${id}/`,
    {
      name,
    },
    getAdminAuthConfig()
  );

  return response.data;
};


// ==========================================================
// DELETE CATEGORY
// ==========================================================

export const deleteCategory = async (
  id: number
): Promise<void> => {

  await axios.delete(
    `${CATEGORY_API_URL}${id}/`,
    getAdminAuthConfig()
  );

};