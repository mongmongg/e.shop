import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import {
  addProduct,
  fetchProductById,
  fetchProducts,
  queryClient,
  updateProduct,
} from "../util/http";

const useAllProducts = () => {
  return useSuspenseQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => fetchProducts({ signal }),
  });
};

const useProductById = ({ pId }) => {
  return useSuspenseQuery({
    queryKey: ["product", pId],
    queryFn: ({ signal }) => (pId ? fetchProductById({ signal, pId }) : ""),
  });
};
const useAddProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ signal, data, pId }) => {
      pId ? updateProduct({ signal, data, pId }) : addProduct({ signal, data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/products");
    },
  });
};

const useSearchProducts = ({ searchTerm }) => {
  return useSuspenseQuery({
    queryKey: ["products", searchTerm],
    queryFn: ({ signal }) => fetchProducts({ signal, searchTerm }),
    enabled: searchTerm !== undefined,
  });
};
export { useProductById, useAddProduct, useAllProducts, useSearchProducts };
