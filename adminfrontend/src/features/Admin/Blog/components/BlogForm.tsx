import { useState } from "react";

import type {
  BlogCategory,
  BlogFormData,
} from "../services/adminBlogService";

import "../styles/BlogForm.css";

const getBlogImageUrl = (image: string): string => {
  if (image.includes("/media/")) {
    return `/media/${image.split("/media/").pop()}`;
  }

  return image;
};

interface BlogFormProps {
  categories: BlogCategory[];
  initialData?: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  loading?: boolean;
}

const defaultData: BlogFormData = {
  title: "",
  description: "",
  content: "",
  category: "",
  author: "",
  date: "",
  tags: "",
  readTime: "0",
  image: null,
};

const BlogForm = ({
  categories,
  initialData,
  onSubmit,
  loading = false,
}: BlogFormProps) => {

  const [formData, setFormData] =
    useState<BlogFormData>(
      () => initialData ?? defaultData
    );


  // ========================================================
  // HANDLE INPUT CHANGE
  // ========================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // ========================================================
  // HANDLE IMAGE CHANGE
  // ========================================================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0] ?? null;

    setFormData((previous) => ({
      ...previous,
      image: file,
    }));
  };


  // ========================================================
  // HANDLE SUBMIT
  // ========================================================

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    onSubmit(formData);
  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <form
      className="blog-form"
      onSubmit={handleSubmit}
      method="POST"
    >

      <div className="blog-form-grid">

        {/* TITLE */}

        <div className="form-group">

          <label htmlFor="title">
            Blog Title
          </label>

          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />

        </div>


        {/* CATEGORY */}

        <div className="form-group">

          <label htmlFor="category">
            Category
          </label>

          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Category
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


        {/* AUTHOR */}

        <div className="form-group">

          <label htmlFor="author">
            Author
          </label>

          <input
            id="author"
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            required
          />

        </div>


        {/* DATE */}

        <div className="form-group">

          <label htmlFor="date">
            Date
          </label>

          <input
            id="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

        </div>


        {/* READ TIME */}

        <div className="form-group">

          <label htmlFor="readTime">
            Read Time
          </label>

          <input
            id="readTime"
            type="number"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            min="0"
            placeholder="Minutes"
          />

        </div>


        {/* TAGS */}

        <div className="form-group">

          <label htmlFor="tags">
            Tags
          </label>

          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="React, Django, AI"
          />

        </div>


        {/* DESCRIPTION */}

        <div className="form-group full-width">

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter short blog description"
            rows={4}
            required
          />

        </div>


        {/* CONTENT */}

        <div className="form-group full-width">

          <label htmlFor="content">
            Content
          </label>

          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write blog content..."
            rows={12}
            required
          />

        </div>


        {/* IMAGE */}

        <div className="form-group full-width">

          <label htmlFor="image">
            Blog Image
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          {typeof initialData?.image === "string" &&
            !formData.image && (
            <img
            src={getBlogImageUrl(initialData.image as string)}
            alt="Current blog"
            className="current-blog-image"
            />
           )}

        </div>

      </div>


      {/* ACTIONS */}

      <div className="blog-form-actions">

        <button
          type="submit"
          className="primary-button"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Blog"}
        </button>

      </div>

    </form>
  );
};

export default BlogForm;
