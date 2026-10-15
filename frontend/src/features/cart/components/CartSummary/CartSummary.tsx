import "./CartSummary.css";

import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaShoppingBag,
} from "react-icons/fa";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  discount: number;
}

const CartSummary = ({
  subtotal,
  tax,
  discount,
}: CartSummaryProps) => {
  const total = Math.max(
    0,
    subtotal + tax - discount
  );

  return (
    <aside
      className="cart-summary"
      aria-labelledby="cart-summary-title"
    >
      {/* Header */}
      <div className="summary-header">
        <FaShoppingBag aria-hidden="true" />

        <h2 id="cart-summary-title">
          Order Summary
        </h2>
      </div>

      {/* Subtotal */}
      <div className="summary-row">
        <span>Subtotal</span>

        <strong>
          ${subtotal.toFixed(2)}
        </strong>
      </div>

      {/* Shipping */}
      <div className="summary-row">
        <span>Shipping</span>

        <strong>
          Calculated at checkout
        </strong>
      </div>

      {/* Tax */}
      <div className="summary-row">
        <span>Tax</span>

        <strong>
          ${tax.toFixed(2)}
        </strong>
      </div>

      {/* Discount */}
      {discount > 0 && (
        <div className="summary-row discount">
          <span>Discount</span>

          <strong>
            - ${discount.toFixed(2)}
          </strong>
        </div>
      )}

      <hr />

      {/* Estimated Total */}
      <div className="summary-total">
        <span>Estimated Total</span>

        <strong>
          ${total.toFixed(2)}
        </strong>
      </div>

      {/* Checkout */}
      <Link
        to="/checkout"
        className="checkout-btn"
      >
        <span>Proceed to Checkout</span>

        <FaArrowRight aria-hidden="true" />
      </Link>

      {/* Continue Shopping */}
      <Link
        to="/products"
        className="continue-btn"
      >
        Continue Shopping
      </Link>
    </aside>
  );
};

export default CartSummary;