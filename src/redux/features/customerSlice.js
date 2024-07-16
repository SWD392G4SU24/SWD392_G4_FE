import { createSlice } from "@reduxjs/toolkit";

const initialSelectedCustomer = {
  selectedCustomer: null,
};

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialSelectedCustomer,
  reducers: {
    setSelectedCustomer: (state, action) => {
      state.selectedCustomer = action.payload;
    },
    resetSelectedCustomer: (state) => {
      state.selectedCustomer = null;
    },
  },
});

export const { setSelectedCustomer, resetSelectedCustomer } =
  customerSlice.actions;

export default customerSlice.reducer;
