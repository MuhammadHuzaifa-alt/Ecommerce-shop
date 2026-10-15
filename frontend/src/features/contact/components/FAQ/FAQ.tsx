import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import "./FAQ.css";

const faqData = [
  {
    question: "How can I track my order?",
    answer:
      "After your order is shipped, you will receive a tracking number via email. You can also view your order status from your account dashboard.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping usually takes 3–7 business days. Delivery times may vary depending on your location.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes. You can request a return or exchange within 30 days of receiving your order, provided the product is unused and in its original packaging.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept Visa, MasterCard, PayPal, Stripe, Apple Pay, Google Pay, and Cash on Delivery (where available).",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can use the contact form on this page, send us an email, or call our customer support hotline during business hours.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq">
      <div className="faq-container">

        <div className="faq-heading">
          <span>Frequently Asked Questions</span>
          <h2>Need Answers?</h2>
          <p>
            Here are the questions our customers ask most often.
          </p>
        </div>

        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{item.question}</span>

                {activeIndex === index ? (
                  <FaChevronUp />
                ) : (
                  <FaChevronDown />
                )}
              </button>

              <div
                className={`faq-answer ${
                  activeIndex === index ? "show" : ""
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;