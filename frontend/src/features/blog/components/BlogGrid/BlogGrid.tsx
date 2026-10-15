import "./BlogGrid.css";

import BlogCard from "../BlogCard";
import type { Blog } from "../../types/blog.types";

interface BlogGridProps {
    blogs: Blog[];
}

const BlogGrid = ({ blogs }: BlogGridProps) => {
    if (blogs.length === 0) {
        return (
            <div className="blog-grid-empty">
                <h2>No Blogs Found</h2>

                <p>
                    Try searching with another keyword.
                </p>
            </div>
        );
    }

    return (
        <section className="blog-grid">
            {blogs.map((blog) => (
                <BlogCard
                    key={blog.id}
                    blog={blog}
                />
            ))}
        </section>
    );
};

export default BlogGrid;