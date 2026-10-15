import type {
  BlogCategory as BlogCategoryType,
} from "../../types/blog.types";

import "./BlogCategory.css";

interface BlogCategoryProps {
  categories: BlogCategoryType[];
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

const BlogCategory = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: BlogCategoryProps) => {
  return (
    <section className="blog-category">
      <h3 className="blog-category-title">
        Categories
      </h3>

      <div className="blog-category-list">
        <button
          type="button"
          className={`blog-category-item ${
            selectedCategory === null ? "active" : ""
          }`}
          onClick={() => onCategoryChange(null)}
          aria-pressed={selectedCategory === null}
        >
          <span>All Categories</span>
        </button>

        {categories.map((category) => {
          const isActive =
            selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              className={`blog-category-item ${
                isActive ? "active" : ""
              }`}
              onClick={() =>
                onCategoryChange(category.id)
              }
              aria-pressed={isActive}
            >
              <span>{category.name}</span>

              {category.count !== undefined && (
                <span className="blog-category-count">
                  {category.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default BlogCategory;