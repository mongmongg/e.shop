import { BASE_URL, handleResponse } from "./http";

const getOrder = async ({ signal }) => {
  const url = BASE_URL + "";
  const response = await fetch(url, { signal });
  try {
    return handleResponse(response, "An error occured");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
