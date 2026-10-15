import "./CheckoutSteps.css";

import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";

export type CheckoutStep = 1 | 2 | 3 | 4;

interface CheckoutStepItem {
  id: CheckoutStep;
  title: string;
  icon: React.ReactNode;
}

interface CheckoutStepsProps {
  currentStep: CheckoutStep;
}


// ==========================================
// STEPS
// ==========================================

const steps: CheckoutStepItem[] = [
  {
    id: 1,
    title: "Cart",
    icon: <FaShoppingCart />,
  },
  {
    id: 2,
    title: "Checkout",
    icon: <FaMapMarkerAlt />,
  },
  {
    id: 3,
    title: "Payment",
    icon: <FaCreditCard />,
  },
  {
    id: 4,
    title: "Complete",
    icon: <FaCheckCircle />,
  },
];


// ==========================================
// COMPONENT
// ==========================================

const CheckoutSteps = ({
  currentStep,
}: CheckoutStepsProps) => {
  return (
    <nav
      className="checkout-steps"
      aria-label="Checkout progress"
    >
      <ol className="checkout-steps-container">

        {steps.map((step, index) => {

          const isCompleted =
            currentStep > step.id;

          const isActive =
            currentStep === step.id;

          const isLastStep =
            index === steps.length - 1;

          return (
            <li
              key={step.id}
              className="step-wrapper"
            >

              {/* Step */}

              <div
                className={[
                  "step-circle",
                  isCompleted
                    ? "completed"
                    : "",
                  isActive
                    ? "active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={
                  isActive
                    ? "step"
                    : undefined
                }
                aria-label={`${step.title}${
                  isCompleted
                    ? " completed"
                    : isActive
                    ? " current"
                    : ""
                }`}
              >
                {step.icon}
              </div>


              {/* Step title */}

              <span
                className={[
                  "step-title",
                  currentStep >= step.id
                    ? "active-title"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {step.title}
              </span>


              {/* Connector */}

              {!isLastStep && (
                <div
                  className={[
                    "step-line",
                    isCompleted
                      ? "completed-line"
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
              )}

            </li>
          );
        })}

      </ol>
    </nav>
  );
};

export default CheckoutSteps;