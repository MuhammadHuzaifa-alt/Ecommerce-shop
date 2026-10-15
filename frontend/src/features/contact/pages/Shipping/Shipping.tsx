import "./Shipping.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import SupportProcess from "../../components/SupportProcess/SupportProcess";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import FAQ from "../../components/FAQ/FAQ";

import {
  FaShippingFast,
  FaMapMarkedAlt,
  FaGlobe,
  FaBox,
  FaTruck,
  FaClock,
} from "react-icons/fa";

const shippingServices = [
  {
    icon: <FaShippingFast />,
    title: "Express Delivery",
    description:
      "Get your orders delivered quickly with our express shipping service.",
  },
  {
    icon: <FaTruck />,
    title: "Standard Shipping",
    description:
      "Affordable shipping with reliable nationwide delivery.",
  },
  {
    icon: <FaGlobe />,
    title: "International Shipping",
    description:
      "We ship to multiple countries with trusted courier partners.",
  },
  {
    icon: <FaMapMarkedAlt />,
    title: "Track Shipment",
    description:
      "Track your package anytime using your tracking number.",
  },
  {
    icon: <FaClock />,
    title: "Delivery Times",
    description:
      "Estimated delivery based on your location and shipping method.",
  },
  {
    icon: <FaBox />,
    title: "Shipping Policy",
    description:
      "Learn about shipping charges, packaging, and delivery guidelines.",
  },
];

const Shipping = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
          { label: "Shipping & Delivery" },
        ]}
      />

      <PageHero
        badge="Shipping Support"
        title="Shipping & Delivery"
        description="Everything you need to know about shipping, delivery times, tracking, and international orders."
        primaryButtonText="Track Shipment"
        primaryButtonLink="/contact/orders"
        secondaryButtonText="Customer Care"
        secondaryButtonLink="/contact/customer-care"
      />

      <section className="shipping-services">
        <div className="container">

          <div className="section-heading">
            <h2>Shipping Services</h2>
            <p>
              Explore our shipping options and delivery information.
            </p>
          </div>

          <div className="shipping-grid">
            {shippingServices.map((item) => (
              <div className="shipping-card" key={item.title}>

                <div className="shipping-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

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

export default Shipping;