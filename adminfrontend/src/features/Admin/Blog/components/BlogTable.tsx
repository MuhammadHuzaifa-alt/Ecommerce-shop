import { FaEdit, FaTrash } from "react-icons/fa";

import type { AdminBlog } from "../services/adminBlogService";

interface BlogTableProps {
  blogs: AdminBlog[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const BlogTable = ({
  blogs,
  onEdit,
  onDelete,
}: BlogTableProps) => {

  return (
    <div className="blog-table-container">

      <table className="blog-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Date</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {blogs.length === 0 ? (

            <tr>
              <td
                colSpan={7}
                className="empty-table"
              >
                No blogs found.
              </td>
            </tr>

          ) : (

            blogs.map((blog) => (

              <tr key={blog.id}>

                <td>

                  {blog.image ? (

                    <img
                      src={
                            blog.image?.includes("/media/")
                            ? `/media/${blog.image.split("/media/").pop()}`
                            : blog.image
                           }
                      alt={blog.title}
                      className="blog-table-image"
                    />

                  ) : (

                    <div className="blog-no-image">
                      No Image
                    </div>

                  )}

                </td>

                <td>

                  <div className="blog-title-cell">

                    <strong>
                      {blog.title}
                    </strong>

                    <span>
                      {blog.description}
                    </span>

                  </div>

                </td>

                <td>
                  {blog.category?.name || "N/A"}
                </td>

                <td>
                  {blog.author}
                </td>

                <td>
                  {blog.date}
                </td>

                <td>
                  {blog.views ?? 0}
                </td>

                <td>

                  <div className="blog-actions">

                    <button
                      type="button"
                      className="edit-blog-button"
                      onClick={() =>
                        onEdit(blog.id)
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      type="button"
                      className="delete-blog-button"
                      onClick={() =>
                        onDelete(blog.id)
                      }
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
};

export default BlogTable;
