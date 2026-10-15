import axios from "axios";

const BLOG_CATEGORY_API_URL = "/api/admin/blog-categories/";

export interface BlogCategory {
    id: number;
    name: string;
}

export const getBlogCategories =
    async (): Promise<BlogCategory[]> => {

        const response = await axios.get(
            BLOG_CATEGORY_API_URL
        );

        return response.data;
    };


export const createBlogCategory =
    async (
        name: string
    ): Promise<BlogCategory> => {

        const response = await axios.post(
            BLOG_CATEGORY_API_URL,
            { name }
        );

        return response.data;
    };


export const updateBlogCategory =
    async (
        id: number,
        name: string
    ): Promise<BlogCategory> => {

        const response = await axios.put(
            `${BLOG_CATEGORY_API_URL}${id}/`,
            { name }
        );

        return response.data;
    };


export const deleteBlogCategory =
    async (
        id: number
    ): Promise<void> => {

        await axios.delete(
            `${BLOG_CATEGORY_API_URL}${id}/`
        );
    };