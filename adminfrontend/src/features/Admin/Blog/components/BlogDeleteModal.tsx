import "../styles/BlogDeleteModal.css";

interface BlogDeleteModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const BlogDeleteModal = ({
  onCancel,
  onConfirm,
}: BlogDeleteModalProps) => {

  return (
    <div className="blog-modal-overlay">

      <div className="blog-delete-modal">

        <h2>
          Delete Blog
        </h2>

        <p>
          Are you sure you want to delete this blog?
          This action cannot be undone.
        </p>

        <div className="blog-modal-actions">

          <button
            type="button"
            className="cancel-delete-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="button"
            className="confirm-delete-button"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default BlogDeleteModal;