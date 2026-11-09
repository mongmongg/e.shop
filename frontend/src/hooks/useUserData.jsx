import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { signup, signin, logout, checkAuth } from "../util/user-http";
import { authActions } from "../../store/auth.slice";
import { queryClient } from "../util/http";

const queryKey = ["user"];
const useCheckAuthStatus = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: ({ signal }) => checkAuth({ signal }),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
  useEffect(() => {
    dispatch(authActions.setAuth(data));
    console.log(data);
  }, [data, dispatch]);
  return { data, isLoading };
};
const useAuth = ({ onSuccessFallback, isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: ({ signal, data }) => {
      return isLogin ? signin({ signal, data }) : signup({ signal, data });
    },
    onSuccess: (data) => {
      dispatch(authActions.setAuth(data));
      data.isAdmin ? navigate("/admin/products") : navigate("/");
    },
  });
};
const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ signal }) => {
      return logout({ signal });
    },
    onSuccess: () => {
      dispatch(authActions.removeAuth());
      queryClient.clear();
      navigate("/");
    },
  });
};
export { useAuth, useCheckAuthStatus, useLogout };
