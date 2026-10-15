import {
  useMemo,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import axios from "axios";

import {useCart,} from "../../cart/context/useCart";

import type {
  CheckoutFormData,
  DeliveryOption,
  PaymentOption,
} from "../types/checkout.types";

import {
  calculateCheckoutTotals,
  createOrderItems,
  isCheckoutFormValid,
} from "../utils/checkout.utils";

import {
  DEFAULT_DELIVERY_ID,
  DEFAULT_PAYMENT_ID,
} from "../constants/checkout.constants";

import {
  createOrder,
} from "../services/orderService";


const INITIAL_CUSTOMER: CheckoutFormData = {
  fullName: "",
  phone: "",
  email: "",
  country: "",
  state: "",
  city: "",
  postalCode: "",
  address: "",
  apartment: "",
  notes: "",
};


const INITIAL_DELIVERY: DeliveryOption = {
  id: DEFAULT_DELIVERY_ID,
  name: "Standard Delivery",
  description: "Affordable shipping",
  estimatedDays: "3–5 Business Days",
  fee: 5,
  icon: null,
};


const INITIAL_PAYMENT: PaymentOption = {
  id: DEFAULT_PAYMENT_ID,
  name: "Cash on Delivery",
  description:
    "Pay when your order is delivered",
  icon: null,
};


export const useCheckout = () => {

  const navigate = useNavigate();

  const {
    cartItems,
    subtotal,
    clearCart,
  } = useCart();


  const [
    customer,
    setCustomer,
  ] = useState<CheckoutFormData>(
    INITIAL_CUSTOMER
  );


  const [
    delivery,
    setDelivery,
  ] = useState<DeliveryOption>(
    INITIAL_DELIVERY
  );


  const [
    payment,
    setPayment,
  ] = useState<PaymentOption>(
    INITIAL_PAYMENT
  );


  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    error,
    setError,
  ] = useState("");


  // ========================================================
  // ORDER ITEMS
  // ========================================================

  const orderItems = useMemo(
    () => createOrderItems(cartItems),
    [cartItems]
  );


  // ========================================================
  // TOTALS
  // ========================================================

  const totals = useMemo(
    () =>
      calculateCheckoutTotals(
        Number(subtotal),
        Number(delivery.fee),
        cartItems.length > 0
      ),
    [
      subtotal,
      delivery.fee,
      cartItems.length,
    ]
  );


  // ========================================================
  // PLACE ORDER
  // ========================================================

  const placeOrder = async () => {

    setError("");


    if (cartItems.length === 0) {
      setError(
        "Your cart is empty."
      );

      return;
    }


    if (!isCheckoutFormValid(customer)) {
      setError(
        "Please complete all required information."
      );

      return;
    }


    const token =
      localStorage.getItem("access") ??
      sessionStorage.getItem("access");


    if (!token) {
      setError(
        "Please login before placing your order."
      );

      return;
    }


    const orderData = {

      fullName:
        customer.fullName,

      phone:
        customer.phone,

      email:
        customer.email,

      country:
        customer.country,

      state:
        customer.state,

      city:
        customer.city,

      postalCode:
        customer.postalCode,

      address:
        customer.address,

      apartment:
        customer.apartment,

      notes:
        customer.notes,

      deliveryMethod:
        delivery.name,

      deliveryDays:
        delivery.estimatedDays,

      deliveryFee:
        Number(delivery.fee),

      paymentMethod:
        payment.name,

      subtotal:
        totals.subtotal,

      shipping:
        totals.shipping,

      tax:
        totals.tax,

      discount:
        totals.discount,

      total:
        totals.total,

      items:
        orderItems,
    };


    try {

      setLoading(true);


      const createdOrder =
        await createOrder(
          orderData
        );


      if (!createdOrder?.id) {
        throw new Error(
          "Order ID was not returned."
        );
      }


      clearCart();


      navigate(
        `/orders/${createdOrder.id}`
      );

    } catch (err: unknown) {

      console.error(
        "Order creation failed:",
        err
      );


      if (axios.isAxiosError(err)) {

        const status =
          err.response?.status;

        if (status === 400) {
          setError(
            "Invalid order information. Please check your details."
          );
        } else if (status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else if (status === 403) {
          setError(
            "You are not authorized to place this order."
          );
        } else {
          setError(
            err.response?.data?.detail ||
            "Failed to place order. Please try again."
          );
        }

      } else {

        setError(
          "Something went wrong while placing the order."
        );
      }

    } finally {

      setLoading(false);

    }
  };


  return {
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
  };
};