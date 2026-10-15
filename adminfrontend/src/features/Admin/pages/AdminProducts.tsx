import { useEffect, useMemo, useState } from "react";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../components/AdminLayouts";
import {
  deleteProduct,
  getCategories,
  getProducts,
} from "../../../features/Admin/services/productService";

import type {
  Product,
  ProductCategory,
} from "../types/product";

import "../styles/AdminProducts.css";

const AdminProducts = () => {
  const navigate = useNavigate();

  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<ProductCategory[]>([]);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("");

  const [stockFilter, setStockFilter] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleteId, setDeleteId] =
    useState<number | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | LOAD DATA
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          productData,
          categoryData,
        ] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);

        setProducts(productData);
        setCategories(categoryData);

      } catch (error) {
        console.error(
          "Failed to load products:",
          error
        );

        setError(
          "Unable to load products. Please check the API connection."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FILTER PRODUCTS
  |--------------------------------------------------------------------------
  */

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        product.brand
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        !categoryFilter ||
        product.category.id.toString() ===
          categoryFilter;

      let matchesStock = true;

      if (stockFilter === "in-stock") {
        matchesStock =
          product.stock > 0;
      }

      if (stockFilter === "low-stock") {
        matchesStock =
          product.stock > 0 &&
          product.stock <= 10;
      }

      if (stockFilter === "out-of-stock") {
        matchesStock =
          product.stock === 0;
      }

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStock
      );
    });
  }, [
    products,
    search,
    categoryFilter,
    stockFilter,
  ]);

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const handleDelete = async () => {
    if (deleteId === null) {
      return;
    }

    try {
      setDeleting(true);

      await deleteProduct(deleteId);

      setProducts((previous) =>
        previous.filter(
          (product) =>
            product.id !== deleteId
        )
      );

      setDeleteId(null);

    } catch (error) {
      console.error(
        "Failed to delete product:",
        error
      );

      setError(
        "Unable to delete product."
      );
    } finally {
      setDeleting(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | STOCK STATUS
  |--------------------------------------------------------------------------
  */

  const getStockStatus = (
    stock: number
  ) => {
    if (stock === 0) {
      return {
        label: "Out of Stock",
        className: "out-stock",
      };
    }

    if (stock <= 10) {
      return {
        label: "Low Stock",
        className: "low-stock",
      };
    }

    return {
      label: "In Stock",
      className: "in-stock",
    };
  };

  return (
    <AdminLayout>

      <div className="admin-products">

        {/* HEADER */}

        <div className="products-header">

          <div>
            <h1>Products</h1>

            <p>
              Manage your store products.
            </p>
          </div>

          <button
            className="add-product-button"
            onClick={() =>
              navigate(
                "/admin/products/add"
              )
            }
          >
            <FaPlus />

            Add Product
          </button>

        </div>


        {/* ERROR */}

        {error && (
          <div className="products-error">
            {error}
          </div>
        )}


        {/* FILTERS */}

        <div className="products-filters">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>


          <select
            value={categoryFilter}
            onChange={(event) =>
              setCategoryFilter(
                event.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              )
            )}
          </select>


          <select
            value={stockFilter}
            onChange={(event) =>
              setStockFilter(
                event.target.value
              )
            }
          >
            <option value="">
              All Stock
            </option>

            <option value="in-stock">
              In Stock
            </option>

            <option value="low-stock">
              Low Stock
            </option>

            <option value="out-of-stock">
              Out of Stock
            </option>

          </select>

        </div>


        {/* TABLE */}

        <div className="products-card">

          {loading ? (

            <div className="products-loading">

              <div className="products-spinner" />

              <p>
                Loading products...
              </p>

            </div>

          ) : filteredProducts.length === 0 ? (

            <div className="products-empty">

              <div className="empty-icon">
                <FaBoxOpen />
              </div>

              <h3>
                No products found
              </h3>

              <p>
                {products.length === 0
                  ? "Your product list is empty. Add your first product to get started."
                  : "No products match your current filters."}
              </p>

              {products.length === 0 && (
                <button
                  onClick={() =>
                    navigate(
                      "/admin/products/add"
                    )
                  }
                >
                  <FaPlus />
                  Add Product
                </button>
              )}

            </div>

          ) : (

            <div className="products-table-wrapper">

              <table className="products-table">

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Status</th>
                    <th>Rating</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {filteredProducts.map(
                    (product) => {

                      const status =
                        getStockStatus(
                          product.stock
                        );

                      return (
                        <tr
                          key={product.id}
                        >

                          {/* PRODUCT */}

                          <td>

                            <div className="product-info">

                              <div className="product-image">

                                {product.image ? (
                                  <img
                                    src={
                                         product.image.includes("/media/")
                                         ? `/media/${product.image.split("/media/").pop()}`
                                         : product.image
                                        }
                                    alt={
                                      product.name
                                    }
                                  />
                                ) : (
                                  <FaBoxOpen />
                                )}

                              </div>

                              <div>

                                <strong>
                                  {product.name}
                                </strong>

                                <span>
                                  {product.brand}
                                </span>

                              </div>

                            </div>

                          </td>


                          {/* CATEGORY */}

                          <td>
                            {product.category
                              ?.name || "—"}
                          </td>


                          {/* PRICE */}

                          <td>

                            <div className="product-price">

                              <strong>
                                $
                                {Number(product.price).toFixed(2)}
                              </strong>

                              {product.oldPrice >
                                product.price && (
                                <del>
                                  $
                                  {Number(product.price).toFixed(2)}
                                </del>
                              )}

                            </div>

                          </td>


                          {/* STOCK */}

                          <td>
                            {product.stock}
                          </td>


                          {/* STATUS */}

                          <td>

                            <span
                              className={`stock-badge ${status.className}`}
                            >
                              {status.label}
                            </span>

                          </td>


                          {/* RATING */}

                          <td>

                            <div className="product-rating">

                              <span>
                                ★
                              </span>

                              {product.rating}

                              <small>
                                (
                                {
                                  product.reviews
                                }
                                )
                              </small>

                            </div>

                          </td>


                          {/* ACTIONS */}

                          <td>

                            <div className="product-actions">

                              <button
                                className="edit-button"
                                title="Edit product"
                                onClick={() =>
                                  navigate(
                                    `/admin/products/edit/${product.id}`
                                  )
                                }
                              >
                                <FaEdit />
                              </button>


                              <button
                                className="delete-button"
                                title="Delete product"
                                onClick={() =>
                                  setDeleteId(
                                    product.id
                                  )
                                }
                              >
                                <FaTrash />
                              </button>

                            </div>

                          </td>

                        </tr>
                      );
                    }
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>


      {/* DELETE MODAL */}

      {deleteId !== null && (

        <div className="delete-modal-overlay">

          <div className="delete-modal">

            <div className="delete-modal-icon">
              <FaTrash />
            </div>

            <h2>
              Delete Product
            </h2>

            <p>
              Are you sure you want to
              delete this product?
              This action cannot be
              undone.
            </p>

            <div className="delete-modal-actions">

              <button
                className="cancel-delete"
                onClick={() =>
                  setDeleteId(null)
                }
                disabled={deleting}
              >
                Cancel
              </button>

              <button
                className="confirm-delete"
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
};

export default AdminProducts;
