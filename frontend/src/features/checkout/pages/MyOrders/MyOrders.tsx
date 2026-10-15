import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import { useOrders } from "../../hooks/useOrders";

import {
  formatDate,
  formatPrice,
  getStatusClass,
} from "../../utils/order.utils";

import type { Order } from "../../services/orderService";

import "./MyOrders.css";


const MyOrders = () => {
  const {
    orders,
    loading,
    error,
  } = useOrders();


  return (
    <>
      <Navbar />

      <main className="my-orders-page">

        <div className="my-orders-container">

          {/* ==========================================
              HEADER
          ========================================== */}

          <header className="my-orders-header">

            <div>

              <h1>
                My Orders
              </h1>

              <p>
                View and track all your orders.
              </p>

            </div>

            {!loading && !error && (
              <span className="orders-count">
                {orders.length}{" "}
                {orders.length === 1
                  ? "Order"
                  : "Orders"}
              </span>
            )}

          </header>


          {/* ==========================================
              LOADING
          ========================================== */}

          {loading && (
            <OrdersLoading />
          )}


          {/* ==========================================
              ERROR
          ========================================== */}

          {!loading && error && (
            <OrdersError
              message={error}
            />
          )}


          {/* ==========================================
              EMPTY
          ========================================== */}

          {!loading &&
            !error &&
            orders.length === 0 && (
              <EmptyOrders />
            )}


          {/* ==========================================
              ORDERS
          ========================================== */}

          {!loading &&
            !error &&
            orders.length > 0 && (

              <div className="orders-list">

                {orders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                  />
                ))}

              </div>

            )}

        </div>

      </main>

      <Footer />
    </>
  );
};


// ==========================================================
// LOADING
// ==========================================================

const OrdersLoading = () => {
  return (
    <div className="my-orders-loading">

      <div
        className="orders-spinner"
        aria-hidden="true"
      />

      <h2>
        Loading your orders...
      </h2>

    </div>
  );
};


// ==========================================================
// ERROR
// ==========================================================

interface OrdersErrorProps {
  message: string;
}

const OrdersError = ({
  message,
}: OrdersErrorProps) => {
  return (
    <div className="my-orders-error">

      <h2>
        Unable to load orders
      </h2>

      <p>
        {message}
      </p>

      <a
        href="/"
        className="shop-now-btn"
      >
        Continue Shopping
      </a>

    </div>
  );
};


// ==========================================================
// ORDER CARD
// ==========================================================

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({
  order,
}: OrderCardProps) => {
  return (
    <article className="order-list-card">

      {/* ==========================================
          HEADER
      ========================================== */}

      <header className="order-list-header">

        <div>

          <h2>
            Order #{order.id}
          </h2>

          <p>
            Placed on{" "}
            {formatDate(order.created_at)}
          </p>

        </div>

        <span
          className={`order-status-badge ${getStatusClass(
            order.status
          )}`}
        >
          {order.status}
        </span>

      </header>


      {/* ==========================================
          ITEMS
      ========================================== */}

      <div className="order-list-items">

        {order.items
          .slice(0, 3)
          .map((item) => (

            <div
              className="order-list-item"
              key={item.id}
            >

              <div className="order-list-image">

                {item.product_image ? (
                  <img
                    src={item.product_image}
                    alt={item.product_name}
                    loading="lazy"
                  />
                ) : (
                  <span>
                    No Image
                  </span>
                )}

              </div>


              <div className="order-list-product">

                <h3>
                  {item.product_name}
                </h3>

                <p>
                  Qty: {item.quantity}
                </p>

              </div>


              <strong>
                Rs.{" "}
                {formatPrice(item.subtotal)}
              </strong>

            </div>

          ))}

      </div>


      {/* ==========================================
          MORE ITEMS
      ========================================== */}

      {order.items.length > 3 && (
        <p className="more-items">
          + {order.items.length - 3} more item(s)
        </p>
      )}


      {/* ==========================================
          FOOTER
      ========================================== */}

      <footer className="order-list-footer">

        <div>

          <span>
            Total
          </span>

          <strong>
            Rs.{" "}
            {formatPrice(order.total)}
          </strong>

        </div>


        <a
          href={`/orders/${order.id}`}
          className="view-order-btn"
        >
          View Order
        </a>

      </footer>

    </article>
  );
};


// ==========================================================
// EMPTY ORDERS
// ==========================================================

const EmptyOrders = () => {
  return (
    <div className="empty-orders">

      <div
        className="empty-orders-icon"
        aria-hidden="true"
      >
        🛍
      </div>

      <h2>
        No orders yet
      </h2>

      <p>
        You haven't placed any orders yet.
      </p>

      <a
        href="/products"
        className="shop-now-btn"
      >
        Start Shopping
      </a>

    </div>
  );
};


export default MyOrders;