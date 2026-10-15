import "./ProfileDropdown.css";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaUser,
  FaLock,
  FaSignOutAlt,
  FaChevronDown,
  FaFirstOrder,
} from "react-icons/fa";

import { useAuth } from "../../../../hooks/useAuth";

const ProfileDropdown = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleLogout = () => {
    logout();

    setOpen(false);

    navigate("/login");
  };

  const displayName =
    user?.fullname ||
    "My Account";

  return (
    <div
      className="profile-dropdown"
      ref={dropdownRef}
    >

      <button
        className="profile-btn"
        onClick={() => setOpen(!open)}
      >

        <FaUserCircle />

        <span>
          {displayName}
        </span>

        <FaChevronDown
          className={
            open ? "rotate" : ""
          }
        />

      </button>

      {open && (

        <div className="profile-menu">

          <div className="profile-header">

            <FaUserCircle
              className="profile-avatar"
            />

            <h4>
              {displayName}
            </h4>

            <p>
              {user?.email || ""}
            </p>

            {user?.role && (
              <small>
                {user.role}
              </small>
            )}

          </div>

          <Link to="/account">

            <FaUser />

            My Account

          </Link>

          <Link to="/profile">

            <FaLock />

            My Profile

          </Link>

          <Link to="/orders">
          <FaFirstOrder/>
          My Orders
          </Link>
          <button
            onClick={handleLogout}
          >

            <FaSignOutAlt />

      Logout

    </button>

    </div>

  )}

  </div>
  );
};

export default ProfileDropdown;