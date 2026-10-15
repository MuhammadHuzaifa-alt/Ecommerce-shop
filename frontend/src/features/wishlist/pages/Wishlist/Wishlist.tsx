import { useMemo } from "react";

import "./Wishlist.css";

import Footer from "../../../../shared/components/footer";
import Breadcrumb from "../../../contact/components/Breadcrumb/Breadcrumb";

import WishlistHeader from "../../components/WishlistHeader/WishlistHeader";
import WishlistGrid from "../../components/WishlistGrid/WishlistGrid";
import WishlistSummary from "../../components/WishlistSummary/WishlistSummary";

import { useWishlist } from "../../../../hooks/useWishlist";
import { useCart } from "../../../../features/cart/context/useCart";


// ==========================================
// WISHLIST
// ==========================================

const Wishlist = () => {

  // ========================================
  // WISHLIST CONTEXT
  // ========================================

  const {
    wishlist,
    removeFromWishlist,
  } = useWishlist();


  // ========================================
  // CART CONTEXT
  // ========================================

  const {
    addToCart,
  } = useCart();


  // ========================================
  // REMOVE FROM WISHLIST
  // ========================================

  const handleRemove = (id: number) => {

    removeFromWishlist(id);

  };


  // ========================================
  // MOVE ONE PRODUCT TO CART
  // ========================================

  const handleMoveToCart = (id: number) => {

    const product = wishlist.find(
      (item) => item.id === id
    );


    // Product not found
    if (!product) {
      return;
    }


    // Product is out of stock
    if (product.stock <= 0) {

      alert("This product is out of stock.");

      return;
    }


    // Add product to CartContext
    addToCart(product);


    // Remove product from wishlist
    removeFromWishlist(id);


    console.log(
      "Moved to cart:",
      product
    );

  };


  // ========================================
  // MOVE ALL TO CART
  // ========================================

  const handleMoveAll = () => {

    const availableItems = wishlist.filter(
      (item) => item.stock > 0
    );


    if (availableItems.length === 0) {

      alert(
        "No available products to move to cart."
      );

      return;
    }


    // Add every available wishlist product
    // to CartContext
    availableItems.forEach((item) => {

      addToCart(item);

    });


    // Remove moved products from wishlist
    availableItems.forEach((item) => {

      removeFromWishlist(item.id);

    });


    console.log(
      "Moved all to cart:",
      availableItems
    );

  };


  // ========================================
  // TOTAL WISHLIST VALUE
  // ========================================

  const totalValue = useMemo(() => {

    return wishlist.reduce(
      (total, item) =>
        total + Number(item.price),
      0
    );

  }, [wishlist]);


  // ========================================
  // STOCK COUNTS
  // ========================================

  const inStock = wishlist.filter(
    (item) => item.stock > 0
  ).length;


  const outOfStock = wishlist.filter(
    (item) => item.stock <= 0
  ).length;


  // ========================================
  // WISHLIST GRID DATA
  // ========================================

  const wishlistItems = wishlist.map(
    (product) => ({

      id: product.id,

      image: product.image ?? "",

      name: product.name,

      brand: product.brand,

      price: Number(product.price),

      rating: product.rating,

      stock: product.stock > 0,

    })
  );


  // ========================================
  // RENDER
  // ========================================

  return (
    <>

      {/* ====================================
          BREADCRUMB
      ==================================== */}

      <Breadcrumb
        items={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "Wishlist",
          },
        ]}
      />


      {/* ====================================
          HEADER
      ==================================== */}

      <WishlistHeader
        totalItems={wishlistItems.length}
      />


      {/* ====================================
          WISHLIST PAGE
      ==================================== */}

      <section className="wishlist-page">

        <div className="wishlist-container">


          {/* ==================================
              LEFT
          ================================== */}

          <div className="wishlist-left">

            <WishlistGrid
              items={wishlistItems}
              onMoveToCart={handleMoveToCart}
              onRemove={handleRemove}
            />

          </div>


          {/* ==================================
              RIGHT
          ================================== */}

          {wishlistItems.length > 0 && (

            <div className="wishlist-right">

              <WishlistSummary

                totalItems={
                  wishlistItems.length
                }

                inStock={inStock}

                outOfStock={outOfStock}

                totalValue={totalValue}

                onMoveAllToCart={
                  handleMoveAll
                }

              />

            </div>

          )}

        </div>

      </section>


      {/* ====================================
          FOOTER
      ==================================== */}

      <Footer />

    </>
  );
};


export default Wishlist;