import "./categoryfilter.css";


interface Category {

  id: number;

  name: string;

}


interface CategoryFilterProps {

  categories: Category[];

  selectedCategory: number | null;

  onCategoryChange: (
    id: number | null
  ) => void;

}


const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {

  return (

    <div className="category-filter">

      <h3 className="filter-title">
        Categories
      </h3>


      {/* ALL CATEGORIES */}

      <button
        type="button"
        className={
          selectedCategory === null
            ? "category-item active"
            : "category-item"
        }
        onClick={() =>
          onCategoryChange(null)
        }
      >
        All Categories
      </button>


      {/* DATABASE CATEGORIES */}

      {categories.map(
        (category) => (

          <button
            type="button"
            key={category.id}
            className={
              selectedCategory === category.id
                ? "category-item active"
                : "category-item"
            }
            onClick={() =>
              onCategoryChange(
                category.id
              )
            }
          >
            {category.name}
          </button>

        )
      )}

    </div>

  );

};


export default CategoryFilter;