import {
  createContext,
} from "react";

import type { Product } from "../../products/types/product";


// ==========================================
// CART ITEM
// ==========================================

export interface CartItem extends Product {
  quantity: number;
}


// ==========================================
// CONTEXT TYPE
// ==========================================

export interface CartContextType {
  cartItems: CartItem[];

  addToCart: (product: Product) => void;

  increaseQuantity: (id: number) => void;

  decreaseQuantity: (id: number) => void;

  updateQuantity: (
    id: number,
    quantity: number
  ) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;

  cartItemCount: number;

  subtotal: number;
}


// ==========================================
// CONTEXT
// ==========================================

export const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );