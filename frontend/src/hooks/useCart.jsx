import { useMutation, useQuery } from "@tanstack/react-query";
import { addCartItem, checkingOut, fetchCartData } from "../util/cart-http";
import { queryClient } from "../util/http";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart.slice";
import { useEffect } from "react";

const useGetCart = () => {
  const dispatch = useDispatch();
  const { data, isSuccess } = useQuery({
    queryKey: ["cart"],
    queryFn: ({ signal }) => fetchCartData({ signal }),
    staleTime: 0,
  });
  useEffect(() => {
    if (isSuccess && data?.cart) {
      dispatch(cartActions.replaceCart(data.cart));
    }
  }, [isSuccess, data, dispatch]);
  return { data };
};

const useAddItemToCart = () => {
  return useMutation({
    mutationFn: ({ signal, data }) => addCartItem({ signal, data }),
    onSuccess: (data) => {
      queryClient.infiniteQuery({ queryKey: ["cart"] });
    },
  });
};
const usePayment = () => {
  return useMutation({
    mutationFn: ({ signal }) => checkingOut({ signal }),
  });
};
export { useAddItemToCart, useGetCart, usePayment };
