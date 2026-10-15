import "./Contact.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import ContactSupport from "../../components/ContactSupport/ContactSupport";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactInfo from "../../components/ContactInfo/ContactInfo";
import FAQ from "../../components/FAQ/FAQ";
import ContactCTA from "../../components/ContactCTA/ContactCTA";

const Contact = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contact" },
        ]}
      />

      <main className="contact-page">
        <PageHero
          badge="Contact Support"
          title="We're Here to Help"
          description="Need assistance with your order, shipping, payments, returns, or your account? Our support team is ready to help you every step of the way."
          primaryButtonText="Customer Care"
          primaryButtonLink="/contact/customer-care"
          secondaryButtonText="Help Center"
          secondaryButtonLink="/contact/help-center"
        />

        <ContactSupport />

        <ContactForm />

        <ContactInfo />

        <FAQ />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
};

export default Contact;