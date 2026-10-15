import {
  FaMoneyBillWave,
  FaCreditCard,
  FaUniversity,
  FaPaypal,
} from "react-icons/fa";

import "./PaymentMethod.css";

import type {
  PaymentOption,
} from "../../types/checkout.types";


interface PaymentMethodProps {
  selectedId: number;

  onSelect: (
    payment: PaymentOption
  ) => void;
}


const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 1,
    name: "Cash on Delivery",
    description:
      "Pay when your order is delivered",
    icon: <FaMoneyBillWave />,
  },
  {
    id: 2,
    name: "Credit Card",
    description:
      "Visa, Mastercard & American Express",
    icon: <FaCreditCard />,
  },
  {
    id: 3,
    name: "Debit Card",
    description:
      "Pay directly from your bank account",
    icon: <FaUniversity />,
  },
  {
    id: 4,
    name: "PayPal",
    description:
      "Secure online payment",
    icon: <FaPaypal />,
  },
];


const PaymentMethod = ({
  selectedId,
  onSelect,
}: PaymentMethodProps) => {

  return (
    <section className="payment-method">

      <h2>
        Payment Method
      </h2>

      <div
        className="payment-options"
        role="radiogroup"
        aria-label="Payment method"
      >

        {PAYMENT_OPTIONS.map(
          (option) => {

            const selected =
              selectedId === option.id;

            return (
              <label
                key={option.id}
                className={
                  selected
                    ? "payment-card active"
                    : "payment-card"
                }
              >

                <input
                  type="radio"
                  name="payment"
                  value={option.id}
                  checked={selected}
                  onChange={() =>
                    onSelect(option)
                  }
                />

                <div className="payment-icon">
                  {option.icon}
                </div>

                <div className="payment-content">

                  <h3>
                    {option.name}
                  </h3>

                  <p>
                    {option.description}
                  </p>

                </div>

              </label>
            );
          }
        )}

      </div>

    </section>
  );
};


export default PaymentMethod;