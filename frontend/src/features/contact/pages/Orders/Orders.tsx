import "./Orders.css";

import {
  FaBoxOpen,
  FaTimesCircle,
  FaEdit,
  FaHistory,
  FaTruck,
} from "react-icons/fa";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import SupportProcess from "../../components/SupportProcess/SupportProcess";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import FAQ from "../../components/FAQ/FAQ";

interface OrderService {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const orderServices: OrderService[] = [
  {
    icon: <FaBoxOpen />,
    title: "Track Order",
    text: "Track your package in real time from dispatch to delivery.",
  },
  {
    icon: <FaTimesCircle />,
    title: "Cancel Order",
    text: "Cancel eligible orders before they are shipped.",
  },
  {
    icon: <FaEdit />,
    title: "Modify Order",
    text: "Update shipping details or quantities before processing.",
  },
  {
    icon: <FaHistory />,
    title: "Order History",
    text: "View your previous purchases and invoices.",
  },
  {
    icon: <FaTruck />,
    title: "Delivery Status",
    text: "Check the latest shipping and delivery updates.",
  },
];

const Orders = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
          { label: "Orders" },
        ]}
      />

      <main className="orders-page">
        <PageHero
          badge="Order Support"
          title="Manage Your Orders"
          description="Track, modify, cancel, and monitor your orders with ease."
          primaryButtonText="Track Order"
          primaryButtonLink="/orders"
          secondaryButtonText="Customer Care"
          secondaryButtonLink="/contact/customer-care"
        />

        <section className="orders-services">
          <div className="container">
            <header className="section-heading">
              <h2>Order Services</h2>

              <p>
                Everything you need to manage your orders in one place.
              </p>
            </header>

            <div className="orders-grid">
              {orderServices.map((service) => (
                <article
                  className="order-card"
                  key={service.title}
                >
                  <div className="order-icon" aria-hidden="true">
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <SupportProcess />

        <FAQ />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
};

export default Orders;