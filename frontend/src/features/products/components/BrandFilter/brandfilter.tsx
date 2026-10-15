import "./brandfilter.css";

interface Brand {
  id: number;
  name: string;
}

interface BrandFilterProps {
  brands: Brand[];
  selectedBrand: number | null;
  onBrandChange: (id: number | null) => void;
}

const BrandFilter = ({
  brands,
  selectedBrand,
  onBrandChange,
}: BrandFilterProps) => {
  return (
    <div className="brand-filter">

      <h3 className="filter-title">
        Brands
      </h3>

      <button
        className={
          selectedBrand === null
            ? "brand-item active"
            : "brand-item"
        }
        onClick={() => onBrandChange(null)}
      >
        All Brands
      </button>

      {brands.map((brand) => (
        <button
          key={brand.id}
          className={
            selectedBrand === brand.id
              ? "brand-item active"
              : "brand-item"
          }
          onClick={() => onBrandChange(brand.id)}
        >
          {brand.name}
        </button>
      ))}

    </div>
  );
};

export default BrandFilter;