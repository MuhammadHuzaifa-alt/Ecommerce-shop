import "./WishlistItem.css";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

interface WishlistItemProps {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  stock: boolean;

  onMoveToCart: (id: number) => void;
  onRemove: (id: number) => void;
}

const WishlistItem = ({
  id,
  image,
  name,
  brand,
  price,
  rating,
  stock,
  onMoveToCart,
  onRemove,
}: WishlistItemProps) => {

  const renderRating = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {

      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      }

      else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      }

      else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return (

    <div className="wishlist-item">

      <div className="wishlist-image">

        <img
          src={image}
          alt={name}
        />

      </div>

      <div className="wishlist-content">

        <span className="wishlist-brand">
          {brand}
        </span>

        <h3>{name}</h3>

        <div className="wishlist-rating">
          {renderRating()}
        </div>

        <p className="wishlist-price">
          ${price.toFixed(2)}
        </p>

        <span
          className={
            stock
              ? "stock in-stock"
              : "stock out-stock"
          }
        >
          {stock ? "In Stock" : "Out of Stock"}
        </span>

      </div>

      <div className="wishlist-actions">

        <button
          className="cart-btn"
          disabled={!stock}
          onClick={() => onMoveToCart(id)}
        >
          <FaShoppingCart />

          Move to Cart
        </button>

        <button
          className="remove-btn"
          onClick={() => onRemove(id)}
        >
          <FaTrash />

          Remove
        </button>

      </div>

    </div>

  );
};

export default WishlistItem;