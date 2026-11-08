import { useNavigate } from "react-router-dom";
import { useSuspenseQuery, useMutation } from "@tanstack/react-query";
import { addProduct, fetchProductById, queryClient } from "../util/http";

function useProductById({ pId }) {
  return useSuspenseQuery({
    queryKey: ["product"],
    queryFn: ({ signal }) => (pId ? fetchProductById({ signal, pId }) : ""),
  });
}
function useAddProduct() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ signal, data }) => addProduct({ data }),
    onSuccess: () => {
      
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });
}
export { useProductById, useAddProduct };
