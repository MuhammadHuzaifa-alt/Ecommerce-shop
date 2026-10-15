import {useCallback,useEffect,useState,}from "react";
import {getMyOrders,}from "../services/orderService";
import type {Order,} from "../services/orderService";

// ==========================================
// HOOK
// ==========================================

export const useOrders = () => {
  const [orders,setOrders,]= useState<Order[]>([]);
  const [loading,setLoading,]= useState(true);
  const [error,setError,]= useState("");

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = useCallback(
    async () => {
      try {
        setLoading(true);

        setError("");

        const data =
          await getMyOrders();

        setOrders(data);
      } catch (err: unknown) {
        console.error(
          "Failed to load orders:",
          err
        );

        const status =
          getErrorStatus(err);

        if (status === 401) {
          setError(
            "Please login to view your orders."
          );
        } else {
          setError(
            "Failed to load your orders. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );


  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        const data =
          await getMyOrders();

        if (cancelled) {
          return;
        }

        setOrders(data);
      } catch (err: unknown) {
        if (cancelled) {
          return;
        }

        console.error(
          "Failed to load orders:",
          err
        );

        const status =
          getErrorStatus(err);

        if (status === 401) {
          setError(
            "Please login to view your orders."
          );
        } else {
          setError(
            "Failed to load your orders. Please try again later."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);


  // ==========================================
  // RETURN
  // ==========================================

  return {
    orders,

    loading,

    error,

    reload: loadOrders,
  };
};


// ==========================================
// ERROR STATUS
// ==========================================

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