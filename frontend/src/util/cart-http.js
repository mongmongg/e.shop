import { BASE_URL, handleSendReq } from "./http";

const fetchCartData = async ({ signal }) => {
  const url = BASE_URL + "/cart";
  return handleSendReq(
    url,
    { signal, credentials: "include" },
    "while getting cart data",
  );
};
const addCartItem = async ({ signal, data }) => {
  console.log(data);
  const url = BASE_URL + "/cart/items";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    },
    "while adding item to cart",
  );
};
const updateCartItem = async ({ signal, data }) => {
  const url = BASE_URL + "/items";
  return handleSendReq(
    url,
    {
      signal,
      method: "PATCH",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    },
    "while updating cart items",
  );
};

const checkingOut = async ({ signal, data }) => {
  const url = BASE_URL + "/cart/checkout";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: { "Content-type": "application/json" },
    },
    "while checking out",
  );
};

export { fetchCartData, addCartItem, updateCartItem, checkingOut };
