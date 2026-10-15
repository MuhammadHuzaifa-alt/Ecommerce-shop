import {
  FaTruck,
  FaShippingFast,
  FaBoxOpen,
} from "react-icons/fa";

import "./DeliveryMethod.css";

import type {
  DeliveryOption,
} from "../../types/checkout.types";


interface DeliveryMethodProps {
  selectedId: number;

  onSelect: (
    option: DeliveryOption
  ) => void;
}


const DELIVERY_OPTIONS: DeliveryOption[] = [
  {
    id: 1,
    name: "Standard Delivery",
    description: "Affordable shipping",
    estimatedDays: "3–5 Business Days",
    fee: 5,
    icon: <FaTruck />,
  },
  {
    id: 2,
    name: "Express Delivery",
    description: "Fast delivery",
    estimatedDays: "1–2 Business Days",
    fee: 15,
    icon: <FaShippingFast />,
  },
  {
    id: 3,
    name: "Same Day Delivery",
    description: "Available in selected cities",
    estimatedDays: "Today",
    fee: 25,
    icon: <FaBoxOpen />,
  },
];


const DeliveryMethod = ({
  selectedId,
  onSelect,
}: DeliveryMethodProps) => {

  return (
    <section className="delivery-method">

      <h2>
        Delivery Method
      </h2>

      <div
        className="delivery-options"
        role="radiogroup"
        aria-label="Delivery method"
      >

        {DELIVERY_OPTIONS.map(
          (option) => {

            const selected =
              selectedId === option.id;

            return (
              <label
                key={option.id}
                className={
                  selected
                    ? "delivery-card active"
                    : "delivery-card"
                }
              >

                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selected}
                  onChange={() =>
                    onSelect(option)
                  }
                />

                <div className="delivery-icon">
                  {option.icon}
                </div>

                <div className="delivery-content">

                  <h3>
                    {option.name}
                  </h3>

                  <p>
                    {option.description}
                  </p>

                  <span>
                    {option.estimatedDays}
                  </span>

                </div>

                <strong className="delivery-price">
                  ${option.fee.toFixed(2)}
                </strong>

              </label>
            );
          }
        )}

      </div>

    </section>
  );
};


export default DeliveryMethod;