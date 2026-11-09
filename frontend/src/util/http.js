import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
export const BASE_URL = import.meta.env.VITE_BASE_URL;
//export const BASE_URL = "http://localhost:3000";
export const handleResponse = async (response, fallbackError) => {
  if (!response.ok) {
    const error = await response.json();
    error.fallbackError = fallbackError;
    throw error;
  }
  const resData = await response.json();
  return resData;
};
export const handleSendReq = async (url, config, errorMsg) => {
  try {
    const response = await fetch(url, config);
    return handleResponse(response, `An error occured ${errorMsg}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchProducts = async ({ signal, searchTerm, max }) => {
  let url = BASE_URL + "/products";

  if (searchTerm) {
    url += `?search=${searchTerm}`;
  } else if (max) {
    url += `?max=${max}`;
  }
  return handleSendReq(
    url,
    { signal, credentials: "include" },
    "while fetching",
  );
};

const fetchProductById = async ({ signal, pId }) => {
  const url = BASE_URL + "/products/detail/" + pId;
  return handleSendReq(
    url,
    { signal, credentials: "include" },
    "while fetching product by id",
  );
};

const addProduct = async ({ signal, data }) => {
  const url = BASE_URL + "/admin/product";

  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: data,
      credentials: "include",
    },
    "while adding new product",
  );
};
const updateProduct = async ({ signal, data, pId }) => {
  const url = BASE_URL + `/admin/product/${pId}/edit`;
  return handleSendReq(
    url,
    {
      signal,
      method: "PATCH",
      body: data,
      credentials: "include",
    },
    "while updating",
  );
};

export { fetchProducts, fetchProductById, addProduct, updateProduct };
