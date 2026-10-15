import "./WishlistSummary.css";
import { Link } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
} from "react-icons/fa";

interface WishlistSummaryProps {
  totalItems: number;
  inStock: number;
  outOfStock: number;
  totalValue: number;
  onMoveAllToCart: () => void;
}

const WishlistSummary = ({
  totalItems,
  inStock,
  outOfStock,
  totalValue,
  onMoveAllToCart,
}: WishlistSummaryProps) => {
  return (
    <aside className="wishlist-summary">

      <div className="summary-title">

        <FaHeart />

        <h2>Wishlist Summary</h2>

      </div>

      <div className="summary-row">
        <span>Saved Products</span>
        <strong>{totalItems}</strong>
      </div>

      <div className="summary-row">
        <span>Available</span>
        <strong className="stock-green">
          {inStock}
        </strong>
      </div>

      <div className="summary-row">
        <span>Out of Stock</span>
        <strong className="stock-red">
          {outOfStock}
        </strong>
      </div>

      <hr />

      <div className="summary-total">

        <span>Estimated Value</span>

        <h2>
          ${totalValue.toFixed(2)}
        </h2>

      </div>

      <button
        className="move-all-btn"
        onClick={onMoveAllToCart}
        disabled={inStock === 0}
      >

        <FaShoppingCart />

        Move All To Cart

      </button>

      <Link
        to="/products"
        className="continue-btn"
      >

        Continue Shopping

        <FaArrowRight />

      </Link>

    </aside>
  );
};

export default WishlistSummary;