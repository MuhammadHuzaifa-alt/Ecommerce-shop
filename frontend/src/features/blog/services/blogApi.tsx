import axios from "axios";

// ==========================================
// API
// ==========================================

const API_URL = "/api";

// ==========================================
// BLOG CATEGORY
// ==========================================

export interface BlogCategoryAPI {
    id: number;
    name: string;
    count?: number;
}

// ==========================================
// BLOG TAG
// ==========================================

export interface BlogTagAPI {
    id: number;
    name: string;
}

// ==========================================
// BLOG
// ==========================================

export interface BlogAPI {
    id: number;

    title: string;

    description: string;

    content: string;

    image: string | null;

    category: BlogCategoryAPI | null;

    author: string;

    date: string;

    tags?: BlogTagAPI[];

    views?: number;

    readTime?: number;
}

// ==========================================
// GET ALL BLOGS
// ==========================================

export const getBlogs = async (): Promise<BlogAPI[]> => {
    const response = await axios.get<BlogAPI[]>(
        `${API_URL}/blogs/`
    );

    return response.data;
};

// ==========================================
// GET SINGLE BLOG
// ==========================================

export const getBlog = async (
    id: number
): Promise<BlogAPI> => {
    const response = await axios.get<BlogAPI>(
        `${API_URL}/blogs/${id}/`
    );

    return response.data;
};

// ==========================================
// GET BLOG CATEGORIES
// ==========================================

export const getBlogCategories =
    async (): Promise<BlogCategoryAPI[]> => {
        const response =
            await axios.get<BlogCategoryAPI[]>(
                `${API_URL}/blog-categories/`
            );

        return response.data;
    };

// ==========================================
// GET BLOGS BY CATEGORY
// ==========================================

export const getBlogsByCategory = async (
    category: string
): Promise<BlogAPI[]> => {
    const response = await axios.get<BlogAPI[]>(
        `${API_URL}/blogs/category/${encodeURIComponent(
            category
        )}/`
    );

    return response.data;
};
