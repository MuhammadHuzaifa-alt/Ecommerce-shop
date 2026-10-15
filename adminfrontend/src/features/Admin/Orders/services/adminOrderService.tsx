import axios from "axios";

const ORDERS_API_URL = "/api/admin/orders/";


// ==========================================================
// GET ADMIN ACCESS TOKEN
// ==========================================================

const getAdminAccessToken = (): string | null => {

  return (
    localStorage.getItem("adminAccess") ||
    sessionStorage.getItem("adminAccess")
  );
};


// ==========================================================
// AUTHENTICATED AXIOS CONFIG
// ==========================================================

const getAuthConfig = () => {

  const token = getAdminAccessToken();

  if (!token) {
    throw new Error(
      "No admin access token found. Please login again."
    );
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};


// ==========================================================
// API ITEM RESPONSE
// ==========================================================

interface OrderItemAPI {
  id: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: string | number;
  quantity: number;
  subtotal: string | number;
}


// ==========================================================
// API ORDER RESPONSE
// ==========================================================

interface OrderAPI {
  id: number;
  user: number | null;

  full_name: string;
  phone: string;
  email: string;

  country: string;
  state: string;
  city: string;
  postal_code: string;
  address: string;
  apartment: string;
  notes: string;

  delivery_method: string;
  delivery_days: string;
  delivery_fee: string | number;

  payment_method: string;
  payment_status: string;

  subtotal: string | number;
  shipping: string | number;
  tax: string | number;
  discount: string | number;
  total: string | number;

  status: string;

  items: OrderItemAPI[];

  created_at: string;
  updated_at: string;
}


// ==========================================================
// FRONTEND ORDER ITEM
// ==========================================================

export interface AdminOrderItem {
  id: number;
  productId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}


// ==========================================================
// FRONTEND ORDER
// ==========================================================

export interface AdminOrder {
  id: number;

  fullName: string;
  phone: string;
  email: string;

  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  apartment: string;
  notes: string;

  deliveryMethod: string;
  deliveryDays: string;
  deliveryFee: number;

  paymentMethod: string;
  paymentStatus: string;

  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;

  status: string;

  items: AdminOrderItem[];

  createdAt: string;
  updatedAt?: string;
}


// ==========================================================
// CONVERT API ORDER → FRONTEND ORDER
// ==========================================================

const mapOrder = (
  order: OrderAPI
): AdminOrder => {

  return {
    id: order.id,

    fullName: order.full_name,
    phone: order.phone,
    email: order.email,

    country: order.country,
    state: order.state,
    city: order.city,
    postalCode: order.postal_code,
    address: order.address,
    apartment: order.apartment,
    notes: order.notes,

    deliveryMethod: order.delivery_method,
    deliveryDays: order.delivery_days,
    deliveryFee: Number(order.delivery_fee),

    paymentMethod: order.payment_method,
    paymentStatus: order.payment_status,

    subtotal: Number(order.subtotal),
    shipping: Number(order.shipping),
    tax: Number(order.tax),
    discount: Number(order.discount),
    total: Number(order.total),

    status: order.status,

    items: (order.items || []).map(
      (item) => ({
        id: item.id,
        productId: item.product_id,
        name: item.product_name,
        image: item.product_image,
        price: Number(item.price),
        quantity: item.quantity,
        subtotal: Number(item.subtotal),
      })
    ),

    createdAt: order.created_at,
    updatedAt: order.updated_at,
  };
};


// ==========================================================
// GET ALL ORDERS
// ==========================================================

export const getOrders = async (): Promise<AdminOrder[]> => {

  const response = await axios.get<OrderAPI[]>(
    ORDERS_API_URL,
    getAuthConfig()
  );

  console.log(
    "ADMIN ORDERS API RESPONSE:",
    response.data
  );

  return response.data.map(mapOrder);
};


// ==========================================================
// GET SINGLE ORDER
// ==========================================================

export const getOrder = async (
  id: number
): Promise<AdminOrder> => {

  const response =
    await axios.get<OrderAPI>(
      `${ORDERS_API_URL}${id}/`,
      getAuthConfig()
    );

  return mapOrder(response.data);
};


// ==========================================================
// UPDATE ORDER STATUS
// ==========================================================

export const updateOrderStatus = async (
  id: number,
  status: string
): Promise<AdminOrder> => {

  const response = await axios.patch<{
    message: string;
    order: OrderAPI;
  }>(
    `${ORDERS_API_URL}${id}/`,
    {
      status: status.toLowerCase(),
    },
    getAuthConfig()
  );

  return mapOrder(
    response.data.order
  );
};

// ==========================================================
// DELETE ORDER
// ==========================================================

export const deleteOrder = async (
  id: number
): Promise<void> => {

  await axios.delete(
    `${ORDERS_API_URL}${id}/`,
    getAuthConfig()
  );
};