import "./ProductCard.css";

import {
  FaStar,
  FaShoppingCart,
  FaShare,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import type { Product } from "../../types/product";

import ProductImage from "../ProductImage";
import ProductPrice from "../ProductPrice";
import WishlistButton from "../WishlistButton";
import ShareButton from "../ShareButton";

import { useCart } from "../../../../features/cart/context/useCart";


// ==========================================
// CATEGORY
// ==========================================

export interface ProductCategory {
  id: number;
  name: string;
}


// ==========================================
// PRODUCT
// ==========================================


// ==========================================
// PROPS
// ==========================================

interface ProductCardProps {
  product: Product;
}


// ==========================================
// COMPONENT
// ==========================================

const ProductCard = ({
  product,
}: ProductCardProps) => {

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // ========================================
  // PRODUCT DETAILS
  // ========================================

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };


  // ========================================
  // ADD TO CART
  // ========================================

 const handleAddToCart = (
  e: React.MouseEvent<HTMLButtonElement>
 ) => {
  e.stopPropagation();
  addToCart(product);
};


  return (
    <div
      className="product-card"
      onClick={handleProductClick}
    >

      {/* IMAGE */}

      <div className="card-image">

        <ProductImage
          name={product.name}
          image={product.image ?? ""}
        />

        <div
          className="card-actions"
          onClick={(event) =>
            event.stopPropagation()
          }
        >

          <WishlistButton
            product={product}
          />

          <ShareButton
            productName={product.name}
            icon={<FaShare />}
          />

        </div>

      </div>


      {/* CONTENT */}

      <div className="card-content">

        <span className="product-category">
          {product.category?.name ?? "—"}
        </span>


        <h3 className="product-name">
          {product.name}
        </h3>


        {/* RATING */}

        <div className="product-rating">

          <FaStar className="star" />

          <span>
            {product.rating}
          </span>

          <small>
            ({product.reviews} Reviews)
          </small>

        </div>


        {/* PRICE */}

        <ProductPrice
          price={Number(product.price)}
          oldPrice={Number(product.oldPrice)}
        />


        {/* STOCK */}

        <p
          className={
            product.stock > 0
              ? "stock in-stock"
              : "stock out-stock"
          }
        >
          {product.stock > 0
            ? `In Stock (${product.stock})`
            : "Out of Stock"}
        </p>


        {/* ADD TO CART */}

        <button
          type="button"
          className="cart-btn"
          disabled={product.stock === 0}
           onClick={handleAddToCart}
            >
         <FaShoppingCart />
          Add To Cart
        </button>

      </div>

    </div>
  );
};


export default ProductCard;