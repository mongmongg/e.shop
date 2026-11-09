import { handleResponse, BASE_URL, handleSendReq } from "./http";

const checkAuth = async ({ signal }) => {
  const url = BASE_URL + "/checkAuth";
  return handleSendReq(
    url,
    { signal, credentials: "include" },
    "while checking authentication",
  );
};

const signup = async ({ signal, data }) => {
  const url = BASE_URL + "/signup";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    },
    "while signing up",
  );
};

const signin = async ({ signal, data }) => {
  const url = BASE_URL + "/signin";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
      credentials: "include",
    },
    "while signin in",
  );
};

const logout = async ({ signal }) => {
  const url = BASE_URL + "/logout";
  return handleSendReq(
    url,
    {
      signal,
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
    },
    "while logging out",
  );
};

export { signin, signup, logout, checkAuth };
