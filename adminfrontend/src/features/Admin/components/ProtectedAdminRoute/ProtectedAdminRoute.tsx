import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";


// ==========================================================
// ADMIN AUTH STORAGE
// ==========================================================

const clearAdminAuthentication = () => {
  localStorage.removeItem("adminUser");
  localStorage.removeItem("adminAccess");
  localStorage.removeItem("adminRefresh");

  sessionStorage.removeItem("adminUser");
  sessionStorage.removeItem("adminAccess");
  sessionStorage.removeItem("adminRefresh");
};

const ProtectedAdminRoute = () => {
  const location = useLocation();

  const adminAccess =
    localStorage.getItem("adminAccess") ||
    sessionStorage.getItem("adminAccess");

  const adminUser =
    localStorage.getItem("adminUser") ||
    sessionStorage.getItem("adminUser");

  console.log("ADMIN PROTECTION CHECK:", {
    adminAccess,
    adminUser,
  });

  if (!adminAccess || !adminUser) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  let isValidAdmin = false;

  try {
    const user: unknown = JSON.parse(adminUser);

    if (
      typeof user === "object" &&
      user !== null &&
      "role" in user &&
      user.role === "admin"
    ) {
      isValidAdmin = true;
    }
  } catch (error: unknown) {
    console.error(
      "Invalid admin authentication data:",
      error
    );

    isValidAdmin = false;
  }

  if (!isValidAdmin) {
    clearAdminAuthentication();

    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
};


export default ProtectedAdminRoute;