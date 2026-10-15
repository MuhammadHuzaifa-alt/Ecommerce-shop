import "./OrderSummary.css";

import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaLock,
} from "react-icons/fa";

import type {
  OrderItem,
  OrderTotals,
  PaymentMethod,
} from "../../types/checkout.types";

// ==========================================================
// PROPS
// ==========================================================

interface OrderSummaryProps {
  items: OrderItem[];
  totals: OrderTotals;
  paymentMethod: PaymentMethod;
  onPlaceOrder: () => void;
  loading?: boolean;
}

// ==========================================================
// COMPONENT
// ==========================================================

const OrderSummary = ({
  items,
  totals,
  paymentMethod,
  onPlaceOrder,
  loading = false,
}: OrderSummaryProps) => {
  const {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  } = totals;

  return (
    <aside
      className="order-summary"
      aria-labelledby="order-summary-title"
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="summary-header">
        <FaShoppingBag aria-hidden="true" />

        <h2 id="order-summary-title">
          Your Order
        </h2>
      </div>

      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      <div
        className="summary-products"
        aria-label="Order items"
      >
        {items.map((item) => {
          const itemTotal =
            item.price * item.quantity;

          return (
            <div
              key={item.id}
              className="summary-product"
            >
              <img
                src={item.image}
                alt=""
                loading="lazy"
              />

              <div className="summary-product-info">
                <h4>{item.name}</h4>

                <p>
                  Qty: {item.quantity}
                </p>
              </div>

              <strong>
                ${itemTotal.toFixed(2)}
              </strong>
            </div>
          );
        })}
      </div>

      <hr />

      {/* ======================================================
          TOTALS
      ====================================================== */}

      <SummaryRow
        label="Subtotal"
        value={subtotal}
      />

      <SummaryRow
        label="Shipping"
        value={shipping}
      />

      <SummaryRow
        label="Tax"
        value={tax}
      />

      {discount > 0 && (
        <div className="summary-row discount">
          <span>Discount</span>

          <strong>
            -${discount.toFixed(2)}
          </strong>
        </div>
      )}

      <hr />

      {/* ======================================================
          PAYMENT
      ====================================================== */}

      <div className="payment-info">
        <span>Payment</span>

        <strong>
          {paymentMethod}
        </strong>
      </div>

      {/* ======================================================
          TOTAL
      ====================================================== */}

      <div className="summary-total">
        <span>Total</span>

        <h2>
          ${total.toFixed(2)}
        </h2>
      </div>

      {/* ======================================================
          PLACE ORDER
      ====================================================== */}

      <button
        type="button"
        className="place-order-btn"
        onClick={onPlaceOrder}
        disabled={
          loading ||
          items.length === 0
        }
        aria-busy={loading}
      >
        <FaLock aria-hidden="true" />

        {loading
          ? "Processing..."
          : "Place Order"}
      </button>

      {/* ======================================================
          BACK TO CART
      ====================================================== */}

      <Link
        to="/cart"
        className="back-cart-btn"
      >
        Back to Cart
      </Link>
    </aside>
  );
};

// ==========================================================
// SUMMARY ROW
// ==========================================================

interface SummaryRowProps {
  label: string;
  value: number;
}

const SummaryRow = ({
  label,
  value,
}: SummaryRowProps) => {
  return (
    <div className="summary-row">
      <span>{label}</span>

      <strong>
        ${value.toFixed(2)}
      </strong>
    </div>
  );
};

export default OrderSummary;