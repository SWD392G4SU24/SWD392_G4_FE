import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartSlice from "./features/cartSlice";

const rootReducer = combineReducers({
  user: counterReducer,
  cart: cartSlice,
});

export default rootReducer;
