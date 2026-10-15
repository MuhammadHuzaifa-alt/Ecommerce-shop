import "./CartItem.css";

import {
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

interface CartItemProps {
  id: number;
  image: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;

  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

const CartItem = ({
  id,
  image,
  name,
  brand,
  category,
  price,
  quantity,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) => {
  const totalPrice = price * quantity;

  return (
    <article className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <img
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>

      {/* Product Information */}
      <div className="cart-item-info">
        <h3>{name}</h3>

        <p>Brand: {brand}</p>

        <p>Category: {category}</p>

        <p className="cart-item-price">
          ${price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity">
        <button
          type="button"
          aria-label={`Decrease quantity of ${name}`}
          onClick={() => onDecrease(id)}
          disabled={quantity <= 1}
        >
          <FaMinus aria-hidden="true" />
        </button>

        <span
          className="cart-item-quantity-value"
          aria-label={`Quantity: ${quantity}`}
          aria-live="polite"
          aria-atomic="true"
        >
          {quantity}
        </span>

        <button
          type="button"
          aria-label={`Increase quantity of ${name}`}
          onClick={() => onIncrease(id)}
        >
          <FaPlus aria-hidden="true" />
        </button>
      </div>

      {/* Total */}
      <div className="cart-item-total">
        <strong>
          ${totalPrice.toFixed(2)}
        </strong>
      </div>

      {/* Remove */}
      <button
        type="button"
        className="cart-item-remove"
        aria-label={`Remove ${name} from cart`}
        onClick={() => onRemove(id)}
      >
        <FaTrash aria-hidden="true" />
      </button>
    </article>
  );
};

export default CartItem;