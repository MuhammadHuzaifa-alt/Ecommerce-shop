import { createContext } from "react";

import type { Product } from "../features/products/types/product";

export interface WishlistContextType {
    wishlist: Product[];

    addToWishlist: (
        product: Product
    ) => void;

    removeFromWishlist: (
        productId: number
    ) => void;

    isInWishlist: (
        productId: number
    ) => boolean;

    toggleWishlist: (
        product: Product
    ) => void;
}

export const WishlistContext =
    createContext<WishlistContextType | null>(null);