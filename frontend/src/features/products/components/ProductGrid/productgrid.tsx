import "./productgrid.css";

import ProductCard from "../ProductCard";
import type { Product } from "../../types/product";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({
  products,
}: ProductGridProps) => {

  if (products.length === 0) {
    return (
      <div className="empty-products">

        <h2>
          No Products Found
        </h2>

        <p>
          Try changing your search or filter.
        </p>

      </div>
    );
  }


  return (
    <div className="product-grid">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
};


export default ProductGrid;