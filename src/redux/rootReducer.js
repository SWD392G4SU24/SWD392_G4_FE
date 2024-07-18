import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import cartSlice from "./features/cartSlice";
import customerSlice from "./features/customerSlice";
import orderSlice from "./features/orderSlice";

const rootReducer = combineReducers({
  user: counterReducer,
  cart: cartSlice,
  customer: customerSlice,
  order: orderSlice,
});

export default rootReducer;
