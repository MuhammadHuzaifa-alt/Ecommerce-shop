import "./productimage.css";

interface ProductImageProps {
  image: string;
  name: string;
  discount?: number;
  isNew?: boolean;
  outOfStock?: boolean;
}

const ProductImage = ({
  image,
  name,
  discount,
  isNew,
  outOfStock,
}: ProductImageProps) => {
  return (
    <div className="product-image">
      <img
        src={image}
        alt={name}
      />

      {discount && (
        <span className="discount">
          -{discount}%
        </span>
      )}

      {isNew && (
        <span className="new">
          New
        </span>
      )}

      {outOfStock && (
        <div className="out-stock-overlay">
          Out Of Stock
        </div>
      )}
    </div>
  );
};

export default ProductImage;