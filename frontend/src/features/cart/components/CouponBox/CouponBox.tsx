import "./CouponBox.css";

import { useState } from "react";
import { FaTag } from "react-icons/fa";

interface CouponBoxProps {
  onApplyCoupon: (coupon: string) => void;
  loading?: boolean;
  error?: string;
  success?: string;
}

const CouponBox = ({
  onApplyCoupon,
  loading = false,
  error,
  success,
}: CouponBoxProps) => {
  const [coupon, setCoupon] = useState("");

  const handleApply = () => {
    if (loading) return;

    const normalizedCoupon = coupon
      .trim()
      .toUpperCase();

    if (!normalizedCoupon) return;

    onApplyCoupon(normalizedCoupon);
  };

  return (
    <section
      className="coupon-box"
      aria-labelledby="coupon-title"
    >
      <div className="coupon-header">
        <FaTag aria-hidden="true" />

        <h3 id="coupon-title">
          Have a Coupon?
        </h3>
      </div>

      <p>
        Enter your discount code below and click apply.
      </p>

      <form
        className="coupon-form"
        onSubmit={(event) => {
          event.preventDefault();
          handleApply();
        }}
      >
        <label
          htmlFor="coupon-code"
          className="sr-only"
        >
          Coupon code
        </label>

        <input
          id="coupon-code"
          type="text"
          placeholder="Enter coupon code"
          value={coupon}
          onChange={(event) =>
            setCoupon(event.target.value)
          }
          autoComplete="off"
          maxLength={50}
          disabled={loading}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? "coupon-error"
              : success
                ? "coupon-success"
                : undefined
          }
        />

        <button
          type="submit"
          disabled={loading || !coupon.trim()}
        >
          {loading ? "Applying..." : "Apply Coupon"}
        </button>
      </form>

      {error && (
        <p
          id="coupon-error"
          className="coupon-error"
          role="alert"
        >
          {error}
        </p>
      )}

      {success && !error && (
        <p
          id="coupon-success"
          className="coupon-success"
          role="status"
        >
          {success}
        </p>
      )}
    </section>
  );
};

export default CouponBox;