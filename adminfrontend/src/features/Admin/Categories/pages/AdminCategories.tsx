import {
    useEffect,
    useState,
} from "react";

import axios from "axios";

import AdminLayout from "../../components/AdminLayouts";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/adminCategoryService";

import {
    getBlogCategories,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    type BlogCategory,
} from "../services/adminBlogCategoryService";

import "../styles/AdminCategories.css";

type Category = {
    id: number;
    name: string;
};


const AdminCategories = () => {

    // ========================================================
    // PRODUCT CATEGORIES
    // ========================================================

    const [categories, setCategories] =
        useState<Category[]>([]);

    const [name, setName] =
        useState("");

    const [editId, setEditId] =
        useState<number | null>(null);

    const [editName, setEditName] =
        useState("");


    // ========================================================
    // BLOG CATEGORIES
    // ========================================================

    const [blogCategories, setBlogCategories] =
        useState<BlogCategory[]>([]);

    const [blogCategoryName, setBlogCategoryName] =
        useState("");

    const [blogEditId, setBlogEditId] =
        useState<number | null>(null);

    const [blogEditName, setBlogEditName] =
        useState("");


    // ========================================================
    // COMMON STATES
    // ========================================================

    const [loading, setLoading] =
        useState(false);

    const [pageLoading, setPageLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ========================================================
    // INITIAL LOAD
    // ========================================================

    useEffect(() => {

        let cancelled = false;

        const fetchCategories = async () => {

            try {

                const [
                    productCategories,
                    blogCategoriesData,
                ] = await Promise.all([
                    getCategories(),
                    getBlogCategories(),
                ]);

                if (cancelled) {
                    return;
                }

                setCategories(
                    productCategories
                );

                setBlogCategories(
                    blogCategoriesData
                );

            } catch (error: unknown) {

                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load categories:",
                    error
                );

                if (axios.isAxiosError(error)) {

                    console.error(
                        "Backend response:",
                        error.response?.data
                    );

                }

                setError(
                    "Failed to load categories."
                );

            } finally {

                if (!cancelled) {
                    setPageLoading(false);
                }

            }

        };

        fetchCategories();

        return () => {
            cancelled = true;
        };

    }, []);


    // ========================================================
    // PRODUCT CATEGORY - CREATE
    // ========================================================

    const handleCreate = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const categoryName =
            name.trim();

        if (!categoryName) {

            setError(
                "Product category name is required."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            const newCategory =
                await createCategory(
                    categoryName
                );

            setCategories((previous) => [

                newCategory,

                ...previous,

            ]);

            setName("");

        } catch (error: unknown) {

            console.error(
                "Create product category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                setError(
                    error.response?.data?.name?.[0] ||
                    "Failed to create product category."
                );

            } else {

                setError(
                    "Failed to create product category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // BLOG CATEGORY - CREATE
    // ========================================================

    const handleCreateBlogCategory = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {

        event.preventDefault();

        const categoryName =
            blogCategoryName.trim();

        if (!categoryName) {

            setError(
                "Blog category name is required."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            const newCategory =
                await createBlogCategory(
                    categoryName
                );

            setBlogCategories((previous) => [

                newCategory,

                ...previous,

            ]);

            setBlogCategoryName("");

        } catch (error: unknown) {

            console.error(
                "Create blog category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                setError(
                    error.response?.data?.name?.[0] ||
                    "Failed to create blog category."
                );

            } else {

                setError(
                    "Failed to create blog category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // PRODUCT CATEGORY - EDIT
    // ========================================================

    const handleEdit = (
        category: Category
    ) => {

        setEditId(category.id);

        setEditName(category.name);

        setError("");

    };


    // ========================================================
    // PRODUCT CATEGORY - CANCEL EDIT
    // ========================================================

    const handleCancelEdit = () => {

        setEditId(null);

        setEditName("");

    };


    // ========================================================
    // PRODUCT CATEGORY - UPDATE
    // ========================================================

    const handleUpdate = async (
        id: number
    ) => {

        const categoryName =
            editName.trim();

        if (!categoryName) {

            setError(
                "Product category name is required."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            const updatedCategory =
                await updateCategory(
                    id,
                    categoryName
                );

            setCategories((previous) =>

                previous.map(
                    (category) =>
                        category.id === id
                            ? updatedCategory
                            : category
                )

            );

            handleCancelEdit();

        } catch (error: unknown) {

            console.error(
                "Update product category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                setError(
                    error.response?.data?.name?.[0] ||
                    "Failed to update product category."
                );

            } else {

                setError(
                    "Failed to update product category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // BLOG CATEGORY - EDIT
    // ========================================================

    const handleBlogEdit = (
        category: BlogCategory
    ) => {

        setBlogEditId(category.id);

        setBlogEditName(category.name);

        setError("");

    };


    // ========================================================
    // BLOG CATEGORY - CANCEL EDIT
    // ========================================================

    const handleBlogCancelEdit = () => {

        setBlogEditId(null);

        setBlogEditName("");

    };


    // ========================================================
    // BLOG CATEGORY - UPDATE
    // ========================================================

    const handleBlogUpdate = async (
        id: number
    ) => {

        const categoryName =
            blogEditName.trim();

        if (!categoryName) {

            setError(
                "Blog category name is required."
            );

            return;
        }

        try {

            setLoading(true);
            setError("");

            const updatedCategory =
                await updateBlogCategory(
                    id,
                    categoryName
                );

            setBlogCategories((previous) =>

                previous.map(
                    (category) =>
                        category.id === id
                            ? updatedCategory
                            : category
                )

            );

            handleBlogCancelEdit();

        } catch (error: unknown) {

            console.error(
                "Update blog category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                setError(
                    error.response?.data?.name?.[0] ||
                    "Failed to update blog category."
                );

            } else {

                setError(
                    "Failed to update blog category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // PRODUCT CATEGORY - DELETE
    // ========================================================

    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this product category?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            await deleteCategory(id);

            setCategories((previous) =>

                previous.filter(
                    (category) =>
                        category.id !== id
                )

            );

        } catch (error: unknown) {

            console.error(
                "Delete product category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                setError(
                    error.response?.data?.detail ||
                    "Failed to delete product category."
                );

            } else {

                setError(
                    "Failed to delete product category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // BLOG CATEGORY - DELETE
    // ========================================================

    const handleBlogDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this blog category?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setLoading(true);
            setError("");

            await deleteBlogCategory(id);

            setBlogCategories((previous) =>

                previous.filter(
                    (category) =>
                        category.id !== id
                )

            );

        } catch (error: unknown) {

            console.error(
                "Delete blog category error:",
                error
            );

            if (axios.isAxiosError(error)) {

                setError(
                    error.response?.data?.detail ||
                    "Failed to delete blog category."
                );

            } else {

                setError(
                    "Failed to delete blog category."
                );

            }

        } finally {

            setLoading(false);

        }
    };


    // ========================================================
    // PAGE LOADING
    // ========================================================

    if (pageLoading) {

        return (

            <AdminLayout>

                <div className="admin-page">

                    <div className="category-loading">
                        Loading categories...
                    </div>

                </div>

            </AdminLayout>

        );

    }


    // ========================================================
    // PAGE
    // ========================================================

    return (

        <AdminLayout>

            <div className="admin-page">

                {/* HEADER */}

                <div className="admin-page-header">

                    <div>

                        <h1>
                            Categories
                        </h1>

                        <p>
                            Manage product and blog categories.
                        </p>

                    </div>

                </div>


                {/* ERROR */}

                {error && (

                    <div className="category-error">
                        {error}
                    </div>

                )}


                {/* PRODUCT CATEGORY */}

                <div className="category-card">

                    <div className="category-card-header">

                        <h2>
                            Product Categories
                        </h2>

                        <p>
                            These categories are used for products.
                        </p>

                    </div>


                    {/* CREATE PRODUCT CATEGORY */}

                    <form
                        className="category-create"
                        method="POST"
                        onSubmit={handleCreate}
                    >

                        <input
                            type="text"
                            name="product-category-name"
                            value={name}
                            placeholder="Enter product category name"
                            onChange={(event) =>
                                setName(
                                    event.target.value
                                )
                            }
                            required
                        />


                        <button
                            type="submit"
                            className="category-add-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Product Category"}

                        </button>

                    </form>

                </div>


                {/* PRODUCT CATEGORY LIST */}

                <div className="category-card">

                    <div className="category-card-header">

                        <h2>
                            All Product Categories
                        </h2>

                        <p>
                            Total Product Categories:{" "}
                            {categories.length}
                        </p>

                    </div>


                    {categories.length === 0 ? (

                        <div className="category-empty">

                            <h3>
                                No Product Categories
                            </h3>

                            <p>
                                Create your first product category above.
                            </p>

                        </div>

                    ) : (

                        <div className="category-table-wrapper">

                            <table className="category-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>
                                            Category Name
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {categories.map(
                                        (category) => (

                                            <tr
                                                key={category.id}
                                            >

                                                <td>
                                                    #{category.id}
                                                </td>


                                                <td>

                                                    {editId ===
                                                    category.id ? (

                                                        <input
                                                            className="category-edit-input"
                                                            type="text"
                                                            value={editName}
                                                            onChange={(event) =>
                                                                setEditName(
                                                                    event.target.value
                                                                )
                                                            }
                                                            autoFocus
                                                        />

                                                    ) : (

                                                        <span className="category-name">
                                                            {category.name}
                                                        </span>

                                                    )}

                                                </td>


                                                <td>

                                                    {editId ===
                                                    category.id ? (

                                                        <div className="category-actions">

                                                            <button
                                                                type="button"
                                                                className="save-btn"
                                                                onClick={() =>
                                                                    handleUpdate(
                                                                        category.id
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Save
                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="cancel-btn"
                                                                onClick={
                                                                    handleCancelEdit
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Cancel
                                                            </button>

                                                        </div>

                                                    ) : (

                                                        <div className="category-actions">

                                                            <button
                                                                type="button"
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        category
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Edit
                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        category.id
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* BLOG CATEGORY */}

                <div className="category-card">

                    <div className="category-card-header">

                        <h2>
                            Blog Categories
                        </h2>

                        <p>
                            These categories are used for blog posts.
                        </p>

                    </div>


                    {/* CREATE BLOG CATEGORY */}

                    <form
                        className="category-create"
                        method="POST"
                        onSubmit={handleCreateBlogCategory}
                    >

                        <input
                            type="text"
                            name="blog-category-name"
                            value={blogCategoryName}
                            placeholder="Enter blog category name"
                            onChange={(event) =>
                                setBlogCategoryName(
                                    event.target.value
                                )
                            }
                            required
                        />


                        <button
                            type="submit"
                            className="category-add-btn"
                            disabled={loading}
                        >

                            {loading
                                ? "Adding..."
                                : "Add Blog Category"}

                        </button>

                    </form>

                </div>


                {/* BLOG CATEGORY LIST */}

                <div className="category-card">

                    <div className="category-card-header">

                        <h2>
                            All Blog Categories
                        </h2>

                        <p>
                            Total Blog Categories:{" "}
                            {blogCategories.length}
                        </p>

                    </div>


                    {blogCategories.length === 0 ? (

                        <div className="category-empty">

                            <h3>
                                No Blog Categories
                            </h3>

                            <p>
                                Create your first blog category above.
                            </p>

                        </div>

                    ) : (

                        <div className="category-table-wrapper">

                            <table className="category-table">

                                <thead>

                                    <tr>

                                        <th>ID</th>

                                        <th>
                                            Blog Category Name
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {blogCategories.map(
                                        (category) => (

                                            <tr
                                                key={category.id}
                                            >

                                                <td>
                                                    #{category.id}
                                                </td>


                                                <td>

                                                    {blogEditId ===
                                                    category.id ? (

                                                        <input
                                                            className="category-edit-input"
                                                            type="text"
                                                            value={blogEditName}
                                                            onChange={(event) =>
                                                                setBlogEditName(
                                                                    event.target.value
                                                                )
                                                            }
                                                            autoFocus
                                                        />

                                                    ) : (

                                                        <span className="category-name">
                                                            {category.name}
                                                        </span>

                                                    )}

                                                </td>


                                                <td>

                                                    {blogEditId ===
                                                    category.id ? (

                                                        <div className="category-actions">

                                                            <button
                                                                type="button"
                                                                className="save-btn"
                                                                onClick={() =>
                                                                    handleBlogUpdate(
                                                                        category.id
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Save
                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="cancel-btn"
                                                                onClick={
                                                                    handleBlogCancelEdit
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Cancel
                                                            </button>

                                                        </div>

                                                    ) : (

                                                        <div className="category-actions">

                                                            <button
                                                                type="button"
                                                                className="edit-btn"
                                                                onClick={() =>
                                                                    handleBlogEdit(
                                                                        category
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Edit
                                                            </button>


                                                            <button
                                                                type="button"
                                                                className="delete-btn"
                                                                onClick={() =>
                                                                    handleBlogDelete(
                                                                        category.id
                                                                    )
                                                                }
                                                                disabled={loading}
                                                            >
                                                                Delete
                                                            </button>

                                                        </div>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </AdminLayout>

    );

};


export default AdminCategories;