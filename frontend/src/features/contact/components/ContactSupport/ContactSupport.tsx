import "./ContactSupport.css";
import {
  FaHeadset,
  FaBoxOpen,
  FaTruck,
  FaCreditCard,
  FaUndoAlt,
  FaQuestionCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const supportItems = [
  {
    title: "Help Center",
    description: "Browse FAQs and support articles.",
    icon: <FaQuestionCircle />,
    link: "/contact/help-center",
  },
  {
    title: "Customer Care",
    description: "Talk to our customer support team.",
    icon: <FaHeadset />,
    link: "/contact/customer-care",
  },
  {
    title: "Orders",
    description: "Track and manage your orders.",
    icon: <FaBoxOpen />,
    link: "/contact/orders",
  },
  {
    title: "Shipping & Delivery",
    description: "Delivery times and shipping information.",
    icon: <FaTruck />,
    link: "/contact/shipping",
  },
  {
    title: "Payment",
    description: "Payment methods and billing support.",
    icon: <FaCreditCard />,
    link: "/contact/payment",
  },
  {
    title: "Returns & Refunds",
    description: "Start a return or request a refund.",
    icon: <FaUndoAlt />,
    link: "/contact/returns-refunds",
  },
];

const ContactSupport = () => {
  return (
    <section className="contact-support">
      <div className="support-container">

        <div className="support-heading">
          <h2>Support Categories</h2>
          <p>
            Choose the category that best matches your question.
          </p>
        </div>

        <div className="support-grid">
          {supportItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="support-card"
            >
              <div className="support-icon">
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ContactSupport;