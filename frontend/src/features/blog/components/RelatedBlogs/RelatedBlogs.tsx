import "./RelatedBlogs.css";

import BlogCard from "../BlogCard";
import type { Blog } from "../../types/blog.types";

interface RelatedBlogsProps {
  blogs: Blog[];
}

const RelatedBlogs = ({
  blogs,
}: RelatedBlogsProps) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="related-blogs">
      <h2>Related Articles</h2>

      <div className="related-blogs-grid">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;