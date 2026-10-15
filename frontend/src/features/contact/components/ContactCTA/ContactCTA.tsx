import "./ContactCTA.css";
import { Link } from "react-router-dom";
import { FaArrowRight, FaHeadset } from "react-icons/fa";

const ContactCTA = () => {
  return (
    <section className="contact-cta">

      <div className="contact-cta-container">

        <div className="contact-cta-content">

          <span className="contact-cta-badge">
            24/7 Customer Support
          </span>

          <h2>
            Still Need Help?
          </h2>

          <p>
            Our customer support team is always ready to help you with
            orders, payments, shipping, returns, and any other questions.
          </p>

        </div>

        <div className="contact-cta-buttons">

          <Link
            to="/contact/customer-care"
            className="cta-btn primary"
          >
            <FaHeadset />
            Contact Support
          </Link>

          <Link
            to="/contact/help-center"
            className="cta-btn secondary"
          >
            Browse Help Center
            <FaArrowRight />
          </Link>

        </div>

      </div>

    </section>
  );
};

export default ContactCTA;