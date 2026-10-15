import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import axios from "axios";

import AdminLayout from "../../../../features/Admin/components/AdminLayouts";

import BlogForm from "../components/BlogForm";

import {
  getAdminBlog,
  getAdminBlogCategories,
  updateAdminBlog,
  type BlogCategory,
  type BlogFormData,
} from "../services/adminBlogService";

import "../styles/AdminBlogs.css";

const EditBlog = () => {

  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState<BlogCategory[]>([]);

  const [initialData, setInitialData] =
    useState<BlogFormData | undefined>();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  useEffect(() => {

    const loadData = async () => {

      try {

        if (!id) {
          return;
        }

        const [blog, categoryData] =
          await Promise.all([
            getAdminBlog(Number(id)),
            getAdminBlogCategories(),
          ]);

        setCategories(categoryData);

        setInitialData({
          title: blog.title,
          description: blog.description,
          content: blog.content,

          category:
            String(blog.category?.id || ""),

          author: blog.author,

          date: blog.date,

          tags:
            blog.tags?.join(", ") || "",

          readTime:
            String(blog.readTime || 0),

          image: null,
        });

      } catch (error: unknown) {

        console.error(
          "Failed to load blog:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadData();

  }, [id]);


  const handleSubmit = async (
    data: BlogFormData
  ) => {

    if (!id) {
      return;
    }

    try {

      setSaving(true);

      await updateAdminBlog(
        Number(id),
        data
      );

      navigate("/admin/blogs");

    } catch (error: unknown) {

      console.error(
        "Failed to update blog:",
        error
      );

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

      setSaving(false);

    }
  };


  if (loading) {

    return (
      <AdminLayout>

        <div className="loading-state">
          Loading blog...
        </div>

      </AdminLayout>
    );
  }


  return (
    <AdminLayout>

      <div className="admin-page">

        <div className="admin-page-header">

          <div>

            <h1>
              Edit Blog
            </h1>

            <p>
              Update your blog post.
            </p>

          </div>

        </div>


        <div className="admin-content-card">

          {initialData && (

            <BlogForm
              categories={categories}
              initialData={initialData}
              onSubmit={handleSubmit}
              loading={saving}
            />

          )}

        </div>

      </div>

    </AdminLayout>
  );
};

export default EditBlog;