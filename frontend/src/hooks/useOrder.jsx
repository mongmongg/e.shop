import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { getAllOrders, getOrder, updateOrder } from "../util/order-http";

const useGetOrder = ({ isAdmin }) => {
  return useSuspenseQuery({
    queryKey: ["order", isAdmin],
    queryFn: ({ signal }) => {
      return isAdmin ? getAllOrders({ signal }) : getOrder({ signal });
    },
    staleTime: 0,
  });
};

const useUpdateOrder = () => {
  return useMutation({
    mutationFn: ({ signal, id, status }) => updateOrder({ signal, id, status }),
  });
};

export { useGetOrder, useUpdateOrder };
