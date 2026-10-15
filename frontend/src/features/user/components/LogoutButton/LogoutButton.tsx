import "./LogoutButton.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login");
  };

  return (
    <button
      className="logout-btn"
      onClick={handleLogout}
    >
      <FaSignOutAlt />

      Logout
    </button>
  );
};

export default LogoutButton;