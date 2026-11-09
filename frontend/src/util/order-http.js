import { BASE_URL, handleSendReq } from "./http";

const getOrder = async ({ signal }) => {
  const url = BASE_URL + "/order";
  const config = {
    signal,
    credentials: "include",
  };
  return handleSendReq(url, config, "while getting order");
};
const getAllOrders = async ({ signal }) => {
  const url = BASE_URL + "/admin/orders";
  const config = {
    signal,
    credentials: "include",
  };
  return handleSendReq(url, config, "while getting all orders");
};
const updateOrder = async ({ signal, id, status }) => {
  const url = BASE_URL + "/admin/updateOrder";
  return handleSendReq(
    url,
    {
      signal,
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    },
    "while updating order",
  );
};

const paymentUpdateStatus = async ({ signal, oId, session_id }) => {
  const url = BASE_URL + "/order/payment/complete";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: JSON.stringify({ oId, session_id }),
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    },
    "while updating payment",
  );
};

export { getOrder, paymentUpdateStatus, getAllOrders, updateOrder };
