import { BASE_URL, handleResponse } from "./http";

const getOrder = async ({ signal }) => {
  const url = BASE_URL + "/order";
  const response = await fetch(url, { signal, credentials: "include" });
  try {
    return handleResponse(response, "An error occured");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const paymentUpdateStatus = async ({ signal, oId, session_id }) => {
  const url = BASE_URL + "/order/payment/complete";
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      body: JSON.stringify({ oId, session_id }),
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    });
    return handleResponse(
      response,
      "An error occured while update order status",
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { getOrder, paymentUpdateStatus };
