import {
  useEffect,
  useState,
} from "react";

import {
  getMyOrder,
} from "../services/orderService";

import type {
  Order,
} from "../services/orderService";

export const useOrderDetails = (
  id?: string
) => {
  const [order, setOrder] =
    useState<Order | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadOrder = async () => {
      if (!id) {
        setError("Order ID is missing.");
        setLoading(false);
        return;
      }

      const orderId = Number(id);

      if (
        !Number.isInteger(orderId) ||
        orderId <= 0
      ) {
        setError("Invalid order ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await getMyOrder(orderId);

        setOrder(data);
      } catch (error) {
        console.error(
          "Failed to load order:",
          error
        );

        setOrder(null);

        setError(
          getOrderErrorMessage(error)
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  return {
    order,
    loading,
    error,
  };
};

// ==========================================================
// ERROR MESSAGE
// ==========================================================

const getOrderErrorMessage = (
  error: unknown
): string => {
  const status =
    getErrorStatus(error);

  switch (status) {
    case 401:
      return "Your session has expired. Please login again.";

    case 403:
      return "You are not authorized to view this order.";

    case 404:
      return "Order not found.";

    default:
      return "Failed to load order. Please try again.";
  }
};

// ==========================================================
// ERROR STATUS
// ==========================================================

const getErrorStatus = (
  error: unknown
): number | undefined => {
  if (
    typeof error !== "object" ||
    error === null ||
    !("response" in error)
  ) {
    return undefined;
  }

  const response = (
    error as {
      response?: {
        status?: number;
      };
    }
  ).response;

  return response?.status;
};