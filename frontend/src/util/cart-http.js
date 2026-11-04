import { handleResponse, BASE_URL } from "./http";

const fetchCartData = async ({ signal }) => {
  const url = BASE_URL + "/cart";
  try {
    const response = await fetch(url, { signal, credentials: "include" });
    return handleResponse(response, "An error occured while getting cart data");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const addCartItem = async ({ signal, data }) => {
  const url = BASE_URL + "/cart/items";
  console.log({ ...data });
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return handleResponse(response, "An error occured while getting cart data");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const updateCartItem = async ({ signal, data }) => {
  const url = BASE_URL + "/items";
  try {
    const response = await fetch(url, {
      signal,
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return handleResponse(response, "An error occured while getting cart data");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const checkingOut = async ({ signal, data }) => {
  const url = BASE_URL + "/cart/checkout";
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
    body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    });
    return handleResponse(response, "An error occured while getting cart data");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { fetchCartData, addCartItem, updateCartItem, checkingOut };
