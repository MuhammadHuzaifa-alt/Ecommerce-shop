import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminHeader from "../components/AdminHeader";

import "../styles/AdminLayouts.css";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminAccess");
    localStorage.removeItem("adminUser");

    sessionStorage.removeItem("adminAccess");
    sessionStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">

      <AdminSidebar
        onLogout={handleLogout}
      />

      <div className="admin-content">

        <AdminHeader />

        <main className="admin-main">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;