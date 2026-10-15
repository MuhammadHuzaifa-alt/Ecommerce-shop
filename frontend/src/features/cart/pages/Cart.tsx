import "./Cart.css";

import Navbar from "../../../shared/components/navbar";
import Footer from "../../../shared/components/footer";
import Breadcrumb from "../../contact/components/Breadcrumb/Breadcrumb";

import CartHeader from "../../cart/components/CartHeader/CartHeader";
import CartItem from "../../cart/components/CartItem/CartItem";
import CouponBox from "../../cart/components/CouponBox/CouponBox";
import CartSummary from "../../cart/components/CartSummary/CartSummary";

import {useCart,} from "../context/useCart";

const Cart = () => {
  const {
    cartItems,
    cartItemCount,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
  } = useCart();

  const tax = subtotal * 0.05;

  const discount = 0;

  const handleApplyCoupon = (coupon: string) => {
    // API call will be implemented here.
    console.log("Applying coupon:", coupon);
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <Navbar />

      <Breadcrumb
        items={[
          {
            label: "Home",
            path: "/",
          },
          {
            label: "Cart",
          },
        ]}
      />

      <CartHeader
        totalItems={cartItemCount}
      />

      <main className="cart-page">
        <div className="cart-container">

          {/* Cart Items */}
          <section
            className="cart-left"
            aria-label="Shopping cart items"
          >
            {isCartEmpty ? (
              <div className="empty-cart">
                <h2>Your cart is empty</h2>

                <p>
                  Add some products to your cart.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  image={item.image || ""}
                  name={item.name}
                  brand={item.brand}
                  category={
                    item.category?.name ?? "—"
                  }
                  price={Number(item.price)}
                  quantity={item.quantity}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                  onRemove={removeFromCart}
                />
              ))
            )}

            {!isCartEmpty && (
              <CouponBox
                onApplyCoupon={handleApplyCoupon}
              />
            )}
          </section>

          {/* Order Summary */}
          {!isCartEmpty && (
            <div className="cart-right">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                discount={discount}
              />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Cart;