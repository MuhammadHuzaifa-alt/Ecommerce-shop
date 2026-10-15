import "./footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Company */}
        <div className="footer-column">
          <h2 className="footer-logo">
            Shop<span>Hub</span>
          </h2>

          <p>
            ShopHub is your trusted online marketplace offering quality
            products, secure payments, and fast delivery at affordable prices.
          </p>

          <div className="footer-social">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contact">Contact</Link>
        </div>

        {/* Customer */}
        <div className="footer-column">
          <h3>Customer Service</h3>

          <Link to="/cart">Cart</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">My Account</Link>
          <Link to="/faq">FAQs</Link>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h3>Contact</h3>

          <p>
            <FaMapMarkerAlt />
            Karachi, Pakistan
          </p>

          <p>
            <FaPhoneAlt />
            +92 300 1234567
          </p>

          <p>
            <FaEnvelope />
            support@shophub.com
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {year} ShopHub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;