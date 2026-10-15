import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaImage,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import type { FormEvent } from "react";

import AdminLayout from "../components/AdminLayouts";

import {
  getProduct,
  getCategories,
  updateProduct,
} from "../../../features/Admin/services/productService";

import type {
  ProductCategory,
  ProductFormData,
} from "../types/product";

import "../styles/EditProduct.css";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ==========================================================
  // CATEGORIES
  // ==========================================================

  const [categories, setCategories] =
    useState<ProductCategory[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  // ==========================================================
  // FORM DATA
  // ==========================================================

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

  // ==========================================================
  // EXISTING IMAGE
  // ==========================================================

  const [existingImage, setExistingImage] =
    useState<string | null>(null);

  // ==========================================================
  // NEW IMAGE PREVIEW
  // ==========================================================

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  // ==========================================================
  // STATES
  // ==========================================================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================================
  // LOAD PRODUCT + CATEGORIES
  // ==========================================================

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        setError("Product ID is missing.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const [
          product,
          categoryData,
        ] = await Promise.all([
          getProduct(Number(id)),
          getCategories(),
        ]);

        // Categories
        setCategories(categoryData);

        // Existing image
        if (product.image) {
          setExistingImage(product.image);
        } else {
          setExistingImage(null);
        }

        // Product data
        setFormData({
          name: product.name,
          category:
            product.category.id.toString(),
          brand: product.brand,
          image: null,
          price:
            product.price.toString(),
          oldPrice:
            product.oldPrice.toString(),
          rating:
            product.rating.toString(),
          reviews:
            product.reviews.toString(),
          stock:
            product.stock.toString(),
          discount:
            product.discount.toString(),
        });

      } catch (error) {
        console.error(
          "Failed to load product:",
          error
        );

        setError(
          "Unable to load product."
        );

      } finally {
        setLoading(false);
        setCategoriesLoading(false);
      }
    };

    loadData();
  }, [id]);

  // ==========================================================
  // CLEAN IMAGE PREVIEW
  // ==========================================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // ==========================================================
  // INPUT CHANGE
  // ==========================================================

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

  // ==========================================================
  // IMAGE CHANGE
  // ==========================================================

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

    // Maximum 5 MB
    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      setError(
        "Image size must be less than 5 MB."
      );

      event.target.value = "";

      return;
    }

    // Remove old preview
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    // Create preview
    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);

    // New image means we don't need old image
    setExistingImage(null);

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));

    setError("");
  };

  // ==========================================================
  // REMOVE NEW IMAGE
  // ==========================================================

  const handleRemoveNewImage = () => {
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

  // ==========================================================
  // REMOVE EXISTING IMAGE
  // ==========================================================

  const handleRemoveExistingImage = () => {
    setExistingImage(null);

    setFormData((previous) => ({
      ...previous,
      image: null,
    }));
  };

  // ==========================================================
  // SUBMIT
  // ==========================================================

  const handleSubmit = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    if (!id) {
      setError(
        "Product ID is missing."
      );
      return;
    }

    setError("");

    // ========================================================
    // VALIDATION
    // ========================================================

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

    // ========================================================
    // UPDATE PRODUCT
    // ========================================================

    try {
      setSaving(true);

      await updateProduct(
        Number(id),
        formData
      );

      navigate(
        "/admin/products"
      );

    } catch (error) {
      console.error(
        "Failed to update product:",
        error
      );

      setError(
        "Unable to update product."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <AdminLayout>
        <div className="edit-product-loading">
          Loading product...
        </div>
      </AdminLayout>
    );
  }

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <AdminLayout>

      <div className="edit-product-page">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="edit-product-header">

          <button
            type="button"
            className="edit-back-button"
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
            Edit Product
          </h1>

          <p>
            Update your product information.
          </p>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="edit-product-error">
            {error}
          </div>
        )}

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          className="edit-product-form"
          onSubmit={handleSubmit}
        >

          {/* ==================================================
              PRODUCT INFORMATION
          ================================================== */}

          <div className="edit-form-card">

            <div className="edit-form-card-header">

              <h2>
                Product Information
              </h2>

              <p>
                Update product details.
              </p>

            </div>

            <div className="edit-form-card-body">

              {/* PRODUCT NAME */}

              <div className="edit-form-group">

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
                  placeholder="Product name"
                />

              </div>

              {/* CATEGORY */}

              <div className="edit-form-group">

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

              <div className="edit-form-group">

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
                  placeholder="Brand"
                />

              </div>

              {/* IMAGE */}

              <div className="edit-form-group edit-full-width">

                <label htmlFor="image">
                  Product Image
                </label>

                <div className="edit-image-upload">

                  {/* NEW IMAGE */}

                  {imagePreview ? (
                    <div className="edit-image-preview-container">

                      <img
                        src={imagePreview}
                        alt="New product preview"
                        className="edit-image-preview"
                      />

                      <div className="edit-image-info">

                        <p>
                          {formData.image?.name}
                        </p>

                        <small>
                          {formData.image
                            ? `${(
                                formData.image.size /
                                1024 /
                                1024
                              ).toFixed(2)} MB`
                            : ""}
                        </small>

                        <button
                          type="button"
                          className="edit-remove-image-button"
                          onClick={
                            handleRemoveNewImage
                          }
                        >
                          <FaTimes />

                          Remove Image
                        </button>

                      </div>

                    </div>
                  ) : existingImage ? (

                    /* EXISTING IMAGE */

                    <div className="edit-image-preview-container">

                      <img
                        src={existingImage}
                        alt={
                          formData.name
                        }
                        className="edit-image-preview"
                      />

                      <div className="edit-image-info">

                        <p>
                          Current Product Image
                        </p>

                        <button
                          type="button"
                          className="edit-remove-image-button"
                          onClick={
                            handleRemoveExistingImage
                          }
                        >
                          <FaTimes />

                          Remove Image
                        </button>

                      </div>

                    </div>

                  ) : (

                    /* UPLOAD */

                    <>

                      <FaImage className="edit-image-upload-icon" />

                      <label
                        htmlFor="image"
                        className="edit-image-upload-label"
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

                  )}

                </div>

              </div>

            </div>

          </div>

          {/* ==================================================
              PRICING
          ================================================== */}

          <div className="edit-form-card">

            <div className="edit-form-card-header">

              <h2>
                Pricing
              </h2>

              <p>
                Update your product pricing.
              </p>

            </div>

            <div className="edit-form-card-body">

              {/* PRICE */}

              <div className="edit-form-group">

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

              <div className="edit-form-group">

                <label htmlFor="oldPrice">
                  Old Price
                </label>

                <input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={
                    formData.oldPrice
                  }
                  onChange={handleChange}
                  placeholder="0.00"
                />

              </div>

              {/* DISCOUNT */}

              <div className="edit-form-group">

                <label htmlFor="discount">
                  Discount
                </label>

                <input
                  id="discount"
                  name="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={
                    formData.discount
                  }
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

            </div>

          </div>

          {/* ==================================================
              INVENTORY & REVIEWS
          ================================================== */}

          <div className="edit-form-card">

            <div className="edit-form-card-header">

              <h2>
                Inventory & Reviews
              </h2>

              <p>
                Manage stock and review information.
              </p>

            </div>

            <div className="edit-form-card-body">

              {/* STOCK */}

              <div className="edit-form-group">

                <label htmlFor="stock">
                  Stock
                </label>

                <input
                  id="stock"
                  name="stock"
                  type="number"
                  min="0"
                  value={
                    formData.stock
                  }
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

              {/* RATING */}

              <div className="edit-form-group">

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
                  value={
                    formData.rating
                  }
                  onChange={handleChange}
                  placeholder="0.0"
                />

              </div>

              {/* REVIEWS */}

              <div className="edit-form-group">

                <label htmlFor="reviews">
                  Reviews
                </label>

                <input
                  id="reviews"
                  name="reviews"
                  type="number"
                  min="0"
                  value={
                    formData.reviews
                  }
                  onChange={handleChange}
                  placeholder="0"
                />

              </div>

            </div>

          </div>

          {/* ==================================================
              ACTIONS
          ================================================== */}

          <div className="edit-product-actions">

            <button
              type="button"
              className="edit-cancel-button"
              onClick={() =>
                navigate(
                  "/admin/products"
                )
              }
              disabled={saving}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-save-button"
              disabled={
                saving ||
                categoriesLoading
              }
            >

              <FaSave />

              {saving
                ? "Updating..."
                : "Update Product"}

            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
};

export default EditProduct;