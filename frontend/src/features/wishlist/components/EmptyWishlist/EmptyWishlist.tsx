import "./EmptyWishlist.css";
import { Link } from "react-router-dom";
import {
  FaHeartBroken,
  FaArrowRight,
} from "react-icons/fa";

const EmptyWishlist = () => {
  return (
    <section className="empty-wishlist">

      <div className="empty-card">

        <div className="empty-icon">
          <FaHeartBroken />
        </div>

        <h2>Your Wishlist is Empty</h2>

        <p>
          You haven't saved any products yet.
          Browse our collection and add your favorite
          products to your wishlist.
        </p>

        <Link
          to="/products"
          className="shop-btn"
        >
          Start Shopping
          <FaArrowRight />
        </Link>

      </div>

    </section>
  );
};

export default EmptyWishlist;