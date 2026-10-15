import { useEffect, useMemo, useState } from "react";

import "./product.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import SearchBar from "../../components/SearchBar";
import SortDropdown from "../../components/SortDropdown";
import CategoryFilter from "../../components/CategoryFilter";
import BrandFilter from "../../components/BrandFilter";
import PriceFilter from "../../components/PriceFilter";
import RatingFilter from "../../components/RatingFilter";
import ProductGrid from "../../components/ProductGrid";
import Pagination from "../../components/Pagination";

import type { Product } from "../../types/product";
import type { Category } from "../../../../features/products/services/categoryService";

import { getProducts } from "../../services/productService";
import { getCategories } from "../../../../features/products/services/categoryService";


// ==========================================================
// CONSTANTS
// ==========================================================

const BRANDS = [
  { id: 1, name: "Apple" },
  { id: 2, name: "Samsung" },
  { id: 3, name: "Sony" },
  { id: 4, name: "Nike" },
  { id: 5, name: "Adidas" },
];

const MIN_PRICE = 0;
const MAX_PRICE = 5000;
const PRODUCTS_PER_PAGE = 8;


// ==========================================================
// TYPES
// ==========================================================

interface ApiProduct {
  id: number;
  name: string;

  category: {
    id: number;
    name: string;
  };

  brand: string;

  image: string | null;

  price: string | number;

  oldPrice: string | number;

  rating: string | number;

  reviews: string | number;

  stock: string | number;

  discount: string | number;
}

interface PriceRange {
  min: number;
  max: number;
}


// ==========================================================
// HELPERS
// ==========================================================

const formatProduct = (
  product: ApiProduct
): Product => ({
  id: product.id,

  name: product.name,

  category: {
    id: product.category.id,
    name: product.category.name,
  },

  brand: product.brand,

  image: product.image
  ? `/media/${product.image.split("/media/").pop()}`
  : null,

  price: Number(product.price),

  oldPrice: Number(product.oldPrice),

  rating: Number(product.rating),

  reviews: Number(product.reviews),

  stock: Number(product.stock),

  discount: Number(product.discount),

  isNew: false,
});


// ==========================================================
// COMPONENT
// ==========================================================

