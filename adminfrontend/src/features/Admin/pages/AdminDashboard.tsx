import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FaBox,
  FaShoppingCart,
  FaTags,
  FaUsers,
  FaArrowUp,
} from "react-icons/fa";

import AdminLayout from "../components/AdminLayouts";

import "../styles/AdminDashboard.css";


// ==========================================================
// API
// ==========================================================

const API_URL = "";


// ==========================================================
// TYPES
// ==========================================================

interface DashboardStats {
  products: number;
  categories: number;
  orders: number;
  customers: number;
}

interface OrderStatusCounts {
  pending: number;
  processing: number;
  shipped: number;
  delivered: number;
}


// ==========================================================
// HELPERS
// ==========================================================

const getArrayFromResponse = (
  data: unknown
): unknown[] => {

  if (Array.isArray(data)) {
    return data;
  }

  if (
    typeof data === "object" &&
    data !== null
  ) {

    const response =
      data as {
        results?: unknown[];
        data?: unknown[];
      };

    if (Array.isArray(response.results)) {
      return response.results;
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }
  }

  return [];
};


// ==========================================================
// COMPONENT
// ==========================================================

const AdminDashboard = () => {

  const [stats, setStats] =
    useState<DashboardStats>({
      products: 0,
      categories: 0,
      orders: 0,
      customers: 0,
    });


  const [orderStatus, setOrderStatus] =
    useState<OrderStatusCounts>({
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
    });


  const [loading, setLoading] =
    useState(true);


  const [error, setError] =
    useState("");


// ==========================================================
// LOAD DASHBOARD DATA
// ==========================================================

  useEffect(() => {

    let cancelled = false;


    const fetchDashboard = async () => {

      try {

        /*
          Admin authentication uses:

          localStorage:
          - adminAccess
          - adminRefresh
          - adminUser

          OR

          sessionStorage:
          - adminAccess
          - adminRefresh
          - adminUser
        */

        const token =
          localStorage.getItem("adminAccess") ||
          sessionStorage.getItem("adminAccess");


        if (!token) {

          throw new Error(
            "Admin authentication token is missing."
          );

        }


        const config = {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        };


        // ----------------------------------------------------
        // LOAD PRODUCTS, CATEGORIES AND ORDERS
        // ----------------------------------------------------

        const [
          productsResponse,
          categoriesResponse,
          ordersResponse,
        ] = await Promise.all([

          axios.get(
            `${API_URL}/api/admin/products/`,
            config
          ),

          axios.get(
            `${API_URL}/api/admin/categories/`,
            config
          ),

          axios.get(
            `${API_URL}/api/admin/orders/`,
            config
          ),

        ]);


        if (cancelled) {
          return;
        }


        // ----------------------------------------------------
        // CONVERT RESPONSES TO ARRAYS
        // ----------------------------------------------------

        const products =
          getArrayFromResponse(
            productsResponse.data
          );


        const categories =
          getArrayFromResponse(
            categoriesResponse.data
          );


        const orders =
          getArrayFromResponse(
            ordersResponse.data
          );


        // ----------------------------------------------------
        // ORDER STATUS COUNTS
        // ----------------------------------------------------

        const statusCounts: OrderStatusCounts = {
          pending: 0,
          processing: 0,
          shipped: 0,
          delivered: 0,
        };


        orders.forEach((order) => {

          if (
            typeof order !== "object" ||
            order === null
          ) {
            return;
          }


          const orderData =
            order as {
              status?: string;
            };


          const status =
            orderData.status
              ?.trim()
              .toLowerCase();


          if (status === "pending") {

            statusCounts.pending++;

          } else if (status === "processing") {

            statusCounts.processing++;

          } else if (status === "shipped") {

            statusCounts.shipped++;

          } else if (status === "delivered") {

            statusCounts.delivered++;

          }

        });


        // ----------------------------------------------------
        // UPDATE STATE
        // ----------------------------------------------------

        setStats({

          products:
            products.length,

          categories:
            categories.length,

          orders:
            orders.length,

          /*
            Customer API is not implemented yet.
          */

          customers:
            0,

        });


        setOrderStatus(
          statusCounts
        );


        setError("");

      }

      catch (err: unknown) {

        if (cancelled) {
          return;
        }


        console.error(
          "Failed to load dashboard:",
          err
        );


        if (
          axios.isAxiosError(err)
        ) {

          if (
            err.response?.status === 401
          ) {

            setError(
              "Your admin session has expired. Please login again."
            );

          } else if (
            err.response?.status === 403
          ) {

            setError(
              "You are not authorized to access the admin dashboard."
            );

          } else {

            setError(
              "Failed to load dashboard data."
            );

          }

        } else if (
          err instanceof Error
        ) {

          setError(
            err.message
          );

        } else {

          setError(
            "Something went wrong while loading the dashboard."
          );

        }

      }

      finally {

        if (!cancelled) {
          setLoading(false);
        }

      }

    };


    fetchDashboard();


    return () => {

      cancelled = true;

    };

  }, []);


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <AdminLayout>

      <div className="admin-dashboard">

        {/* ==================================================
            WELCOME
        ================================================== */}

        <div className="dashboard-welcome">

          <div>

            <h2>
              Dashboard Overview
            </h2>

            <p>
              Here's what's happening with your store today.
            </p>

          </div>

        </div>


        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (

          <div className="dashboard-error">
            {error}
          </div>

        )}


        {/* ==================================================
            STAT CARDS
        ================================================== */}

        <div className="dashboard-stat-grid">


          {/* ==================================================
              PRODUCTS
          ================================================== */}

          <div className="dashboard-stat-card">

            <div className="stat-card-top">

              <div className="stat-icon products">
                <FaBox />
              </div>

              <span className="stat-growth">
                <FaArrowUp />
                0%
              </span>

            </div>

            <span className="stat-label">
              Total Products
            </span>

            <strong className="stat-value">

              {loading
                ? "..."
                : stats.products}

            </strong>

          </div>


          {/* ==================================================
              CATEGORIES
          ================================================== */}

          <div className="dashboard-stat-card">

            <div className="stat-card-top">

              <div className="stat-icon categories">
                <FaTags />
              </div>

              <span className="stat-growth">
                <FaArrowUp />
                0%
              </span>

            </div>

            <span className="stat-label">
              Categories
            </span>

            <strong className="stat-value">

              {loading
                ? "..."
                : stats.categories}

            </strong>

          </div>


          {/* ==================================================
              ORDERS
          ================================================== */}

          <div className="dashboard-stat-card">

            <div className="stat-card-top">

              <div className="stat-icon orders">
                <FaShoppingCart />
              </div>

              <span className="stat-growth">
                <FaArrowUp />
                0%
              </span>

            </div>

            <span className="stat-label">
              Total Orders
            </span>

            <strong className="stat-value">

              {loading
                ? "..."
                : stats.orders}

            </strong>

          </div>


          {/* ==================================================
              CUSTOMERS
          ================================================== */}

          <div className="dashboard-stat-card">

            <div className="stat-card-top">

              <div className="stat-icon customers">
                <FaUsers />
              </div>

              <span className="stat-growth">
                <FaArrowUp />
                0%
              </span>

            </div>

            <span className="stat-label">
              Customers
            </span>

            <strong className="stat-value">

              {loading
                ? "..."
                : stats.customers}

            </strong>

          </div>

        </div>


        {/* ==================================================
            CONTENT
        ================================================== */}

        <div className="dashboard-content-grid">


          {/* ==================================================
              SALES
          ================================================== */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <h3>
                  Sales Overview
                </h3>

                <p>
                  Your sales performance
                </p>

              </div>


              <select defaultValue="7">

                <option value="7">
                  Last 7 days
                </option>

                <option value="30">
                  Last 30 days
                </option>

                <option value="90">
                  Last 90 days
                </option>

              </select>

            </div>


            <div className="sales-placeholder">

              <div className="placeholder-line">
                Sales chart will appear here
              </div>

            </div>

          </div>


          {/* ==================================================
              ORDER STATUS
          ================================================== */}

          <div className="dashboard-panel">

            <div className="dashboard-panel-header">

              <div>

                <h3>
                  Order Status
                </h3>

                <p>
                  Current orders
                </p>

              </div>

            </div>


            <div className="order-status-list">


              <div>

                <span>
                  Pending
                </span>

                <strong>
                  {loading
                    ? "..."
                    : orderStatus.pending}
                </strong>

              </div>


              <div>

                <span>
                  Processing
                </span>

                <strong>
                  {loading
                    ? "..."
                    : orderStatus.processing}
                </strong>

              </div>


              <div>

                <span>
                  Shipped
                </span>

                <strong>
                  {loading
                    ? "..."
                    : orderStatus.shipped}
                </strong>

              </div>


              <div>

                <span>
                  Delivered
                </span>

                <strong>
                  {loading
                    ? "..."
                    : orderStatus.delivered}
                </strong>

              </div>


            </div>

          </div>

        </div>

      </div>

    </AdminLayout>
  );
};


export default AdminDashboard;