import { NavLink } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBox,
  FaTags,
  FaShoppingCart,
  FaSignOutAlt,
  FaStore,
  FaNewspaper,
} from "react-icons/fa";

import "../styles/AdminSidebar.css";

interface AdminSidebarProps {
  onLogout: () => void;
}

const AdminSidebar = ({
  onLogout,
}: AdminSidebarProps) => {
  return (
    <aside className="admin-sidebar">

      {/* Brand */}
      <div className="admin-sidebar-brand">

        <div className="admin-sidebar-logo">
          <FaStore />
        </div>

        <div>
          <h2>Store Admin</h2>
          <span>Management Panel</span>
        </div>

      </div>


      {/* Navigation */}
      <nav className="admin-navigation">

        <p className="admin-nav-title">
          MAIN MENU
        </p>


        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>


        {/* Products */}
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <FaBox />
          <span>Products</span>
        </NavLink>


        {/* Categories */}
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <FaTags />
          <span>Categories</span>
        </NavLink>


        {/* Orders */}
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <FaShoppingCart />
          <span>Orders</span>
        </NavLink>


        {/* Blog */}
        <NavLink
          to="/admin/blog"
          className={({ isActive }) =>
            `admin-nav-link ${isActive ? "active" : ""}`
          }
        >
          <FaNewspaper />
          <span>Blog</span>
        </NavLink>

      </nav>


      {/* Bottom */}
      <div className="admin-sidebar-bottom">

        <button
          className="admin-logout-button"
          onClick={onLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default AdminSidebar;