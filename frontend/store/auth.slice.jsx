import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAdmin: false, isAuthenticated: false, userData: {} };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.userData = action.payload.userData;
        state.isAdmin = action.payload.isAdmin;
      } else {
        return;
      }
    },
    removeAuth: (state, action) => {
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.userData = {};
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
