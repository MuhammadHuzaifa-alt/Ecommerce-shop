import "./Payment.css";

import type { ReactNode } from "react";

import {
  FaCreditCard,
  FaLock,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaUndoAlt,
  FaShieldAlt,
} from "react-icons/fa";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import PageHero from "../../components/PageHero/PageHero";
import SupportProcess from "../../components/SupportProcess/SupportProcess";
import ContactCTA from "../../components/ContactCTA/ContactCTA";
import FAQ from "../../components/FAQ/FAQ";

interface PaymentService {
  icon: ReactNode;
  title: string;
  description: string;
}

const paymentServices: PaymentService[] = [
  {
    icon: <FaCreditCard />,
    title: "Payment Methods",
    description:
      "Pay securely using credit cards, debit cards, PayPal, bank transfer, and digital wallets.",
  },
  {
    icon: <FaLock />,
    title: "Secure Checkout",
    description:
      "All payments are protected with SSL encryption and trusted payment gateways.",
  },
  {
    icon: <FaMoneyCheckAlt />,
    title: "Failed Payments",
    description:
      "Learn why a payment may fail and how to successfully complete your purchase.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "Invoices",
    description:
      "Download invoices and payment receipts from your account anytime.",
  },
  {
    icon: <FaUndoAlt />,
    title: "Refund Payments",
    description:
      "Understand the refund process, timelines, and eligible payment methods.",
  },
  {
    icon: <FaShieldAlt />,
    title: "Payment Security",
    description:
      "Your payment information is encrypted and never shared with third parties.",
  },
];

const Payment = () => {
  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: "Contact", path: "/contact" },
          { label: "Payment" },
        ]}
      />

      <main className="payment-page">
        <PageHero
          badge="Payment Support"
          title="Payments & Billing"
          description="Everything you need to know about payments, invoices, billing, refunds, and secure transactions."
          primaryButtonText="Payment FAQ"
          primaryButtonLink="/contact/payment"
          secondaryButtonText="Customer Care"
          secondaryButtonLink="/contact/customer-care"
        />

        <section className="payment-services">
          <div className="container">
            <header className="section-heading">
              <h2>Payment Services</h2>

              <p>
                Learn about payment options, security, billing, and refunds.
              </p>
            </header>

            <div className="payment-grid">
              {paymentServices.map((service) => (
                <article
                  className="payment-card"
                  key={service.title}
                >
                  <div
                    className="payment-icon"
                    aria-hidden="true"
                  >
                    {service.icon}
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>
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

export default Payment;