import "./WishlistHeader.css";
import { FaHeart } from "react-icons/fa";

interface WishlistHeaderProps {
  totalItems: number;
}

const WishlistHeader = ({
  totalItems,
}: WishlistHeaderProps) => {
  return (
    <section className="wishlist-header">

      <div className="wishlist-header-content">

        <div className="wishlist-icon">
          <FaHeart />
        </div>

        <div className="wishlist-info">

          <h1>My Wishlist</h1>

          <p>
            Save your favorite products and move them to your cart whenever you're ready.
          </p>

          <span>
            {totalItems} {totalItems === 1 ? "Item" : "Items"} Saved
          </span>

        </div>

      </div>

    </section>
  );
};

export default WishlistHeader;