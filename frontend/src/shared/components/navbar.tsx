import "./navbar.css";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useState } from "react";

import ProfileDropdown from "../../features/user/components/ProfileDropdown/ProfileDropdown";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="logo">
          Shop<span>Hub</span>
        </Link>

        {/* Search */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
          />
          <button>
            <FaSearch />
          </button>
        </div>

        {/* Navigation */}
        <nav className={menuOpen ? "nav-menu active" : "nav-menu"}>
          <Link to="/products">Sell on Ecommerce</Link>

          <Link to="/blog">Blog</Link>

          {/* Contact Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <Link to="/contact" className="dropdown-title">
              Contact
            </Link>

            {contactOpen && (
              <div className="dropdown-menu">
                <Link to="/contact/help-center">
                  Help Center
                </Link>

                <Link to="/contact/customer-care">
                  Contact Customer Care
                </Link>

                <Link to="/contact/orders">
                  Order
                </Link>

                <Link to="/contact/shipping">
                  Shipping & Delivery
                </Link>

                <Link to="/contact/payment">
                  Payment
                </Link>

                <Link to="/contact/returns-refunds">
                  Returns & Refunds
                </Link>
              </div>
            )}
          </div>

          {user ? (
            <ProfileDropdown />
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
            </>
          )}
        </nav>

        {/* Icons */}
        <div className="nav-icons">
          <Link to="/wishlist" className="icon">
            <FaHeart />
            <span></span>
          </Link>

          <Link to="/cart" className="icon">
            <FaShoppingCart />
            <span>5</span>
          </Link>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;