import "./CheckoutHeader.css";
import { FaCreditCard } from "react-icons/fa";

const CheckoutHeader = () => {
  return (
    <section className="checkout-header">

      <div className="checkout-header-container">

        <div className="checkout-icon">
          <FaCreditCard />
        </div>

        <div className="checkout-content">

          <h1>Secure Checkout</h1>

          <p>
            Complete your order by providing your shipping details
            and selecting your preferred payment method.
          </p>

        </div>

      </div>

    </section>
  );
};

export default CheckoutHeader;