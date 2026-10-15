import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
} from "react-router-dom";

import AdminLogin from "../features/Admin/pages/AdminLogin";
import AdminDashboard from "../features/Admin/pages/AdminDashboard";
import AdminProducts from "../features/Admin/pages/AdminProducts";
import AddProduct from "../features/Admin/pages/AddProduct";
import EditProduct from "../features/Admin/pages/EditProduct";

import AddBlog from "../features/Admin/Blog/pages/AddBlog";
import AdminBlogs from "../features/Admin/Blog/pages/AdminBlogs";
import EditBlog from "../features/Admin/Blog/pages/EditBlog";

import AdminCategories from "../features/Admin/Categories/pages/AdminCategories";

import AdminOrders from "../features/Admin/Orders/pages/AdminOrders";

import ProtectedAdminRoute from "../features/Admin/components/ProtectedAdminRoute/ProtectedAdminRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =====================================
            PUBLIC ADMIN LOGIN
        ===================================== */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />


        {/* =====================================
            DEFAULT ROUTE
        ===================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/admin/login"
              replace
            />
          }
        />


        {/* =====================================
            PROTECTED ADMIN ROUTES
        ===================================== */}

        <Route element={<ProtectedAdminRoute />}>

          {/* Dashboard */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />

          {/* Products */}
          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />

          <Route
            path="/admin/products/add"
            element={<AddProduct />}
          />

          <Route
            path="/admin/products/edit/:id"
            element={<EditProduct />}
          />

          {/* Blogs */}
          <Route
            path="/admin/blog"
            element={<AdminBlogs />}
          />

          <Route
            path="/admin/blogs/add"
            element={<AddBlog />}
          />

          <Route
            path="/admin/blogs/edit/:id"
            element={<EditBlog />}
          />

          {/* Categories */}
          <Route
            path="/admin/categories"
            element={<AdminCategories />}
          />

          {/* Orders */}
          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}