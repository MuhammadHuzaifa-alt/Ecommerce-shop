import "./ReturnsRefunds.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import SupportProcess from "../../components/SupportProcess/SupportProcess";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import FAQ from "../../components/FAQ/FAQ";

import {
  FaUndoAlt,
  FaExchangeAlt,
  FaBoxOpen,
  FaMoneyBillWave,
  FaClipboardCheck,
  FaCheckCircle,
} from "react-icons/fa";

const returnServices = [
  {
    icon: <FaUndoAlt />,
    title: "Return Request",
    description:
      "Submit a return request quickly through your account or contact customer support.",
  },
  {
    icon: <FaExchangeAlt />,
    title: "Product Exchange",
    description:
      "Exchange eligible products for another size, color, or replacement.",
  },
  {
    icon: <FaBoxOpen />,
    title: "Return Conditions",
    description:
      "Products must be unused, undamaged, and returned in their original packaging.",
  },
  {
    icon: <FaMoneyBillWave />,
    title: "Refund Process",
    description:
      "Refunds are processed after the returned item has been inspected and approved.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Return Status",
    description:
      "Track the progress of your return and refund request in your account.",
  },
  {
    icon: <FaCheckCircle />,
    title: "Refund Timeline",
    description:
      "Approved refunds are usually completed within 5–10 business days.",
  },
];

const ReturnsRefunds = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
          { label: "Returns & Refunds" },
        ]}
      />

      <PageHero
        badge="Returns & Refunds"
        title="Returns & Refund Policy"
        description="Everything you need to know about returns, exchanges, refunds, and return eligibility."
        primaryButtonText="Start a Return"
        primaryButtonLink="/contact/returns"
        secondaryButtonText="Customer Care"
        secondaryButtonLink="/contact/customer-care"
      />

      <section className="returns-services">

        <div className="container">

          <div className="section-heading">
            <h2>Returns & Refund Services</h2>

            <p>
              Learn how to return products, request exchanges, and receive refunds.
            </p>
          </div>

          <div className="returns-grid">

            {returnServices.map((service) => (
              <div
                className="returns-card"
                key={service.title}
              >
                <div className="returns-icon">
                  {service.icon}
                </div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>
              </div>
            ))}

          </div>

        </div>

      </section>

      <SupportProcess />

      <FAQ />

      <ContactCTA />

      <Footer />
    </>
  );
};

export default ReturnsRefunds;