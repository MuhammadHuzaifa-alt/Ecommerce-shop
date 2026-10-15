import "./CartHeader.css";

import { Link } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";

interface CartHeaderProps {
  totalItems: number;
}

const CartHeader = ({ totalItems }: CartHeaderProps) => {
  const itemLabel = totalItems === 1 ? "item" : "items";

  return (
    <header className="cart-header">
      <div className="cart-header-container">

        <div className="cart-header-left">
          <div
            className="cart-icon"
            aria-hidden="true"
          >
            <FaShoppingCart />
          </div>

          <div>
            <h1>Shopping Cart</h1>

            <p aria-live="polite">
              You have{" "}
              <strong>
                {totalItems} {itemLabel}
              </strong>{" "}
              in your cart
            </p>
          </div>
        </div>

        <Link
          to="/products"
          className="continue-shopping"
        >
          <FaArrowLeft aria-hidden="true" />
          <span>Continue Shopping</span>
        </Link>

      </div>
    </header>
  );
};

export default CartHeader;