import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: 0,
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProducts(state, action) {
      const findIdProduct = state.items.find(
        (obj) => obj.id === action.payload.id
      );
      if (findIdProduct) {
        findIdProduct.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id === action.payload);
    },
    minusItem(state, action) {
      const findIdProduct = state.items.find(
        (obj) => obj.id === action.payload
      );
      if (findIdProduct) {
        findIdProduct.count--;
      }
    },
    clearItem(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProducts, removeItem, clearItem, minusItem } =
  cartSlice.actions;

export default cartSlice.reducer;
