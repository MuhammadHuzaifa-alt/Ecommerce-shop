import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import "./productdetails.css";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import ProductImage from "../../components/ProductImage";
import ProductPrice from "../../components/ProductPrice";
import ProductGrid from "../../components/ProductGrid";
import WishlistButton from "../../components/WishlistButton";
import ShareButton from "../../components/ShareButton";

import type { Product } from "../../types/product";

import { useCart } from "../../../../features/cart/context/useCart";
import { getProducts } from "../../services/productService";

// ==========================================================
// TYPES
// ==========================================================

interface ApiProduct {
  id: number;
  name: string;

  category?: {
    id: number;
    name: string;
  };

  category_id?: number;
  category_name?: string;

  brand: string;

  image: string | null;

  price: string | number;
  oldPrice?: string | number | null;
  rating: string | number;
  reviews: string | number;
  stock: string | number;
  discount?: string | number | null;
}


// ==========================================================
// HELPERS
// ==========================================================

const formatImageUrl = (
  image: string | null
): string | null => {
  if (!image) {
    return null;
  }

  if (image.includes("/media/")) {
    return `/media/${image.split("/media/").pop()}`;
  }

  return image.startsWith("/")
    ? image
    : `/media/${image}`;
};

const formatProduct = (
  product: ApiProduct
): Product => ({
  id: product.id,

  name: product.name,

  category: {
    id:
      product.category?.id ??
      product.category_id ??
      0,

    name:
      product.category?.name ??
      product.category_name ??
      "—",
  },

  brand: product.brand,

  image: formatImageUrl(product.image),

  price: Number(product.price),

  oldPrice:
    product.oldPrice !== null &&
    product.oldPrice !== undefined
      ? Number(product.oldPrice)
      : 0,

  rating: Number(product.rating),

  reviews: Number(product.reviews),

  stock: Number(product.stock),

  discount:
    product.discount !== null &&
    product.discount !== undefined
      ? Number(product.discount)
      : 0,

  isNew: false,
});


// ==========================================================
// COMPONENT
// ==========================================================

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const { addToCart } = useCart();


  // --------------------------------------------------------
  // STATE
  // --------------------------------------------------------

  const [products, setProducts] = useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);


  // ========================================================
  // LOAD PRODUCTS
  // ========================================================

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        const formattedProducts =
          data.map((product) =>
            formatProduct(
              product as ApiProduct
            )
          );

        setProducts(formattedProducts);
      } catch (error) {
        console.error(
          "Error loading product details:",
          error
        );

        setError(
          "Unable to load product. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);


  // ========================================================
  // CURRENT PRODUCT
  // ========================================================

  const product = useMemo(() => {
    const productId = Number(id);

    if (Number.isNaN(productId)) {
      return undefined;
    }

    return products.find(
      (item) => item.id === productId
    );
  }, [products, id]);


  // ========================================================
  // RELATED PRODUCTS
  // ========================================================

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter(
        (item) =>
          item.id !== product.id &&
          item.category?.id ===
            product.category?.id
      )
      .slice(0, 4);
  }, [products, product]);


  // ========================================================
  // QUANTITY
  // ========================================================

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1)
    );
  };


  const increaseQuantity = () => {
    if (!product) {
      return;
    }

    setQuantity((currentQuantity) =>
      Math.min(
        product.stock,
        currentQuantity + 1
      )
    );
  };


  // ========================================================
  // CART ACTIONS
  // ========================================================

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    for (let index = 0; index < quantity; index++) {
      addToCart(product);
    }
  };


  const handleBuyNow = () => {
    if (!product || product.stock <= 0) {
      return;
    }

    handleAddToCart();

    navigate("/cart");
  };


  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="product-details">
          <div className="product-details-loading">
            Loading product...
          </div>
        </main>

        <Footer />
      </>
    );
  }


  // ========================================================
  // ERROR
  // ========================================================

  if (error) {
    return (
      <>
        <Navbar />

        <main className="product-details">
          <div className="product-details-error">
            {error}
          </div>
        </main>

        <Footer />
      </>
    );
  }


  // ========================================================
  // PRODUCT NOT FOUND
  // ========================================================

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="product-details">
          <div className="product-details-error">
            <h2>Product Not Found</h2>

            <button
              type="button"
              onClick={() =>
                navigate("/products")
              }
            >
              Back To Products
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }


  // ========================================================
  // RENDER
  // ========================================================

  return (
    <>
      <Navbar />

      <main className="product-details">

        {/* Product Overview */}

        <section className="product-main">

          <div className="product-gallery">
            <ProductImage
              image={product.image ?? ""}
              name={product.name}
            />
          </div>


          <div className="product-info">

            <h1>{product.name}</h1>

            <p className="product-brand">
              {product.brand}
            </p>

            <p className="product-category">
              {product.category?.name}
            </p>


            {/* Rating */}

            <div className="rating">
              <FaStar aria-hidden="true" />

              <span>
                {product.rating}
              </span>

              <span>
                ({product.reviews} Reviews)
              </span>
            </div>


            {/* Price */}

            <ProductPrice
              price={Number(product.price)}
              oldPrice={product.oldPrice == null ? undefined : Number(product.oldPrice)}
            />


            {/* Stock */}

            <p className="stock">
              Available:

              <strong>
                {" "}
                {product.stock}
              </strong>
            </p>


            {/* Description */}

            <p className="description">
              {product.name} is available
              with a current stock of{" "}
              {product.stock} units.
            </p>


            {/* Quantity */}

            <div className="quantity">

              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <FaMinus aria-hidden="true" />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={
                  quantity >= product.stock
                }
                aria-label="Increase quantity"
              >
                <FaPlus aria-hidden="true" />
              </button>

            </div>


            {/* Actions */}

            <div className="actions">

              <button
                type="button"
                className="cart-btn"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
              >
                <FaShoppingCart
                  aria-hidden="true"
                />

                Add To Cart
              </button>


              <button
                type="button"
                className="buy-btn"
                disabled={product.stock <= 0}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>

            </div>


            {/* Additional Actions */}

            <div className="extra-actions">

              <WishlistButton
                product={product}
              />

              <ShareButton
                productName={product.name}
              />

            </div>

          </div>

        </section>


        {/* Product Description */}

        <section className="product-description">

          <h2>Description</h2>

          <p>
            {product.name} by{" "}
            {product.brand} is currently
            available in our store.
          </p>


          <h2>Product Information</h2>

          <ul>

            <li>
              Category:{" "}
              {product.category?.name}
            </li>

            <li>
              Brand: {product.brand}
            </li>

            <li>
              Rating: {product.rating}
            </li>

            <li>
              Reviews: {product.reviews}
            </li>

            <li>
              Stock: {product.stock}
            </li>

          </ul>

        </section>


        {/* Related Products */}

        {relatedProducts.length > 0 && (
          <section className="related-products">

            <h2>Related Products</h2>

            <ProductGrid
              products={relatedProducts}
            />

          </section>
        )}

      </main>

      <Footer />
    </>
  );
};

export default ProductDetails;
