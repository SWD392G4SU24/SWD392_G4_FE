import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartSlice from "./features/cartSlice";
import customerSlice from "./features/customerSlice";

const rootReducer = combineReducers({
  user: counterReducer,
  cart: cartSlice,
  customer: customerSlice,
});

export default rootReducer;
