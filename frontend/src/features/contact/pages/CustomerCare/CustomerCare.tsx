import "./CustomerCare.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import ContactForm from "../../components/ContactForm/ContactForm";
import SupportProcess from "../../components/SupportProcess/SupportProcess";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import FAQ from "../../components/FAQ/FAQ";

const CustomerCare = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/products" },
          { label: "Contact", path: "/contact" },
          { label: "Customer Care" },
        ]}
      />

      <PageHero
        badge="24/7 Customer Support"
        title="Customer Care"
        description="Our support specialists are here to help with orders, payments, shipping, returns, account issues, and anything else you need."
        primaryButtonText="Send Message"
        primaryButtonLink="/contact"
        secondaryButtonText="Help Center"
        secondaryButtonLink="/contact/help-center"
      />

      <section className="customer-services">
        <div className="container">

          <div className="service-heading">
            <h2>Ways to Contact Us</h2>

            <p>
              Choose the support channel that's most convenient for you.
            </p>
          </div>

          <div className="service-grid">

            <div className="service-card">
              <h3>📞 Phone Support</h3>
              <p>Available Monday–Saturday</p>
              <span>+92 300 1234567</span>
            </div>

            <div className="service-card">
              <h3>✉ Email Support</h3>
              <p>Average response within 24 hours</p>
              <span>support@shophub.com</span>
            </div>

            <div className="service-card">
              <h3>💬 Live Chat</h3>
              <p>Available 24/7</p>
              <span>Instant Assistance</span>
            </div>

            <div className="service-card">
              <h3>🕒 Business Hours</h3>
              <p>Monday - Friday</p>
              <span>09:00 AM - 06:00 PM</span>
            </div>

          </div>

        </div>
      </section>

      <SupportProcess />

      <ContactForm />

      <FAQ />

      <ContactCTA />

      <Footer />
    </>
  );
};

export default CustomerCare;