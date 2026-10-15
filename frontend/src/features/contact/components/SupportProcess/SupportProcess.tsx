import "./SupportProcess.css";
import {
  FaRegEdit,
  FaSearch,
  FaHeadset,
  FaCheckCircle,
} from "react-icons/fa";

const process = [
  {
    id: "01",
    title: "Submit Request",
    description:
      "Complete the contact form or start a live chat with our support team.",
    icon: FaRegEdit,
  },
  {
    id: "02",
    title: "Review Request",
    description:
      "Our specialists review your request and identify the best solution.",
    icon: FaSearch,
  },
  {
    id: "03",
    title: "Support Response",
    description:
      "We contact you by email or phone with updates and assistance.",
    icon: FaHeadset,
  },
  {
    id: "04",
    title: "Problem Solved",
    description:
      "Your issue is resolved and we ensure you're satisfied with the outcome.",
    icon: FaCheckCircle,
  },
];

const SupportProcess = () => {
  return (
    <section className="support-process">

      <div className="support-process-container">

        <div className="process-header">

          <span>How It Works</span>

          <h2>Our Support Process</h2>

          <p>
            We make it simple to get help. From your first message
            to the final solution, our team is here to support you.
          </p>

        </div>

        <div className="process-grid">

          {process.map((step) => {
            const Icon = step.icon;

            return (
              <div
                className="process-card"
                key={step.id}
              >
                <div className="process-number">
                  {step.id}
                </div>

                <div className="process-icon">
                  <Icon />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            );
          })}

        </div>

      </div>

    </section>
  );
};

export default SupportProcess;