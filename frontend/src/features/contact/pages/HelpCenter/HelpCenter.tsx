import "./HelpCenter.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import ContactHero from "../../components/ContactHero/ContactHero";
import ContactSupport from "../../components/ContactSupport/ContactSupport";
import FAQ from "../../components/FAQ/FAQ";

const HelpCenter = () => {
  return (
    <>
      <Navbar />

      <main className="help-center">

        <section className="help-intro">

          <div className="container">

            <span className="section-tag">
              Help Center
            </span>

            <h2>Find Answers Quickly</h2>

            <p>
              Browse our support articles, explore common topics,
              and get the help you need in just a few clicks.
            </p>

          </div>

        </section>

        <ContactHero />

        <ContactSupport />

        <section className="popular-topics">

          <div className="container">

            <h2>Popular Help Topics</h2>

            <div className="topics-grid">

              <div className="topic-card">
                <h3>Order Tracking</h3>
                <p>
                  Learn how to track your order and view delivery updates.
                </p>
              </div>

              <div className="topic-card">
                <h3>Shipping</h3>
                <p>
                  Delivery options, shipping costs, and estimated times.
                </p>
              </div>

              <div className="topic-card">
                <h3>Returns</h3>
                <p>
                  Start a return, exchange an item, or request a refund.
                </p>
              </div>

              <div className="topic-card">
                <h3>Payments</h3>
                <p>
                  Payment methods, billing issues, and failed transactions.
                </p>
              </div>

            </div>

          </div>

        </section>

        <FAQ />

      </main>

      <Footer />
    </>
  );
};

export default HelpCenter;