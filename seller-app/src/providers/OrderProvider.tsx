"use client";

import { createContext, useContext } from "react";
import {
  OrderDetailsFragment,
  useCancelOrderMutation,
  useCompleteOrderMutation,
  useGetOrderByIdQuery,
  useStartOrderProcessingMutation,
} from "../generated/graphql";

type OrderProviderProps = {
  children: React.ReactElement;
  id: string;
};


type InitialStateProps = {
  order: OrderDetailsFragment | undefined | null;
  handleStartOrderProcessing: () => void;
  handleCompleteOrder: () => void;
  handleCancelOrder: (reason: string) => void;
  loadingOrder: boolean;
  startOrderProcessingLoading: boolean;
  completeOrderLoading: boolean;
  cancelOrderLoading: boolean;
};

const initialState: InitialStateProps = {
  order: undefined,
  handleStartOrderProcessing: () => {},
  handleCompleteOrder: () => {},
  handleCancelOrder: () => {},
  loadingOrder: false,
  startOrderProcessingLoading: false,
  completeOrderLoading: false,
  cancelOrderLoading: false,
};

export type RouteQuery = {
  id: string;
};
const OrderContext = createContext(initialState);

export const OrderProvider = ({ children, id }: OrderProviderProps) => {
  
  const { loading, error, data } = useGetOrderByIdQuery({ variables: { id } });
  const [
    startOrderProcessing,
    { loading: startOrderProcessingLoading, error: startOrderProcessingError },
  ] = useStartOrderProcessingMutation();

  const [completeOrder, { loading: completeOrderLoading, error: completeOrderError }] =
    useCompleteOrderMutation();

  const [cancelOrder, { loading: cancelOrderLoading, error: cancelOrderError }] =
    useCancelOrderMutation();

  const handleStartOrderProcessing = async () => {
    const response = await startOrderProcessing({
      variables: { orderId: id },
      refetchQueries: ["GetOrderById"],
    });
  };

  const handleCompleteOrder = async () => {
    const response = await completeOrder({
      variables: { orderId: id },
      refetchQueries: ["GetOrderById"],
    });
  };

  const handleCancelOrder = async (reason: string) => {
    const response = await cancelOrder({
      variables: { orderId: id, reason },
      refetchQueries: ["GetOrderById"],
    });
  };

  return (
    <OrderContext.Provider
      value={{
        order: data?.orderById.order,
        handleStartOrderProcessing,
        handleCompleteOrder,
        handleCancelOrder,
        loadingOrder: loading,
        startOrderProcessingLoading,
        completeOrderLoading,
        cancelOrderLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