const Products = () => {

  // --------------------------------------------------------
  // PRODUCTS
  // --------------------------------------------------------

  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  // --------------------------------------------------------
  // CATEGORIES
  // --------------------------------------------------------

  const [
    categories,
    setCategories,
  ] = useState<Category[]>([]);

  const [
    categoryLoading,
    setCategoryLoading,
  ] = useState(true);


  // --------------------------------------------------------
  // FILTERS
  // --------------------------------------------------------

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState<number | null>(null);

  const [
    selectedBrand,
    setSelectedBrand,
  ] = useState<number | null>(null);

  const [
    selectedRating,
    setSelectedRating,
  ] = useState<number | null>(null);

  const [
    priceRange,
    setPriceRange,
  ] = useState<PriceRange>({
    min: MIN_PRICE,
    max: MAX_PRICE,
  });


  // --------------------------------------------------------
  // SORTING / PAGINATION
  // --------------------------------------------------------

  const [
    sort,
    setSort,
  ] = useState("featured");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);


  // ========================================================
  // LOAD PRODUCTS
  // ========================================================

  useEffect(() => {

    const loadProducts = async () => {

      try {

        setLoading(true);

        setError("");

        const data =
          await getProducts();

        const formattedProducts =
          data.map(
            (product) =>
              formatProduct(
                product as ApiProduct
              )
          );

        setProducts(
          formattedProducts
        );

      } catch (error) {

        console.error(
          "Error loading products:",
          error
        );

        setError(
          "Unable to load products. Please try again."
        );

      } finally {

        setLoading(false);
      }
    };

    loadProducts();

  }, []);


  // ========================================================
  // LOAD CATEGORIES
  // ========================================================

  useEffect(() => {

    const loadCategories =
      async () => {

        try {

          setCategoryLoading(true);

          const data =
            await getCategories();

          setCategories(data);

        } catch (error) {

          console.error(
            "Error loading categories:",
            error
          );

        } finally {

          setCategoryLoading(false);
        }
      };

    loadCategories();

  }, []);


  // ========================================================
  // FILTER HANDLERS
  // ========================================================

  const handleSearch = (
    value: string
  ) => {

    setSearch(value);

    setCurrentPage(1);
  };


  const handleCategoryChange = (
    value: number | null
  ) => {

    setSelectedCategory(value);

    setCurrentPage(1);
  };


  const handleBrandChange = (
    value: number | null
  ) => {

    setSelectedBrand(value);

    setCurrentPage(1);
  };


  const handleRatingChange = (
    value: number | null
  ) => {

    setSelectedRating(value);

    setCurrentPage(1);
  };


  const handlePriceChange = (
    min: number,
    max: number
  ) => {

    setPriceRange({
      min,
      max,
    });

    setCurrentPage(1);
  };


  const handleSortChange = (
    value: string
  ) => {

    setSort(value);

    setCurrentPage(1);
  };


  // ========================================================
  // FILTER PRODUCTS
  // ========================================================

  const filteredProducts =
    useMemo(() => {

      const selectedBrandName =
        BRANDS.find(
          (brand) =>
            brand.id === selectedBrand
        )?.name;

      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return products.filter(
        (product) => {

          const matchesSearch =
            product.name
              .toLowerCase()
              .includes(
                normalizedSearch
              );

          const matchesCategory =
            selectedCategory === null ||
            product.category.id ===
              selectedCategory;

          const matchesBrand =
            selectedBrand === null ||
            product.brand ===
              selectedBrandName;

          const matchesRating =
            selectedRating === null ||
            product.rating >=
              selectedRating;

          const matchesPrice =
            Number(product.price) >=
              priceRange.min &&
            Number(product.price) <=
              priceRange.max;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesBrand &&
            matchesRating &&
            matchesPrice
          );
        }
      );

    }, [
      products,
      search,
      selectedCategory,
      selectedBrand,
      selectedRating,
      priceRange,
    ]);


  // ========================================================
  // SORT PRODUCTS
  // ========================================================

  const sortedProducts =
    useMemo(() => {

      const sorted =
        [...filteredProducts];

      switch (sort) {

        case "priceLow":

          return sorted.sort(
            (a, b) =>
              Number(a.price) -
              Number(b.price)
          );

        case "priceHigh":

          return sorted.sort(
            (a, b) =>
              Number(b.price) -
              Number(a.price)
          );

        case "rating":

          return sorted.sort(
            (a, b) =>
              b.rating -
              a.rating
          );

        case "discount":

          return sorted.sort(
            (a, b) =>
              (b.discount ?? 0) -
              (a.discount ?? 0)
          );

        default:

          return sorted;
      }

    }, [
      filteredProducts,
      sort,
    ]);


  // ========================================================
  // PAGINATION
  // ========================================================

  const totalPages =
    Math.ceil(
      sortedProducts.length /
        PRODUCTS_PER_PAGE
    );

  const paginatedProducts =
    useMemo(() => {

      const startIndex =
        (currentPage - 1) *
        PRODUCTS_PER_PAGE;

      return sortedProducts.slice(
        startIndex,
        startIndex +
          PRODUCTS_PER_PAGE
      );

    }, [
      sortedProducts,
      currentPage,
    ]);


  // ========================================================
  // CLEAR FILTERS
  // ========================================================

  const clearFilters = () => {

    setSearch("");

    setSelectedCategory(null);

    setSelectedBrand(null);

    setSelectedRating(null);

    setPriceRange({
      min: MIN_PRICE,
      max: MAX_PRICE,
    });

    setSort("featured");

    setCurrentPage(1);
  };


  // ========================================================
  // LOADING STATE
  // ========================================================

  if (loading) {

    return (
      <>
        <Navbar />

        <main className="products-page">

          <div className="products-loading">
            Loading products...
          </div>

        </main>

        <Footer />
      </>
    );
  }


  // ========================================================
  // ERROR STATE
  // ========================================================

  if (error) {

    return (
      <>
        <Navbar />

        <main className="products-page">

          <div className="products-error">
            {error}
          </div>

        </main>

        <Footer />
      </>
    );
  }


  // ========================================================
  // PAGE
  // ========================================================

  return (
    <>
      <Navbar />

      <main className="products-page">

        {/* Hero */}

        <section className="products-hero">

          <h1>
            Our Products
          </h1>

          <p>
            Discover premium products
            at the best prices.
          </p>

        </section>


        {/* Search & Sort */}

        <section className="products-top">

          <SearchBar
            onSearch={handleSearch}
          />

          <SortDropdown
            value={sort}
            onChange={
              handleSortChange
            }
          />

        </section>


        {/* Products Content */}

        <section className="products-content">

          {/* Filters */}

          <aside
            className="sidebar"
            aria-label="Product filters"
          >

            {categoryLoading ? (

              <div className="filter-loading">
                Loading categories...
              </div>

            ) : (

              <CategoryFilter
                categories={categories}
                selectedCategory={
                  selectedCategory
                }
                onCategoryChange={
                  handleCategoryChange
                }
              />

            )}


            <BrandFilter
              brands={BRANDS}
              selectedBrand={
                selectedBrand
              }
              onBrandChange={
                handleBrandChange
              }
            />


            <PriceFilter
              min={MIN_PRICE}
              max={MAX_PRICE}
              onPriceChange={
                handlePriceChange
              }
            />


            <RatingFilter
              selectedRating={
                selectedRating
              }
              onRatingChange={
                handleRatingChange
              }
            />


            <button
              type="button"
              className="clear-filter-btn"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          </aside>


          {/* Product Results */}

          <section className="products-main">

            <header className="products-info">

              <h2>
                Products
              </h2>

              <p>
                {
                  sortedProducts.length
                }{" "}
                Products Found
              </p>

            </header>


            {paginatedProducts.length >
            0 ? (

              <>

                <ProductGrid
                  products={
                    paginatedProducts
                  }
                />


                {totalPages > 1 && (

                  <Pagination
                    currentPage={
                      currentPage
                    }
                    totalPages={
                      totalPages
                    }
                    onPageChange={
                      setCurrentPage
                    }
                  />

                )}

              </>

            ) : (

              <div className="no-products">

                <h3>
                  No Products Found
                </h3>

                <p>
                  Try changing your
                  search or filters.
                </p>

              </div>

            )}

          </section>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Products;
