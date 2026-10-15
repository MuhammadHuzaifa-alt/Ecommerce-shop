import { useState } from "react";
import "./pricefilter.css";

interface PriceFilterProps {
  min?: number;
  max?: number;
  onPriceChange?: (minPrice: number, maxPrice: number) => void;
}

const PriceFilter = ({
  min = 0,
  max = 5000,
  onPriceChange,
}: PriceFilterProps) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);

  const handleApply = () => {
    onPriceChange?.(minPrice, maxPrice);
  };

  return (
    <div className="price-filter">

      <h3 className="filter-title">Price Range</h3>

      <div className="price-inputs">

        <div className="price-group">
          <label>Min</label>

          <input
            type="number"
            value={minPrice}
            min={min}
            max={maxPrice}
            onChange={(e) =>
              setMinPrice(Number(e.target.value))
            }
          />
        </div>

        <div className="price-group">
          <label>Max</label>

          <input
            type="number"
            value={maxPrice}
            min={minPrice}
            max={max}
            onChange={(e) =>
              setMaxPrice(Number(e.target.value))
            }
          />
        </div>

      </div>

      <input
        className="price-slider"
        type="range"
        min={min}
        max={max}
        value={maxPrice}
        onChange={(e) =>
          setMaxPrice(Number(e.target.value))
        }
      />

      <button
        className="apply-btn"
        onClick={handleApply}
      >
        Apply Filter
      </button>

    </div>
  );
};

export default PriceFilter;