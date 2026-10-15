import "./blogcard.css";

import BlogImage from "../BlogImage";

import type { Blog } from "../../types/blog.types";

interface BlogCardProps {
  blog: Blog;
}

const BlogCard = ({ blog }: BlogCardProps) => {
  return (
    <article className="blog-card">
      <BlogImage
        image={blog.image ?? ""}
        title={blog.title}
      />

      <div className="blog-card-content">
        <span className="blog-category">
          {blog.category?.name ?? "Uncategorized"}
        </span>

        <h3>{blog.title}</h3>

        <p>{blog.description}</p>

        <div className="blog-meta">
          <span>
            By {blog.author}
          </span>

          <span>
            {blog.date}
          </span>
        </div>

        <button type="button">
          Read More
        </button>
      </div>
    </article>
  );
};

export default BlogCard;