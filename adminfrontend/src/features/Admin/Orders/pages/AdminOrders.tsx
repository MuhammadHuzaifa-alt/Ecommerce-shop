import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import AdminLayout from "../../components/AdminLayouts";

import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
  type AdminOrder,
} from "../services/adminOrderService";

import "../styles/AdminOrders.css";


// ==========================================================
// STATUS OPTIONS
// ==========================================================

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];


// ==========================================================
// ADMIN ORDERS
// ==========================================================

const AdminOrders = () => {

  // ========================================================
  // ORDERS
  // ========================================================

  const [orders, setOrders] =
    useState<AdminOrder[]>([]);


  // ========================================================
  // LOADING
  // ========================================================

  const [loading, setLoading] =
    useState(true);

  const [actionLoading, setActionLoading] =
    useState<number | null>(null);


  // ========================================================
  // ERROR
  // ========================================================

  const [error, setError] =
    useState("");


  // ========================================================
  // SEARCH
  // ========================================================

  const [search, setSearch] =
    useState("");


  // ========================================================
  // STATUS FILTER
  // ========================================================

  const [statusFilter, setStatusFilter] =
    useState("All");


  // ========================================================
  // SELECTED ORDER
  // ========================================================

  const [selectedOrder, setSelectedOrder] =
    useState<AdminOrder | null>(null);


  // ========================================================
  // LOAD ORDERS
  // ========================================================

  const loadOrders = async () => {

    try {

      setLoading(true);
      setError("");

      const data =
        await getOrders();

      setOrders(data);

    } catch (error: unknown) {

      console.error(
        "Failed to load orders:",
        error
      );

      if (axios.isAxiosError(error)) {

        console.error(
          "Backend response:",
          error.response?.data
        );

        setError(
          error.response?.data?.detail ||
          "Failed to load orders."
        );

      } else {

        setError(
          "Failed to load orders."
        );

      }

    } finally {

      setLoading(false);

    }
  };


  // ========================================================
  // INITIAL LOAD
  // ========================================================

  useEffect(() => {

    let cancelled = false;


    const fetchOrders = async () => {

      try {

        const data =
          await getOrders();


        if (cancelled) {
          return;
        }


        setOrders(data);
        setError("");

      } catch (error: unknown) {

        if (cancelled) {
          return;
        }


        console.error(
          "Failed to load orders:",
          error
        );


        if (axios.isAxiosError(error)) {

          console.error(
            "Backend response:",
            error.response?.data
          );

          setError(
            error.response?.data?.detail ||
            "Failed to load orders."
          );

        } else {

          setError(
            "Failed to load orders."
          );

        }

      } finally {

        if (!cancelled) {

          setLoading(false);

        }

      }

    };


    fetchOrders();


    return () => {

      cancelled = true;

    };

  }, []);


  // ========================================================
  // FILTER ORDERS
  // ========================================================

  const filteredOrders =
    useMemo(() => {

      return orders.filter(
        (order) => {

          const searchValue =
            search
              .toLowerCase()
              .trim();


          const matchesSearch =
            !searchValue ||

            order.fullName
              ?.toLowerCase()
              .includes(searchValue) ||

            order.email
              ?.toLowerCase()
              .includes(searchValue) ||

            order.phone
              ?.toLowerCase()
              .includes(searchValue) ||

            String(order.id)
              .includes(searchValue);


          const matchesStatus =
            statusFilter === "All" ||
            order.status === statusFilter;


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      orders,
      search,
      statusFilter,
    ]);


  // ========================================================
  // UPDATE STATUS
  // ========================================================

  const handleStatusChange = async (
    id: number,
    status: string
  ) => {

    try {

      setActionLoading(id);
      setError("");

      const updatedOrder =
        await updateOrderStatus(
          id,
          status
        );


      // Update orders list

      setOrders(
        (previous) =>
          previous.map(
            (order) =>
              order.id === id
                ? updatedOrder
                : order
          )
      );


      // Update modal if open

      if (
        selectedOrder &&
        selectedOrder.id === id
      ) {

        setSelectedOrder(
          updatedOrder
        );

      }

    } catch (error: unknown) {

      console.error(
        "Failed to update order status:",
        error
      );


      if (axios.isAxiosError(error)) {

        console.error(
          "Backend response:",
          error.response?.data
        );

        setError(
          error.response?.data?.detail ||
          "Failed to update order status."
        );

      } else {

        setError(
          "Failed to update order status."
        );

      }

    } finally {

      setActionLoading(null);

    }
  };


  // ========================================================
  // DELETE ORDER
  // ========================================================

  const handleDelete = async (
    id: number
  ) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this order?"
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(id);
      setError("");

      await deleteOrder(id);


      setOrders(
        (previous) =>
          previous.filter(
            (order) =>
              order.id !== id
          )
      );


      if (
        selectedOrder?.id === id
      ) {

        setSelectedOrder(null);

      }

    } catch (error: unknown) {

      console.error(
        "Failed to delete order:",
        error
      );


      if (axios.isAxiosError(error)) {

        console.error(
          "Backend response:",
          error.response?.data
        );

        setError(
          error.response?.data?.detail ||
          "Failed to delete order."
        );

      } else {

        setError(
          "Failed to delete order."
        );

      }

    } finally {

      setActionLoading(null);

    }
  };


  // ========================================================
  // FORMAT DATE
  // ========================================================

  const formatDate = (
    date: string
  ) => {

    if (!date) {
      return "-";
    }

    return new Date(date)
      .toLocaleString();
  };


  // ========================================================
  // FORMAT STATUS
  // ========================================================

  const formatStatus = (
    status: string
  ) => {

    return (
      status.charAt(0).toUpperCase() +
      status.slice(1)
    );
  };


  // ========================================================
  // ORDER COUNTS
  // ========================================================

  const pendingCount =
    orders.filter(
      (order) =>
        order.status === "pending"
    ).length;


  const processingCount =
    orders.filter(
      (order) =>
        order.status === "processing"
    ).length;


  const shippedCount =
    orders.filter(
      (order) =>
        order.status === "shipped"
    ).length;


  const deliveredCount =
    orders.filter(
      (order) =>
        order.status === "delivered"
    ).length;


  // ========================================================
  // LOADING
  // ========================================================

  if (loading) {

    return (

      <AdminLayout>

        <div className="admin-page">

          <div className="orders-loading">

            Loading orders...

          </div>

        </div>

      </AdminLayout>

    );
  }


  // ========================================================
  // PAGE
  // ========================================================

  return (

    <AdminLayout>

      <div className="admin-page admin-orders-page">


        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="admin-page-header">

          <div>

            <h1>
              Orders
            </h1>

            <p>
              Manage customer orders,
              payments and delivery status.
            </p>

          </div>


          <button
            type="button"
            className="refresh-orders-btn"
            onClick={loadOrders}
            disabled={loading}
          >
            Refresh Orders
          </button>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="orders-error">

            {error}

          </div>

        )}


        {/* ==================================================
            STATISTICS
        ================================================== */}

        <div className="order-statistics">

          <div className="order-stat-card">

            <span>
              Total Orders
            </span>

            <strong>
              {orders.length}
            </strong>

          </div>


          <div className="order-stat-card">

            <span>
              Pending
            </span>

            <strong>
              {pendingCount}
            </strong>

          </div>


          <div className="order-stat-card">

            <span>
              Processing
            </span>

            <strong>
              {processingCount}
            </strong>

          </div>


          <div className="order-stat-card">

            <span>
              Shipped
            </span>

            <strong>
              {shippedCount}
            </strong>

          </div>


          <div className="order-stat-card">

            <span>
              Delivered
            </span>

            <strong>
              {deliveredCount}
            </strong>

          </div>

        </div>


        {/* ==================================================
            FILTERS
        ================================================== */}

        <div className="orders-filter-card">

          <div className="orders-search">

            <input
              type="text"
              placeholder="Search by order ID, customer, email or phone..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />

          </div>


          <div className="orders-status-filter">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
            >

              <option value="All">
                All Statuses
              </option>

              {ORDER_STATUSES.map(
                (status) => (

                  <option
                    key={status}
                    value={status}
                  >
                    {formatStatus(status)}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* ==================================================
            ORDERS TABLE
        ================================================== */}

        <div className="orders-card">

          <div className="orders-card-header">

            <div>

              <h2>
                All Orders
              </h2>

              <p>
                Showing{" "}
                {filteredOrders.length}
                {" "}of{" "}
                {orders.length}
                {" "}orders
              </p>

            </div>

          </div>


          {filteredOrders.length === 0 ? (

            <div className="orders-empty">

              <h3>
                No Orders Found
              </h3>

              <p>
                There are no orders matching
                your search or filter.
              </p>

            </div>

          ) : (

            <div className="orders-table-wrapper">

              <table className="orders-table">

                <thead>

                  <tr>

                    <th>
                      Order
                    </th>

                    <th>
                      Customer
                    </th>

                    <th>
                      Items
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Total
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Actions
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredOrders.map(
                    (order) => (

                      <tr
                        key={order.id}
                      >

                        {/* ORDER */}

                        <td>

                          <strong>
                            #{order.id}
                          </strong>

                        </td>


                        {/* CUSTOMER */}

                        <td>

                          <div className="order-customer">

                            <strong>
                              {order.fullName}
                            </strong>

                            <span>
                              {order.email}
                            </span>

                            <span>
                              {order.phone}
                            </span>

                          </div>

                        </td>


                        {/* ITEMS */}

                        <td>

                          <span className="items-count">

                            {order.items?.length || 0}

                            {" "}

                            {order.items?.length === 1
                              ? "Item"
                              : "Items"}

                          </span>

                        </td>


                        {/* PAYMENT */}

                        <td>

                          <span className="payment-method">

                            {order.paymentMethod}

                          </span>

                        </td>


                        {/* TOTAL */}

                        <td>

                          <strong className="order-total">

                            $
                            {Number(
                              order.total
                            ).toFixed(2)}

                          </strong>

                        </td>


                        {/* DATE */}

                        <td>

                          <span className="order-date">

                            {formatDate(
                              order.createdAt
                            )}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td>

                          <select
                            className={`order-status-select status-${order.status
                              ?.toLowerCase()
                              .replace(
                                /\s+/g,
                                "-"
                              )}`}
                            value={
                              order.status
                            }
                            disabled={
                              actionLoading ===
                              order.id
                            }
                            onChange={(
                              event
                            ) =>
                              handleStatusChange(
                                order.id,
                                event.target.value
                              )
                            }
                          >

                            {ORDER_STATUSES.map(
                              (status) => (

                                <option
                                  key={status}
                                  value={status}
                                >
                                  {formatStatus(status)}
                                </option>

                              )
                            )}

                          </select>

                        </td>


                        {/* ACTIONS */}

                        <td>

                          <div className="order-actions">

                            <button
                              type="button"
                              className="view-order-btn"
                              onClick={() =>
                                setSelectedOrder(
                                  order
                                )
                              }
                            >
                              View
                            </button>


                            <button
                              type="button"
                              className="delete-order-btn"
                              disabled={
                                actionLoading ===
                                order.id
                              }
                              onClick={() =>
                                handleDelete(
                                  order.id
                                )
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* ==================================================
            ORDER DETAILS MODAL
        ================================================== */}

        {selectedOrder && (

          <div
            className="order-modal-overlay"
            onClick={() =>
              setSelectedOrder(null)
            }
          >

            <div
              className="order-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              {/* ==================================================
                  MODAL HEADER
              ================================================== */}

              <div className="order-modal-header">

                <div>

                  <h2>
                    Order #{selectedOrder.id}
                  </h2>

                  <p>
                    {formatDate(
                      selectedOrder.createdAt
                    )}
                  </p>

                </div>


                <button
                  type="button"
                  className="close-modal-btn"
                  onClick={() =>
                    setSelectedOrder(null)
                  }
                >
                  ×
                </button>

              </div>


              {/* ==================================================
                  CUSTOMER
              ================================================== */}

              <div className="order-detail-section">

                <h3>
                  Customer Information
                </h3>


                <div className="order-detail-grid">

                  <div>

                    <label>
                      Full Name
                    </label>

                    <p>
                      {selectedOrder.fullName}
                    </p>

                  </div>


                  <div>

                    <label>
                      Phone
                    </label>

                    <p>
                      {selectedOrder.phone}
                    </p>

                  </div>


                  <div>

                    <label>
                      Email
                    </label>

                    <p>
                      {selectedOrder.email}
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  ADDRESS
              ================================================== */}

              <div className="order-detail-section">

                <h3>
                  Shipping Address
                </h3>


                <p className="shipping-address">

                  {selectedOrder.address}

                  {selectedOrder.apartment && (
                    <>
                      ,{" "}
                      {selectedOrder.apartment}
                    </>
                  )}

                  <br />

                  {selectedOrder.city},{" "}
                  {selectedOrder.state}

                  <br />

                  {selectedOrder.postalCode},{" "}
                  {selectedOrder.country}

                </p>

              </div>


              {/* ==================================================
                  DELIVERY & PAYMENT
              ================================================== */}

              <div className="order-detail-section">

                <h3>
                  Delivery & Payment
                </h3>


                <div className="order-detail-grid">

                  <div>

                    <label>
                      Delivery
                    </label>

                    <p>
                      {selectedOrder.deliveryMethod}
                    </p>

                  </div>


                  <div>

                    <label>
                      Estimated Delivery
                    </label>

                    <p>
                      {selectedOrder.deliveryDays}
                    </p>

                  </div>


                  <div>

                    <label>
                      Payment
                    </label>

                    <p>
                      {selectedOrder.paymentMethod}
                    </p>

                  </div>


                  <div>

                    <label>
                      Status
                    </label>

                    <select
                      className="modal-status-select"
                      value={
                        selectedOrder.status
                      }
                      disabled={
                        actionLoading ===
                        selectedOrder.id
                      }
                      onChange={(event) =>
                        handleStatusChange(
                          selectedOrder.id,
                          event.target.value
                        )
                      }
                    >

                      {ORDER_STATUSES.map(
                        (status) => (

                          <option
                            key={status}
                            value={status}
                          >
                            {formatStatus(status)}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  PRODUCTS
              ================================================== */}

              <div className="order-detail-section">

                <h3>
                  Products
                </h3>


                <div className="order-products">

                  {selectedOrder.items?.map(
                    (item) => (

                      <div
                        className="order-product"
                        key={item.id}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />


                        <div>

                          <strong>
                            {item.name}
                          </strong>

                          <span>
                            Qty: {item.quantity}
                          </span>

                        </div>


                        <strong>

                          $
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toFixed(2)}

                        </strong>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* ==================================================
                  PRICE SUMMARY
              ================================================== */}

              <div className="order-detail-section">

                <h3>
                  Order Summary
                </h3>


                <div className="admin-order-summary">

                  <div>

                    <span>
                      Subtotal
                    </span>

                    <strong>
                      $
                      {Number(
                        selectedOrder.subtotal
                      ).toFixed(2)}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Shipping
                    </span>

                    <strong>
                      $
                      {Number(
                        selectedOrder.shipping
                      ).toFixed(2)}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Delivery Fee
                    </span>

                    <strong>
                      $
                      {Number(
                        selectedOrder.deliveryFee
                      ).toFixed(2)}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Tax
                    </span>

                    <strong>
                      $
                      {Number(
                        selectedOrder.tax
                      ).toFixed(2)}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Discount
                    </span>

                    <strong>
                      -$
                      {Number(
                        selectedOrder.discount
                      ).toFixed(2)}
                    </strong>

                  </div>


                  <div className="grand-total">

                    <span>
                      Total
                    </span>

                    <strong>
                      $
                      {Number(
                        selectedOrder.total
                      ).toFixed(2)}
                    </strong>

                  </div>

                </div>

              </div>


              {/* ==================================================
                  NOTES
              ================================================== */}

              {selectedOrder.notes && (

                <div className="order-detail-section">

                  <h3>
                    Customer Notes
                  </h3>

                  <p className="order-notes">

                    {selectedOrder.notes}

                  </p>

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </AdminLayout>

  );
};


export default AdminOrders;