import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Product } from "../../products/types/product";

import {
  CartContext,
  type CartItem,
  type CartContextType,
} from "./CartContext";


// ==========================================
// CONSTANTS
// ==========================================

const CART_STORAGE_KEY = "cart";

const DEFAULT_MIN_QUANTITY = 1;

const DEFAULT_MAX_QUANTITY = 99;


// ==========================================
// PROVIDER PROPS
// ==========================================

interface CartProviderProps {
  children: ReactNode;
}


// ==========================================
// VALIDATE CART ITEM
// ==========================================

const isValidCartItem = (
  item: unknown
): item is CartItem => {
  if (
    typeof item !== "object" ||
    item === null
  ) {
    return false;
  }

  const cartItem =
    item as Partial<CartItem>;

  return (
    typeof cartItem.id === "number" &&
    typeof cartItem.price === "number" &&
    Number.isFinite(cartItem.price) &&
    cartItem.price >= 0 &&
    typeof cartItem.quantity === "number" &&
    Number.isInteger(cartItem.quantity) &&
    cartItem.quantity >= DEFAULT_MIN_QUANTITY
  );
};


// ==========================================
// LOAD CART
// ==========================================

const loadCart = (): CartItem[] => {
  try {
    const savedCart =
      localStorage.getItem(
        CART_STORAGE_KEY
      );

    if (!savedCart) {
      return [];
    }

    const parsed: unknown =
      JSON.parse(savedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
};


// ==========================================
// PROVIDER
// ==========================================

export const CartProvider = ({
  children,
}: CartProviderProps) => {
  const [cartItems, setCartItems] =
    useState<CartItem[]>(loadCart);


  // ========================================
  // SAVE CART
  // ========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [cartItems]);


  // ========================================
  // ADD TO CART
  // ========================================

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((items) => {
        const existingItem =
          items.find(
            (item) =>
              item.id === product.id
          );

        if (existingItem) {
          return items.map((item) => {
            if (
              item.id !== product.id
            ) {
              return item;
            }

            const nextQuantity =
              Math.min(
                item.quantity + 1,
                DEFAULT_MAX_QUANTITY
              );

            return {
              ...item,
              quantity: nextQuantity,
            };
          });
        }

        return [
          ...items,
          {
            ...product,
            quantity:
              DEFAULT_MIN_QUANTITY,
          },
        ];
      });
    },
    []
  );


  // ========================================
  // UPDATE QUANTITY
  // ========================================

  const updateQuantity = useCallback(
    (
      id: number,
      quantity: number
    ) => {
      if (
        !Number.isInteger(quantity) ||
        quantity < DEFAULT_MIN_QUANTITY
      ) {
        return;
      }

      const safeQuantity =
        Math.min(
          quantity,
          DEFAULT_MAX_QUANTITY
        );

      setCartItems((items) =>
        items.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: safeQuantity,
              }
            : item
        )
      );
    },
    []
  );


  // ========================================
  // INCREASE QUANTITY
  // ========================================

  const increaseQuantity =
    useCallback(
      (id: number) => {
        setCartItems((items) =>
          items.map((item) => {
            if (item.id !== id) {
              return item;
            }

            if (
              item.quantity >=
              DEFAULT_MAX_QUANTITY
            ) {
              return item;
            }

            return {
              ...item,
              quantity:
                item.quantity + 1,
            };
          })
        );
      },
      []
    );


  // ========================================
  // DECREASE QUANTITY
  // ========================================

  const decreaseQuantity =
    useCallback(
      (id: number) => {
        setCartItems((items) =>
          items.map((item) => {
            if (item.id !== id) {
              return item;
            }

            if (
              item.quantity <=
              DEFAULT_MIN_QUANTITY
            ) {
              return item;
            }

            return {
              ...item,
              quantity:
                item.quantity - 1,
            };
          })
        );
      },
      []
    );


  // ========================================
  // REMOVE
  // ========================================

  const removeFromCart = useCallback(
    (id: number) => {
      setCartItems((items) =>
        items.filter(
          (item) =>
            item.id !== id
        )
      );
    },
    []
  );


  // ========================================
  // CLEAR
  // ========================================

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);


  // ========================================
  // TOTAL ITEMS
  // ========================================

  const cartItemCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.quantity,
        0
      ),
    [cartItems]
  );


  // ========================================
  // SUBTOTAL
  // ========================================

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          Number(item.price) *
            item.quantity,
        0
      ),
    [cartItems]
  );


  // ========================================
  // CONTEXT VALUE
  // ========================================

  const contextValue =
    useMemo<CartContextType>(
      () => ({
        cartItems,

        addToCart,

        increaseQuantity,

        decreaseQuantity,

        updateQuantity,

        removeFromCart,

        clearCart,

        cartItemCount,

        subtotal,
      }),
      [
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartItemCount,
        subtotal,
      ]
    );


  // ========================================
  // PROVIDER
  // ========================================

  return (
    <CartContext.Provider
      value={contextValue}
    >
      {children}
    </CartContext.Provider>
  );
};