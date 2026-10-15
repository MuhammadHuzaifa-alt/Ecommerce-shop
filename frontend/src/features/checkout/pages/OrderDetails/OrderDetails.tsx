import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import Navbar from "../../../../shared/components/navbar";
import Footer from "../../../../shared/components/footer";

import {
  getMyOrder,
} from "../../services/orderService";

import type {
  Order,
} from "../../services/orderService";

import "./OrderDetails.css";


const STATUS_STEPS = [
  {
    key: "pending",
    label: "Order Placed",
  },
  {
    key: "confirmed",
    label: "Confirmed",
  },
  {
    key: "processing",
    label: "Processing",
  },
  {
    key: "shipped",
    label: "Shipped",
  },
  {
    key: "delivered",
    label: "Delivered",
  },
];


const OrderDetails = () => {
  const { id } =
    useParams<{ id: string }>();

  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  // ==========================================================
  // LOAD ORDER
  // ==========================================================

  useEffect(() => {
    const loadOrder = async () => {
      const orderId = Number(id);

      if (!id) {
        setError("Order ID is missing.");
        setLoading(false);
        return;
      }

      if (
        !Number.isInteger(orderId) ||
        orderId <= 0
      ) {
        setError("Invalid order ID.");
        setLoading(false);
        return;
      }


      try {
        setLoading(true);
        setError("");

        const data =
          await getMyOrder(orderId);

        setOrder(data);
      } catch (err: unknown) {
        console.error(
          "Failed to load order:",
          err
        );

        setOrder(null);
        setError(
          getOrderErrorMessage(err)
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <LoadingState />;
  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !order) {
    return (
      <ErrorState
        message={
          error || "Order not found."
        }
      />
    );
  }


  // ==========================================================
  // ORDER STATUS
  // ==========================================================

  const status =
    order.status?.trim().toLowerCase() ||
    "pending";

  const currentStatusIndex =
    STATUS_STEPS.findIndex(
      (step) =>
        step.key === status
    );


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <>
      <Navbar />

      <main className="order-details-page">

        <div className="order-details-container">

          <OrderHeader
            order={order}
            status={status}
          />


          {status === "cancelled" && (
            <CancelledMessage />
          )}


          {status !== "cancelled" && (
            <OrderStatus
              status={status}
              currentStatusIndex={
                currentStatusIndex
              }
            />
          )}


          <OrderItems
            order={order}
          />


          <OrderInformation
            order={order}
          />


          <OrderSummary
            order={order}
          />


          {order.notes && (
            <OrderNotes
              notes={order.notes}
            />
          )}


          <OrderActions />

        </div>

      </main>

      <Footer />
    </>
  );
};


// ==========================================================
// ORDER HEADER
// ==========================================================

interface OrderHeaderProps {
  order: Order;
  status: string;
}


const OrderHeader = ({
  order,
  status,
}: OrderHeaderProps) => {
  return (
    <header className="order-details-header">

      <div>

        <Link
          to="/orders"
          className="back-orders-link"
        >
          ← Back to My Orders
        </Link>

        <h1>
          Order #{order.id}
        </h1>

        <p className="order-date">
          Placed on{" "}
          {formatDate(order.created_at)}
        </p>

      </div>


      <div
        className={`order-main-status ${status}`}
      >
        {formatStatus(status)}
      </div>

    </header>
  );
};


// ==========================================================
// CANCELLED MESSAGE
// ==========================================================

const CancelledMessage = () => {
  return (
    <div className="cancelled-box">

      <strong>
        Order Cancelled
      </strong>

      <p>
        This order has been cancelled.
      </p>

    </div>
  );
};


// ==========================================================
// ORDER STATUS
// ==========================================================

interface OrderStatusProps {
  status: string;
  currentStatusIndex: number;
}


const OrderStatus = ({
  status,
  currentStatusIndex,
}: OrderStatusProps) => {
  return (
    <section className="order-card status-card">

      <div className="card-title">

        <h2>
          Order Status
        </h2>

        <span>
          Current status:{" "}
          <strong>
            {formatStatus(status)}
          </strong>
        </span>

      </div>


      <div className="status-timeline">

        {STATUS_STEPS.map(
          (step, index) => {

            const completed =
              index <=
              currentStatusIndex;

            const lineCompleted =
              index <
              currentStatusIndex;

            return (
              <div
                className={`status-step ${
                  completed
                    ? "completed"
                    : ""
                }`}
                key={step.key}
              >

                <div className="status-circle">
                  {completed
                    ? "✓"
                    : index + 1}
                </div>


                <div className="status-label">
                  <strong>
                    {step.label}
                  </strong>
                </div>


                {index <
                  STATUS_STEPS.length - 1 && (
                  <div
                    className={`status-line ${
                      lineCompleted
                        ? "completed"
                        : ""
                    }`}
                  />
                )}

              </div>
            );
          }
        )}

      </div>

    </section>
  );
};


// ==========================================================
// ORDER ITEMS
// ==========================================================

interface OrderItemsProps {
  order: Order;
}


const OrderItems = ({
  order,
}: OrderItemsProps) => {
  return (
    <section className="order-card">

      <div className="card-title">

        <h2>
          Order Items
        </h2>

        <span>
          {order.items.length}{" "}
          {order.items.length === 1
            ? "item"
            : "items"}
        </span>

      </div>


      <div className="order-items">

        {order.items.map((item) => (
          <div
            className="order-item"
            key={item.id}
          >

            <div className="order-product-image">

              {item.product_image ? (
                <img
                  src={item.product_image}
                  alt={item.product_name}
                  loading="lazy"
                />
              ) : (
                <div className="no-image">
                  No Image
                </div>
              )}

            </div>


            <div className="order-product-info">

              <h3>
                {item.product_name}
              </h3>

              <p>
                Quantity: {item.quantity}
              </p>

              <p className="item-price">
                Rs.{" "}
                {formatPrice(item.price)}
              </p>

            </div>


            <div className="order-item-total">
              Rs.{" "}
              {formatPrice(item.subtotal)}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};


// ==========================================================
// ORDER INFORMATION
// ==========================================================

interface OrderInformationProps {
  order: Order;
}


const OrderInformation = ({
  order,
}: OrderInformationProps) => {
  return (
    <div className="order-info-grid">

      <ShippingAddress
        order={order}
      />

      <DeliveryPayment
        order={order}
      />

    </div>
  );
};


// ==========================================================
// SHIPPING ADDRESS
// ==========================================================

interface OrderSectionProps {
  order: Order;
}


const ShippingAddress = ({
  order,
}: OrderSectionProps) => {
  return (
    <section className="order-card">

      <div className="card-title">
        <h2>
          Shipping Address
        </h2>
      </div>


      <div className="address-content">

        <strong>
          {order.full_name}
        </strong>

        <p>
          {order.address}
        </p>

        {order.apartment && (
          <p>
            {order.apartment}
          </p>
        )}

        <p>
          {order.city},{" "}
          {order.state}
        </p>

        <p>
          {order.country},{" "}
          {order.postal_code}
        </p>

        <p>
          Phone: {order.phone}
        </p>

        <p>
          Email: {order.email}
        </p>

      </div>

    </section>
  );
};


// ==========================================================
// DELIVERY & PAYMENT
// ==========================================================

const DeliveryPayment = ({
  order,
}: OrderSectionProps) => {
  return (
    <section className="order-card">

      <div className="card-title">

        <h2>
          Delivery & Payment
        </h2>

      </div>


      <DetailRow
        label="Delivery Method"
        value={order.delivery_method}
      />

      <DetailRow
        label="Estimated Delivery"
        value={order.delivery_days}
      />

      <DetailRow
        label="Payment Method"
        value={order.payment_method}
      />


      <div className="detail-row">

        <span>
          Payment Status
        </span>

        <strong
          className={`payment-status ${
            order.payment_status
              ?.trim()
              .toLowerCase()
          }`}
        >
          {order.payment_status}
        </strong>

      </div>

    </section>
  );
};


// ==========================================================
// DETAIL ROW
// ==========================================================

interface DetailRowProps {
  label: string;
  value: string;
}


const DetailRow = ({
  label,
  value,
}: DetailRowProps) => {
  return (
    <div className="detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value || "—"}
      </strong>

    </div>
  );
};


// ==========================================================
// ORDER SUMMARY
// ==========================================================

interface OrderSummaryProps {
  order: Order;
}


const OrderSummary = ({
  order,
}: OrderSummaryProps) => {
  return (
    <section className="order-card">

      <div className="card-title">

        <h2>
          Order Summary
        </h2>

      </div>


      <div className="summary-container">

        <SummaryRow
          label="Subtotal"
          value={order.subtotal}
        />

        <SummaryRow
          label="Shipping"
          value={order.shipping}
        />

        <SummaryRow
          label="Tax"
          value={order.tax}
        />


        <div className="summary-row discount">

          <span>
            Discount
          </span>

          <strong>
            - Rs.{" "}
            {formatPrice(
              order.discount
            )}
          </strong>

        </div>


        <div className="summary-divider" />


        <div className="summary-total">

          <span>
            Total
          </span>

          <strong>
            Rs.{" "}
            {formatPrice(order.total)}
          </strong>

        </div>

      </div>

    </section>
  );
};


// ==========================================================
// SUMMARY ROW
// ==========================================================

interface SummaryRowProps {
  label: string;
  value: number | string;
}


const SummaryRow = ({
  label,
  value,
}: SummaryRowProps) => {
  return (
    <div className="summary-row">

      <span>
        {label}
      </span>

      <strong>
        Rs.{" "}
        {formatPrice(value)}
      </strong>

    </div>
  );
};


// ==========================================================
// ORDER NOTES
// ==========================================================

interface OrderNotesProps {
  notes: string;
}


const OrderNotes = ({
  notes,
}: OrderNotesProps) => {
  return (
    <section className="order-card">

      <div className="card-title">

        <h2>
          Order Notes
        </h2>

      </div>

      <p className="order-notes">
        {notes}
      </p>

    </section>
  );
};


// ==========================================================
// ACTIONS
// ==========================================================

const OrderActions = () => {
  return (
    <div className="order-bottom-actions">

      <Link
        to="/orders"
        className="back-orders-btn"
      >
        View My Orders
      </Link>

      <Link
        to="/"
        className="continue-shopping-btn"
      >
        Continue Shopping
      </Link>

    </div>
  );
};


// ==========================================================
// LOADING STATE
// ==========================================================

const LoadingState = () => {
  return (
    <>
      <Navbar />

      <main className="order-details-page">

        <div className="order-details-loading">

          <div
            className="order-spinner"
            aria-hidden="true"
          />

          <h2>
            Loading your order...
          </h2>

          <p>
            Please wait while we fetch
            your order details.
          </p>

        </div>

      </main>

      <Footer />
    </>
  );
};


// ==========================================================
// ERROR STATE
// ==========================================================

interface ErrorStateProps {
  message: string;
}


const ErrorState = ({
  message,
}: ErrorStateProps) => {
  return (
    <>
      <Navbar />

      <main className="order-details-page">

        <div className="order-details-error">

          <div
            className="error-icon"
            aria-hidden="true"
          >
            !
          </div>

          <h2>
            Unable to load order
          </h2>

          <p>
            {message}
          </p>

          <Link
            to="/orders"
            className="back-orders-btn"
          >
            View My Orders
          </Link>

        </div>

      </main>

      <Footer />
    </>
  );
};


// ==========================================================
// HELPERS
// ==========================================================

const formatPrice = (
  value: number | string
): string => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0.00";
  }

  return amount.toLocaleString(
    "en-PK",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
};


const formatDate = (
  value: string
): string => {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString(
    "en-PK",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
};


const formatStatus = (
  status: string
): string => {
  if (!status) {
    return "Pending";
  }

  return status
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};


const getOrderErrorMessage = (
  error: unknown
): string => {
  const status =
    getErrorStatus(error);

  switch (status) {
    case 401:
      return "Your session has expired. Please login again.";

    case 403:
      return "You are not authorized to view this order.";

    case 404:
      return "Order not found.";

    default:
      return "Failed to load order. Please try again.";
  }
};


const getErrorStatus = (
  error: unknown
): number | undefined => {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error)
  ) {
    return undefined;
  }

  const response = (
    error as {
      response?: {
        status?: number;
      };
    }
  ).response;

  return response?.status;
};


export default OrderDetails;