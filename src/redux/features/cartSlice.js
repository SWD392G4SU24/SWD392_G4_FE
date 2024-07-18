import { createSlice } from "@reduxjs/toolkit";

const initialCartValue = [];
const initialSelectedItems = [];
const initialTotalCost = 0;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: initialCartValue,
    selectedItems: initialSelectedItems,
    totalCost: initialTotalCost,
  },
  reducers: {
    addProduct: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem && existingItem.quantity < action.payload.quantity) {
        existingItem.quantity += 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      return state;
    },

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const product = state.products.find((item) => item.id === action.payload);
      if (product) {
        if (product.quantity > 1) {
          product.quantity -= 1;
        } else {
          state.products = state.products.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },

    clearAll: (state) => {
      state.products = initialCartValue;
    },

    clearCart: (state) => {
      const selectedIds = state.selectedItems.map((item) => item.id);
      state.products = state.products.filter(
        (item) => !selectedIds.includes(item.id)
      );
      state.selectedItems = [];
    },

    selectProduct: (state, action) => {
      state.selectedItems = action.payload;
    },

    deselectProduct: (state, action) => {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseQuantity,
  decreaseQuantity,
  clearAll,
  selectProduct,
  deselectProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
