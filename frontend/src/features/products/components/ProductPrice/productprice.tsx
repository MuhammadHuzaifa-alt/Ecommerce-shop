import "./productprice.css";

interface ProductPriceProps {
  price: number;
  oldPrice?: number;
  currency?: string;
}

const ProductPrice = ({
  price,
  oldPrice,
  currency = "$",
}: ProductPriceProps) => {
  const hasDiscount =
    oldPrice !== undefined && oldPrice > price;

  const discount = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  return (
    <div className="price-wrapper">
      <span className="current-price">
        {currency}
        {price.toFixed(2)}
      </span>

      {hasDiscount && (
        <>
          <span className="old-price">
            {currency}
            {oldPrice.toFixed(2)}
          </span>

          <span className="discount-percent">
            Save {discount}%
          </span>
        </>
      )}
    </div>
  );
};

export default ProductPrice;