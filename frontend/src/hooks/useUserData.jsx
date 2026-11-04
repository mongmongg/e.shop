import { useQuery, useMutation } from "@tanstack/react-query";
import { signup, signin, logout, checkAuth } from "../util/user-http";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth.slice";
import { useEffect } from "react";
import { queryClient } from "../util/http";

const queryKey = ["user"];
const useCheckAuthStatus = () => {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey,
    queryFn: ({ signal }) => checkAuth({ signal }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  useEffect(() => {
    dispatch(authActions.setAuth(data?.isAuthenticated));
  }, [data, data?.isAuthenticated, dispatch]);
  return data;
};
const useAuth = ({ onSuccessFallback, isLogin }) => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ signal, data }) => {
      return isLogin ? signin({ signal, data }) : signup({ signal, data });
    },
    onSuccess: (data) => {
      dispatch(authActions.setAuth(data));
      onSuccessFallback();
    },
  });
};
const useLogout = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ signal }) => {
      return logout({ signal });
    },
    onSuccess: () => {
      dispatch(authActions.removeAuth());
      queryClient.invalidateQueries(queryKey);
    },
  });
};
export { useAuth, useCheckAuthStatus, useLogout };
