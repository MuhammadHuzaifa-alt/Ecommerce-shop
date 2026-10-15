import type { ReactNode } from "react";

// ==========================================================
// CHECKOUT FORM
// ==========================================================

export interface CheckoutFormData {
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
}

// ==========================================================
// DELIVERY
// ==========================================================

export interface DeliveryOption {
  id: number;
  name: string;
  description: string;
  estimatedDays: string;
  fee: number;
  icon: ReactNode;
}

// ==========================================================
// PAYMENT
// ==========================================================

export interface PaymentOption {
  id: number;
  name: string;
  description: string;
  icon: ReactNode;
}

// ==========================================================
// CHECKOUT ORDER ITEM
// ==========================================================

export interface CheckoutOrderItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

// ==========================================================
// ORDER SUMMARY ITEM
// ==========================================================

export type OrderItem = CheckoutOrderItem;

// ==========================================================
// PAYMENT METHOD
// ==========================================================

export type PaymentMethod = string;

// ==========================================================
// ORDER TOTALS
// ==========================================================

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
}

// Backward-compatible alias
export type CheckoutTotals = OrderTotals;

// ==========================================================
// ORDER STATUS
// ==========================================================

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";