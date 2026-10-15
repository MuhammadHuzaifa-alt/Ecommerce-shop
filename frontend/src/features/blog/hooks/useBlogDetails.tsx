import {
    useEffect,
    useState,
} from "react";

import {
    getBlog,
    getBlogs,
} from "../services/blogApi";

import type { Blog } from "../types/blog.types";

import {
    mapBlogFromAPI,
    mapBlogsFromAPI,
} from "../utils/blogMapper";

// ==========================================
// RESULT TYPE
// ==========================================

interface UseBlogDetailsResult {
    blog: Blog | null;

    relatedBlogs: Blog[];

    loading: boolean;

    error: string;
}

// ==========================================
// PARSE BLOG ID
// ==========================================

const parseBlogId = (
    id?: string
): number | null => {
    if (!id) {
        return null;
    }

    const blogId = Number(id);

    if (
        !Number.isInteger(blogId) ||
        blogId <= 0
    ) {
        return null;
    }

    return blogId;
};

// ==========================================
// HOOK
// ==========================================

const useBlogDetails = (
    id?: string
): UseBlogDetailsResult => {
    const blogId = parseBlogId(id);

    const [blog, setBlog] =
        useState<Blog | null>(null);

    const [relatedBlogs, setRelatedBlogs] =
        useState<Blog[]>([]);

    const [loading, setLoading] =
        useState(Boolean(blogId));

    const [error, setError] =
        useState("");

    // ==========================================
    // LOAD BLOG
    // ==========================================

    useEffect(() => {
        if (!blogId) {
            return;
        }

        let cancelled = false;

        const loadBlog = async () => {
            try {
                setLoading(true);

                setError("");

                // ----------------------------------
                // GET CURRENT BLOG
                // ----------------------------------

                const blogData =
                    await getBlog(blogId);

                if (cancelled) {
                    return;
                }

                if (!blogData) {
                    setBlog(null);

                    setRelatedBlogs([]);

                    setError(
                        "Blog not found."
                    );

                    return;
                }

                // ----------------------------------
                // MAP CURRENT BLOG
                // ----------------------------------

                const mappedBlog =
                    mapBlogFromAPI(
                        blogData
                    );

                setBlog(mappedBlog);

                // ----------------------------------
                // GET ALL BLOGS
                // ----------------------------------

                const allBlogs =
                    await getBlogs();

                if (cancelled) {
                    return;
                }

                // ----------------------------------
                // MAP BLOGS
                // ----------------------------------

                const mappedBlogs =
                    mapBlogsFromAPI(
                        allBlogs
                    );

                // ----------------------------------
                // FIND RELATED BLOGS
                // ----------------------------------

                const related =
                    mappedBlogs
                        .filter(
                            (item) =>
                                item.id !==
                                    mappedBlog.id &&
                                item.category?.id ===
                                    mappedBlog.category
                                        ?.id
                        )
                        .slice(0, 3);

                setRelatedBlogs(related);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load blog:",
                    error
                );

                setBlog(null);

                setRelatedBlogs([]);

                setError(
                    "Unable to load this blog. Please try again later."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadBlog();

        return () => {
            cancelled = true;
        };
    }, [blogId]);

    // ==========================================
    // DERIVED INVALID-ID STATE
    // ==========================================

    if (!blogId) {
        return {
            blog: null,

            relatedBlogs: [],

            loading: false,

            error: "Invalid blog ID.",
        };
    }

    // ==========================================
    // RETURN
    // ==========================================

    return {
        blog,

        relatedBlogs,

        loading,

        error,
    };
};

export default useBlogDetails;
