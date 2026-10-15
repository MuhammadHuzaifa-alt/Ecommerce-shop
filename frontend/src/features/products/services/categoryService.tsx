import axios from "axios";

const CATEGORY_API_URL =
  "/api/categorie/";

export interface Category {
  id: number;
  name: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axios.get<Category[]>(
    CATEGORY_API_URL
  );

  console.log(
    "PRODUCT CATEGORIES:",
    response.data
  );

  return response.data;
};
