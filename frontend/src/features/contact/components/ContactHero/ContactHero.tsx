import "./ContactHero.css";
import { FaSearch } from "react-icons/fa";

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero-overlay">

        <div className="contact-hero-content">

          <span className="contact-tag">
            Customer Support
          </span>

          <h1>
            How can we help you today?
          </h1>

          <p>
            Search our help center, find answers to common questions,
            or contact our customer support team for personalized
            assistance.
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search help articles..."
            />

            <button>
              <FaSearch />
            </button>

          </div>

          <div className="hero-links">

            <span>Popular:</span>

            <a href="#">Order Status</a>

            <a href="#">Returns</a>

            <a href="#">Shipping</a>

            <a href="#">Payments</a>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactHero;