import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AdminLayout from "../../../../features/Admin/components/AdminLayouts";

import BlogForm from "../components/BlogForm";

import {
  createAdminBlog,
  getAdminBlogCategories,
  type BlogCategory,
  type BlogFormData,
} from "../services/adminBlogService";

import "../styles/AdminBlogs.css";

const AddBlog = () => {

  const navigate = useNavigate();


  // ========================================================
  // STATE
  // ========================================================

  const [categories, setCategories] =
    useState<BlogCategory[]>([]);

  const [loading, setLoading] =
    useState(false);


  // ========================================================
  // LOAD CATEGORIES
  // ========================================================

  useEffect(() => {

    const loadCategories = async () => {

      try {

        const data =
          await getAdminBlogCategories();

        setCategories(data);

      } catch (error: unknown) {

        console.error(
          "Failed to load blog categories:",
          error
        );

      }
    };

    loadCategories();

  }, []);


  // ========================================================
  // HANDLE SUBMIT
  // ========================================================

  const handleSubmit = async (
    data: BlogFormData
  ) => {

    try {

      setLoading(true);

      await createAdminBlog(data);

      navigate("/admin/blogs");

    } catch (error: unknown) {

      console.error(
        "Failed to create blog:",
        error
      );


      // ----------------------------------------------------
      // AXIOS ERROR
      // ----------------------------------------------------

      if (axios.isAxiosError(error)) {

        console.error(
          "Backend response:",
          error.response?.data
        );

        console.error(
          "Status:",
          error.response?.status
        );

      }

    } finally {

      setLoading(false);

    }
  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <AdminLayout>

      <div className="admin-page">

        <div className="admin-page-header">

          <div>

            <h1>
              Add Blog
            </h1>

            <p>
              Create a new blog post.
            </p>

          </div>

        </div>


        <div className="admin-content-card">

          <BlogForm
            categories={categories}
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>

      </div>

    </AdminLayout>
  );
};

export default AddBlog;