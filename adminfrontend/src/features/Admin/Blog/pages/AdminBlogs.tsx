import {
  useEffect,
  useState,
} from "react";

import { FaPlus } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import AdminLayout from "../../../../features/Admin/components/AdminLayouts";

import BlogTable from "../components/BlogTable";
import BlogDeleteModal from "../components/BlogDeleteModal";

import {
  deleteAdminBlog,
  getAdminBlogs,
  type AdminBlog,
} from "../services/adminBlogService";

import "../styles/AdminBlogs.css";


const AdminBlogs = () => {

  const navigate = useNavigate();


  // ========================================================
  // STATE
  // ========================================================

  const [blogs, setBlogs] =
    useState<AdminBlog[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [deleteId, setDeleteId] =
    useState<number | null>(null);


  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {

    let cancelled = false;

    const fetchBlogs = async () => {

      try {

        const data =
          await getAdminBlogs();

        if (cancelled) {
          return;
        }

        setBlogs(data);

      } catch (error: unknown) {

        if (cancelled) {
          return;
        }

        console.error(
          "Error loading blogs:",
          error
        );

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    };

    fetchBlogs();

    return () => {
      cancelled = true;
    };

  }, []);


  // ========================================================
  // DELETE BLOG
  // ========================================================

  const handleDelete = async () => {

    if (deleteId === null) {
      return;
    }


    try {

      await deleteAdminBlog(
        deleteId
      );


      setBlogs((previous) =>
        previous.filter(
          (blog) =>
            blog.id !== deleteId
        )
      );


      setDeleteId(null);

    } catch (error: unknown) {

      console.error(
        "Failed to delete blog:",
        error
      );

    }

  };


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <AdminLayout>

      <div className="admin-page">

        {/* HEADER */}

        <div className="admin-page-header">

          <div>

            <h1>
              Blogs
            </h1>

            <p>
              Manage your store blogs.
            </p>

          </div>


          <button
            type="button"
            className="primary-button"
            onClick={() =>
              navigate(
                "/admin/blogs/add"
              )
            }
          >

            <FaPlus />

            Add Blog

          </button>

        </div>


        {/* BLOG CONTENT */}

        <div className="admin-content-card">

          {loading ? (

            <div className="loading-state">
              Loading blogs...
            </div>

          ) : (

            <BlogTable
              blogs={blogs}

              onEdit={(id) =>
                navigate(
                  `/admin/blogs/edit/${id}`
                )
              }

              onDelete={(id) =>
                setDeleteId(id)
              }
            />

          )}

        </div>

      </div>


      {/* DELETE MODAL */}

      {deleteId !== null && (

        <BlogDeleteModal

          onCancel={() =>
            setDeleteId(null)
          }

          onConfirm={
            handleDelete
          }

        />

      )}

    </AdminLayout>
  );
};


export default AdminBlogs;