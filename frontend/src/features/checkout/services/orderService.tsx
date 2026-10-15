import api from "../../../services/api";

// ======================================================
// TYPES
// ======================================================

export interface OrderItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

export interface CreateOrderData {
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

    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;

    items: OrderItem[];
}

export interface Order {
    id: number;

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
    delivery_fee: number;

    payment_method: string;
    payment_status: string;

    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;

    status: string;

    items: {
        id: number;
        product_id: number;
        product_name: string;
        product_image: string;
        price: number;
        quantity: number;
        subtotal: number;
    }[];

    created_at: string;
    updated_at: string;
}

// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = async (
    data: CreateOrderData
): Promise<Order> => {
    const response = await api.post(
        "/orders/create/",
        data
    );

    return response.data.order;
};

// ======================================================
// GET MY ORDERS
// ======================================================

export const getMyOrders = async (): Promise<Order[]> => {
    const response = await api.get(
        "/orders/my-orders/"
    );

    return response.data;
};

// ======================================================
// GET SINGLE ORDER
// ======================================================

export const getMyOrder = async (
    id: number
): Promise<Order> => {
    const response = await api.get(
        `/orders/my-orders/${id}/`
    );

    return response.data;
};
