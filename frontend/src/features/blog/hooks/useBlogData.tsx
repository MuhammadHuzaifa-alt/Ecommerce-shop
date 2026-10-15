import {
    useEffect,
    useState,
} from "react";

import {
    getBlogs,
    getBlogCategories,
} from "../services/blogApi";

import type {
    Blog,
    BlogCategory,
} from "../types/blog.types";

import {
    mapBlogsFromAPI,
    mapBlogCategoriesFromAPI,
} from "../utils/blogMapper";

interface UseBlogDataResult {
    blogs: Blog[];

    categories: BlogCategory[];

    loading: boolean;

    error: string | null;
}

export const useBlogData =
    (): UseBlogDataResult => {
        const [blogs, setBlogs] =
            useState<Blog[]>([]);

        const [categories, setCategories] =
            useState<BlogCategory[]>([]);

        const [loading, setLoading] =
            useState(true);

        const [error, setError] =
            useState<string | null>(null);

        useEffect(() => {
            let cancelled = false;

            const loadData = async () => {
                try {
                    setLoading(true);

                    setError(null);

                    const [
                        blogsData,
                        categoriesData,
                    ] = await Promise.all([
                        getBlogs(),
                        getBlogCategories(),
                    ]);

                    if (cancelled) {
                        return;
                    }

                    setBlogs(
                        mapBlogsFromAPI(
                            blogsData
                        )
                    );

                    setCategories(
                        mapBlogCategoriesFromAPI(
                            categoriesData
                        )
                    );
                } catch (error) {
                    if (cancelled) {
                        return;
                    }

                    console.error(
                        "Failed to load blog data:",
                        error
                    );

                    setError(
                        "Unable to load blogs. Please try again later."
                    );
                } finally {
                    if (!cancelled) {
                        setLoading(false);
                    }
                }
            };

            loadData();

            return () => {
                cancelled = true;
            };
        }, []);

        return {
            blogs,
            categories,
            loading,
            error,
        };
    };