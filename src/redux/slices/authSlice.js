import { createSlice } from "@reduxjs/toolkit";

const storedAuth = JSON.parse(localStorage.getItem("auth"));


const initialState = {
  isAuthenticated: !!storedAuth?.token,
  user: storedAuth?.user || null,
  token: storedAuth?.token || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: action.payload.user,
          token: action.payload.token
        })
      );
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      localStorage.removeItem("auth");
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
