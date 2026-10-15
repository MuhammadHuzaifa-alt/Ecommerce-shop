import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaImage,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import type { FormEvent } from "react";

import AdminLayout from "../components/AdminLayouts";

import {
  createProduct,
  getCategories,
} from "../../../features/Admin/services/productService";

import type {
  ProductCategory,
  ProductFormData,
} from "../types/product";

import "../styles/AddProduct.css";

const AddProduct = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // CATEGORIES
  // --------------------------------------------------

  const [categories, setCategories] =
    useState<ProductCategory[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  // --------------------------------------------------
  // FORM DATA
  // --------------------------------------------------

  const [formData, setFormData] =
    useState<ProductFormData>({
      name: "",
      category: "",
      brand: "",
      image: null,
      price: "",
      oldPrice: "",
      rating: "",
      reviews: "",
      stock: "",
      discount: "",
    });

  // --------------------------------------------------
  // IMAGE PREVIEW
  // --------------------------------------------------

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  // --------------------------------------------------
  // STATES
  // --------------------------------------------------

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // --------------------------------------------------
  // LOAD CATEGORIES
  // --------------------------------------------------

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setCategoriesLoading(true);

        const data =
          await getCategories();

        setCategories(data);

      } catch (error) {
        console.error(
          "Failed to load categories:",
          error
        );

        setError(
          "Unable to load categories."
        );

      } finally {
        setCategoriesLoading(false);
      }
    };

    loadCategories();
  }, []);

  // --------------------------------------------------
  // CLEAN IMAGE PREVIEW
  // --------------------------------------------------

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // --------------------------------------------------
  // INPUT CHANGE
  // --------------------------------------------------

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  };

  // --------------------------------------------------
  // IMAGE CHANGE
  // --------------------------------------------------

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    // Allowed image types
    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only PNG and JPG images are allowed."
      );

      event.target.value = "";

      return;
    }

    // Maximum file size = 5 MB
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";

      return;
    }

    // Remove previous preview URL
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create new preview
    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));

    setError("");
  };

  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setImagePreview(null);

    setFormData((previous) => ({
      ...previous,
      image: null,
    }));

    const imageInput =
      document.getElementById(
        "image"
      ) as HTMLInputElement | null;

    if (imageInput) {
      imageInput.value = "";
    }
  };

  // --------------------------------------------------
  // FORM SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    setError("");

    // ------------------------------------------------
    // VALIDATION
    // ------------------------------------------------

    if (!formData.name.trim()) {
      setError(
        "Product name is required."
      );
      return;
    }

    if (!formData.category) {
      setError(
        "Category is required."
      );
      return;
    }

    if (!formData.brand.trim()) {
      setError(
        "Brand is required."
      );
      return;
    }

    if (!formData.image) {
      setError(
        "Product image is required."
      );
      return;
    }

    if (!formData.price) {
      setError(
        "Price is required."
      );
      return;
    }

    if (
      Number(formData.price) < 0
    ) {
      setError(
        "Price cannot be negative."
      );
      return;
    }

    if (formData.stock === "") {
      setError(
        "Stock is required."
      );
      return;
    }

    if (
      Number(formData.stock) < 0
    ) {
      setError(
        "Stock cannot be negative."
      );
      return;
    }

    if (
      formData.rating &&
      (
        Number(formData.rating) < 0 ||
        Number(formData.rating) > 5
      )
    ) {
      setError(
        "Rating must be between 0 and 5."
      );
      return;
    }

    if (
      formData.discount &&
      (
        Number(formData.discount) < 0 ||
        Number(formData.discount) > 100
      )
    ) {
      setError(
        "Discount must be between 0 and 100."
      );
      return;
    }

    // ------------------------------------------------
    // CREATE PRODUCT
    // ------------------------------------------------

    try {
      setLoading(true);

      const productPayload: ProductFormData = {
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        price: formData.price,
        oldPrice: formData.oldPrice || "",
        rating: formData.rating || "",
        reviews: formData.reviews || "",
        stock: formData.stock,
        discount: formData.discount || "",
        image: formData.image,
      };

      await createProduct(productPayload);

      navigate(
        "/admin/products"
      );

    } catch (error) {
      console.error(
        "Failed to create product:",
        error
      );

      setError(
        "Unable to create product."
      );

    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // RENDER
  // --------------------------------------------------

  return (
    <AdminLayout>

      <div className="add-product-page">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="add-product-header">

          <button
            type="button"
            className="back-button"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            <FaArrowLeft />

            Back to Products
          </button>

          <h1>
            Add Product
          </h1>

          <p>
            Add a new product to your store.
          </p>

        </div>

        {/* ==========================================
            ERROR
        ========================================== */}

        {error && (
          <div className="product-form-error">
            {error}
          </div>
        )}

        {/* ==========================================
            FORM
        ========================================== */}

        <form
          className="add-product-form"
          onSubmit={handleSubmit}
          method="POST"
        >

          {/* ========================================
              PRODUCT INFORMATION
          ======================================== */}

          <div className="product-form-card">

            <div className="form-card-header">

              <h2>
                Product Information
              </h2>

              <p>
                Enter the basic information
                about your product.
              </p>

            </div>

            <div className="form-card-body">

              {/* PRODUCT NAME */}

              <div className="form-group">

                <label htmlFor="name">
                  Product Name
                  <span>*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />

              </div>

              {/* CATEGORY */}

              <div className="form-group">

                <label htmlFor="category">
                  Category
                  <span>*</span>
                </label>

                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  disabled={
                    categoriesLoading
                  }
                >

                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select category"}
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

              </div>

              {/* BRAND */}

              <div className="form-group">

                <label htmlFor="brand">
                  Brand
                  <span>*</span>
                </label>

                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="Enter brand"
                />

              </div>

              {/* IMAGE */}

              <div className="form-group full-width">

                <label htmlFor="image">
                  Product Image
                  <span>*</span>
                </label>

                <div className="image-upload-wrapper">

                  {!imagePreview ? (
                    <>
                      <FaImage className="image-upload-icon" />

                      <label
                        htmlFor="image"
                        className="image-upload-label"
                      >
                        <span>
                          Choose Product Image
                        </span>

                        <small>
                          PNG or JPG • Maximum 5 MB
                        </small>
                      </label>

                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                        onChange={
                          handleImageChange
                        }
                      />
                    </>
                  ) : (
                    <div className="image-preview-container">

                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="product-image-preview"
                      />

                      <div className="image-preview-info">

                        <p>
                          {formData.image?.name}
                        </p>

                        <small>
                          {formData.image
                            ? `${(
                                formData.image
                                  .size /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : ""}
                        </small>

                        <button
                          type="button"
                          className="remove-image-button"
                          onClick={
                            handleRemoveImage
                          }
                        >
                          <FaTimes />
                          Remove Image
                        </button>

                      </div>

                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>

          {/* ========================================
              PRICING
          ======================================== */}

          <div className="product-form-card">

            <div className="form-card-header">

              <h2>
                Pricing
              </h2>

              <p>
                Set your product pricing.
              </p>

            </div>

            <div className="form-card-body">

              {/* PRICE */}

              <div className="form-group">

                <label htmlFor="price">
                  Price
                  <span>*</span>
                </label>

                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />

              </div>

              {/* OLD PRICE */}

              <div className="form-group">

                <label htmlFor="oldPrice">
                  Old Price
                </label>

                <input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                />

              </div>

              {/* DISCOUNT */}

              <div className="form-group">

                <label htmlFor="discount">
                  Discount
                </label>

                <input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

            </div>

          </div>

          {/* ========================================
              INVENTORY & REVIEWS
          ======================================== */}

          <div className="product-form-card">

            <div className="form-card-header">

              <h2>
                Inventory & Reviews
              </h2>

              <p>
                Manage stock and review
                information.
              </p>

            </div>

            <div className="form-card-body">

              {/* STOCK */}

              <div className="form-group">

                <label htmlFor="stock">
                  Stock
                  <span>*</span>
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

              {/* RATING */}

              <div className="form-group">

                <label htmlFor="rating">
                  Rating
                </label>

                <input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="0.0"
                />

              </div>

              {/* REVIEWS */}

              <div className="form-group">

                <label htmlFor="reviews">
                  Reviews
                </label>

                <input
                  id="reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={formData.reviews}
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

            </div>

          </div>

          {/* ========================================
              ACTIONS
          ======================================== */}

          <div className="product-form-actions">

            <button
              type="button"
              className="cancel-product-button"
              onClick={() =>
                navigate(
                  "/admin/products"
                )
              }
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-product-button"
              disabled={
                loading ||
                categoriesLoading
              }
            >

              <FaSave />

              {loading
                ? "Saving..."
                : "Save Product"}

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
};

export default AddProduct;