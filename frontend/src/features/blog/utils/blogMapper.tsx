import type {
    Blog,
    BlogCategory,
    BlogTag,
} from "../types/blog.types";

import type {
    BlogAPI,
    BlogCategoryAPI,
} from "../services/blogApi";

export const mapBlogFromAPI = (
    blog: BlogAPI
): Blog => {
    const category: BlogCategory | null =
        blog.category
            ? {
                  id: blog.category.id,
                  name: blog.category.name,
                  count: blog.category.count ?? 0,
              }
            : null;

    const tags: BlogTag[] =
        blog.tags?.map((tag) => ({
            id: tag.id,
            name: tag.name,
        })) ?? [];

    return {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        content: blog.content,
        image: blog.image ? `/media/${blog.image.split("/media/").pop()}` : "",
        category,
        author: blog.author,
        date: blog.date,
        readTime: blog.readTime ?? null,
        views: blog.views ?? null,
        tags,
    };
};

export const mapBlogsFromAPI = (
    blogs: BlogAPI[]
): Blog[] => {
    return blogs.map(mapBlogFromAPI);
};

export const mapBlogCategoriesFromAPI = (
    categories: BlogCategoryAPI[]
): BlogCategory[] => {
    return categories.map((category) => ({
        id: category.id,
        name: category.name,
        count: category.count ?? 0,
    }));
};
