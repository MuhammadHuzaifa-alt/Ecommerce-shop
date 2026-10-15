// ==========================================================
// PRICE
// ==========================================================

export const formatPrice = (
  value: number | string
): string => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "0.00";
  }

  return amount.toLocaleString(
    "en-PK",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
  );
};

// ==========================================================
// DATE
// ==========================================================

export const formatDate = (
  value: string
): string => {
  if (!value) {
    return "Unknown date";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Unknown date";
  }

  return date.toLocaleString(
    "en-PK",
    {
      dateStyle: "medium",
      timeStyle: "short",
    }
  );
};

// ==========================================================
// STATUS
// ==========================================================

export const formatStatus = (
  status: string
): string => {
  if (!status) {
    return "Pending";
  }

  return status
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase()
    );
};

// ==========================================================
// STATUS CLASS
// ==========================================================

export const getStatusClass = (
  status: string
): string => {
  return status
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");
};