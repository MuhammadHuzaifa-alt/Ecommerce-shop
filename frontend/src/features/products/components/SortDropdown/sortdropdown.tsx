import "./sortdropdown.css";

export interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const options: SortOption[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Most Popular" },
  { value: "bestselling", label: "Best Selling" },
  { value: "rating", label: "Highest Rated" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "discount", label: "Biggest Discount" },
];

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  return (
    <div className="sort-dropdown">

      <label htmlFor="sort">
        Sort By
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

    </div>
  );
};

export default SortDropdown;