import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();
// export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const BASE_URL = "http://localhost:3000";
export const handleResponse = async (response, fallbackError) => {
  if (!response.ok) {
    const error = await response.json();
    error.fallbackError = fallbackError;
    throw error;
  }

  const resData = await response.json();
  //console.log(resData);
  return resData;
};
const handleSendReq = async (url, config, errorMsg) => {
  try {
    const response = await fetch(url, config);
    return handleResponse(response, `An error occured ${errorMsg}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const fetchProducts = async ({ signal }) => {
  const url = BASE_URL + "/products";
  return handleSendReq(url, { signal }, "while fetching");
};

const fetchProductById = async ({ signal, pId }) => {
  const url = BASE_URL + "/products/detail/" + pId;
  return handleSendReq(url, { signal }, "while fetching product by id");
};

const addProduct = async ({ signal, data }) => {
  const url = BASE_URL + "/admin/product";
  console.log(data);
  return handleSendReq(url, {
    signal,
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ data }),
    credentials: "include",
  });
};

export { fetchProducts, fetchProductById, addProduct };
