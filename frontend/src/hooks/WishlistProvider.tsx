import {
    useEffect,
    useState,
    type ReactNode,
} from "react";

import type { Product } from "../features/products/types/product";

import { WishlistContext } from "./WishlistContext";


// ==========================================================
// CONSTANTS
// ==========================================================

const WISHLIST_STORAGE_KEY = "wishlist";


// ==========================================================
// LOAD WISHLIST
// ==========================================================

const loadWishlist = (): Product[] => {

    const savedWishlist =
        localStorage.getItem(
            WISHLIST_STORAGE_KEY
        );

    if (!savedWishlist) {
        return [];
    }

    try {

        const parsedWishlist =
            JSON.parse(savedWishlist);

        if (!Array.isArray(parsedWishlist)) {
            return [];
        }

        return parsedWishlist as Product[];

    } catch {

        localStorage.removeItem(
            WISHLIST_STORAGE_KEY
        );

        return [];
    }
};


// ==========================================================
// WISHLIST PROVIDER
// ==========================================================

export const WishlistProvider = ({
    children,
}: {
    children: ReactNode;
}) => {

    const [
        wishlist,
        setWishlist,
    ] = useState<Product[]>(
        loadWishlist
    );


    // ======================================================
    // PERSIST WISHLIST
    // ======================================================

    useEffect(() => {

        localStorage.setItem(
            WISHLIST_STORAGE_KEY,
            JSON.stringify(wishlist)
        );

    }, [wishlist]);


    // ======================================================
    // ADD TO WISHLIST
    // ======================================================

    const addToWishlist = (
        product: Product
    ) => {

        setWishlist(
            (currentWishlist) => {

                const alreadyExists =
                    currentWishlist.some(
                        (item) =>
                            item.id === product.id
                    );

                if (alreadyExists) {
                    return currentWishlist;
                }

                return [
                    ...currentWishlist,
                    product,
                ];
            }
        );
    };


    // ======================================================
    // REMOVE FROM WISHLIST
    // ======================================================

    const removeFromWishlist = (
        productId: number
    ) => {

        setWishlist(
            (currentWishlist) =>
                currentWishlist.filter(
                    (item) =>
                        item.id !== productId
                )
        );
    };


    // ======================================================
    // CHECK WISHLIST
    // ======================================================

    const isInWishlist = (
        productId: number
    ) => {

        return wishlist.some(
            (item) =>
                item.id === productId
        );
    };


    // ======================================================
    // TOGGLE WISHLIST
    // ======================================================

    const toggleWishlist = (
        product: Product
    ) => {

        setWishlist(
            (currentWishlist) => {

                const exists =
                    currentWishlist.some(
                        (item) =>
                            item.id === product.id
                    );

                if (exists) {

                    return currentWishlist.filter(
                        (item) =>
                            item.id !== product.id
                    );
                }

                return [
                    ...currentWishlist,
                    product,
                ];
            }
        );
    };


    // ======================================================
    // PROVIDER
    // ======================================================

    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                addToWishlist,
                removeFromWishlist,
                isInWishlist,
                toggleWishlist,
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
};