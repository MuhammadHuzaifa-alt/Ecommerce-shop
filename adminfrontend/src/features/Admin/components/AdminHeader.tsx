import { FaBell, FaUserCircle } from "react-icons/fa";

import "../styles/AdminHeader.css";

const AdminHeader = () => {

  const storedUser =
    localStorage.getItem("adminUser") ||
    sessionStorage.getItem("adminUser");

  const user = storedUser
    ? JSON.parse(storedUser)
    : null;

  return (
    <header className="admin-header">

      <div className="admin-header-left">

        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Manage your ecommerce store
          </p>
        </div>

      </div>


      <div className="admin-header-right">

        <button
          className="admin-notification-button"
          type="button"
        >
          <FaBell />

          <span className="notification-dot" />
        </button>


        <div className="admin-profile">

          <FaUserCircle className="admin-profile-icon" />

          <div className="admin-profile-info">

            <strong>
              {user?.role === "admin"
                ? "Administrator"
                : "Admin"}
            </strong>

            <span>
              {user?.email || "admin@example.com"}
            </span>

          </div>

        </div>

      </div>

    </header>
  );
};

export default AdminHeader;