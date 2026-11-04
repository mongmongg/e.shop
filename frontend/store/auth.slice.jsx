import { createSlice } from "@reduxjs/toolkit";

const initialState = { isAuthenticated: false, userData: {} };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        state.userData = action.payload.userData;
      } else {
        state.isAuthenticated = false;
      }
    },
    removeAuth: (state, action) => {
      state.isAuthenticated = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
