import { createSlice } from "@reduxjs/toolkit";

// This is a MOCK auth system for learning purposes - no real backend or password
// checking. Any email + a password of 4+ characters "logs in" successfully.
const savedUser = JSON.parse(localStorage.getItem("ecommerce_user") || "null");

const initialState = {
  user: savedUser, // { name, email } | null
  status: "idle", // 'idle' | 'loading' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.status = "loading";
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.status = "idle";
      state.user = action.payload;
      localStorage.setItem("ecommerce_user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("ecommerce_user");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthStatus = (state) => state.auth.status;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
