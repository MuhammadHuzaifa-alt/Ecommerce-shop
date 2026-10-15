import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./wishlistbutton.css";

import type { Product } from "../../types/product";
import { useWishlist } from "../../../../hooks/useWishlist";

interface WishlistButtonProps {
    product: Product;
}

const WishlistButton = ({
    product,
}: WishlistButtonProps) => {

    const { isInWishlist, toggleWishlist } = useWishlist();

    const favorite = isInWishlist(product.id);

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {

        e.stopPropagation();

        toggleWishlist(product);
    };

    return (
        <button
            className={`wishlist-btn ${
                favorite ? "active" : ""
            }`}
            onClick={handleClick}
            aria-label={
                favorite
                    ? "Remove from Wishlist"
                    : "Add to Wishlist"
            }
        >
            {favorite ? (
                <FaHeart />
            ) : (
                <FaRegHeart />
            )}
        </button>
    );
};

export default WishlistButton;