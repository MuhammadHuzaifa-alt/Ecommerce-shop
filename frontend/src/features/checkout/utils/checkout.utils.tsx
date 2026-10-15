import type {
  CheckoutFormData,
  CheckoutOrderItem,
  CheckoutTotals,
} from "../types/checkout.types";

import type { CartItem } from "../../cart/context/CartContext";


// ==========================================================
// REQUIRED FIELDS
// ==========================================================

const REQUIRED_FIELDS: Array<
  keyof CheckoutFormData
> = [
  "fullName",
  "phone",
  "email",
  "country",
  "state",
  "city",
  "postalCode",
  "address",
];


// ==========================================================
// VALIDATE CUSTOMER
// ==========================================================

export const isCheckoutFormValid = (
  customer: CheckoutFormData
): boolean => {
  return REQUIRED_FIELDS.every(
    (field) =>
      customer[field].trim().length > 0
  );
};


// ==========================================================
// CREATE ORDER ITEMS
// ==========================================================

export const createOrderItems = (
  cartItems: CartItem[]
): CheckoutOrderItem[] => {
  return cartItems.map((item) => ({
    id: item.id,
    name: item.name,
    image: item.image ?? "",
    price: Number(item.price),
    quantity: Number(item.quantity),
  }));
};


// ==========================================================
// CALCULATE TOTALS
// ==========================================================

export const calculateCheckoutTotals = (
  subtotal: number,
  deliveryFee: number,
  hasItems: boolean
): CheckoutTotals => {

  const shipping = hasItems
    ? deliveryFee
    : 0;

  const tax = subtotal * 0.05;

  const discount = hasItems
    ? 10
    : 0;

  const total =
    subtotal +
    shipping +
    tax -
    discount;

  return {
    subtotal,
    shipping,
    tax,
    discount,
    total,
  };
};