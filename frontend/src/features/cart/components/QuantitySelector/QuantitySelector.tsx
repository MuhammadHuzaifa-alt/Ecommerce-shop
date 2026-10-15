import "./QuantitySelector.css";

import {
  FaMinus,
  FaPlus,
} from "react-icons/fa";

interface QuantitySelectorProps {
  quantity: number;
  min?: number;
  max?: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

const QuantitySelector = ({
  quantity,
  min = 1,
  max = 99,
  onIncrease,
  onDecrease,
}: QuantitySelectorProps) => {
  const isMinReached = quantity <= min;
  const isMaxReached = quantity >= max;

  return (
    <div
      className="quantity-selector"
      aria-label="Quantity selector"
    >
      <button
        type="button"
        className="quantity-btn"
        onClick={onDecrease}
        disabled={isMinReached}
        aria-label="Decrease quantity"
      >
        <FaMinus aria-hidden="true" />
      </button>

      <span
        className="quantity-value"
        aria-live="polite"
        aria-atomic="true"
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>

      <button
        type="button"
        className="quantity-btn"
        onClick={onIncrease}
        disabled={isMaxReached}
        aria-label="Increase quantity"
      >
        <FaPlus aria-hidden="true" />
      </button>
    </div>
  );
};

export default QuantitySelector;