

import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, actions) => {
      state = actions.payload;
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.id = actions.payload.id;
      return state;
    },
    logout: () => {
      localStorage.removeItem("token");
      return null;
    },
  },
});
export const { login, logout } = counterSlice.actions;
export const selectUser = (store) => store.user;
export const selectToken = (store) => store.user.token;
export const selectId = (store) => store.user.id;
export const selectUserName = (store) => store.user.username;
export default counterSlice.reducer;





