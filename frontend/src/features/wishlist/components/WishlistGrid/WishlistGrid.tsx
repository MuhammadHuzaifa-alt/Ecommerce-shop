import "./WishlistGrid.css";

import WishlistItem from "../WishlistItem/WishlistItem";
import EmptyWishlist from "../EmptyWishlist/EmptyWishlist";

export interface WishlistProduct {
  id: number;
  image: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  stock: boolean;
}

interface WishlistGridProps {
  items: WishlistProduct[];
  onMoveToCart: (id: number) => void;
  onRemove: (id: number) => void;
}

const WishlistGrid = ({
  items,
  onMoveToCart,
  onRemove,
}: WishlistGridProps) => {
  /*
   * Show empty wishlist component
   * when there are no favorite products.
   */
  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <section className="wishlist-grid">
      {items.map((item) => (
        <WishlistItem
          key={item.id}
          {...item}
          onMoveToCart={onMoveToCart}
          onRemove={onRemove}
        />
      ))}
    </section>
  );
};

export default WishlistGrid;
