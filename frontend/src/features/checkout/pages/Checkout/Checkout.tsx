import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";
import Breadcrumb from "../../../contact/components/Breadcrumb/Breadcrumb";

import CheckoutHeader from "../../components/CheckoutHeader/CheckoutHeader";
import CheckoutSteps from "../../components/CheckoutSteps/CheckoutSteps";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import DeliveryMethod from "../../components/DeliveryMethod/DeliveryMethod";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import OrderSummary from "../../components/OrderSummary/OrderSummary";

import { useCheckout } from "../../hooks/useCheckout";
import { CHECKOUT_STEP } from "../../constants/checkout.constants";

import "./Checkout.css";

// ==========================================================
// COMPONENT
// ==========================================================

const Checkout = () => {
  const {
    customer,
    setCustomer,

    delivery,
    setDelivery,

    payment,
    setPayment,

    orderItems,
    totals,

    loading,
    error,

    placeOrder,
  } = useCheckout();

  // ========================================================
  // EMPTY CART
  // ========================================================

  const isEmpty =
    orderItems.length === 0;

  // ========================================================
  // RENDER
  // ========================================================

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
            path: "/cart",
          },
          {
            label: "Checkout",
          },
        ]}
      />

      <CheckoutHeader />

      {isEmpty ? (
        <main
          className="checkout-empty"
          aria-labelledby="checkout-empty-title"
        >
          <h2 id="checkout-empty-title">
            Your cart is empty
          </h2>

          <p>
            Please add products to your cart
            before checkout.
          </p>
        </main>
      ) : (
        <>
          <CheckoutSteps
            currentStep={
              CHECKOUT_STEP.CHECKOUT
            }
          />

          <main className="checkout-page">
            <div className="checkout-container">

              {/* ==================================================
                  LEFT SIDE
              ================================================== */}

              <section
                className="checkout-left"
                aria-label="Checkout information"
              >
                {error && (
                  <div
                    className="checkout-error"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <CheckoutForm
                  formData={customer}
                  onChange={setCustomer}
                />

                <DeliveryMethod
                  selectedId={delivery.id}
                  onSelect={setDelivery}
                />

                <PaymentMethod
                  selectedId={payment.id}
                  onSelect={setPayment}
                />
              </section>

              {/* ==================================================
                  RIGHT SIDE
              ================================================== */}

              <aside
                className="checkout-right"
                aria-label="Order summary"
              >
                <OrderSummary
                  items={orderItems}
                  totals={totals}
                  paymentMethod={payment.name}
                  onPlaceOrder={placeOrder}
                  loading={loading}
                />
              </aside>

            </div>
          </main>
        </>
      )}

      <Footer />
    </>
  );
};

export default Checkout;