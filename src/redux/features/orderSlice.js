import { createSlice } from "@reduxjs/toolkit";

const initialOrderID = null;
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderID: initialOrderID,
  },
  reducers: {
    setOrderID: (state, action) => {
      state.orderID = action.payload;
      return state;
    },
    clearOrderID: (state) => {
      state.orderID = null;
    },
  },
});

export const { setOrderID, clearOrderID } = orderSlice.actions;
export default orderSlice.reducer;
