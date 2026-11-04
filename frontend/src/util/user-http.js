import { handleResponse, BASE_URL } from "./http";

const checkAuth = async ({ signal }) => {
  const url = BASE_URL + "/checkAuth";
  try {
    const response = await fetch(url, {
      signal,
      credentials: "include",
    });
    return handleResponse(response);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const signup = async ({ signal, data }) => {
  console.log(data);
  const url = BASE_URL + "/signup";
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    return handleResponse(response, "An error occurred while signing up");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signin = async ({ signal, data }) => {
  const url = BASE_URL + "/signin";
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    return handleResponse(response, "An error occured while signing in");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const logout = async ({ signal }) => {
  const url = BASE_URL + "/logout";
  console.log("logout");
  try {
    const response = await fetch(url, {
      signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    });
    return handleResponse(response, "An error occured while logging out");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { signin, signup, logout, checkAuth };
