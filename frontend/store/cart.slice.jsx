import { createSlice } from "@reduxjs/toolkit";

const initialState = { items: [], totalQuantity: 0, totalPrice: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      if (action.payload) {
        const cart = action.payload;
        state.items = [...cart.items];
        state.totalQuantity = cart.totalQuantity;
        state.totalPrice = cart.totalPrice;
      }
    },
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity = state.totalQuantity + newItem.quantity;
      //const newQuntity = Number(existingItem.quantity);

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          summary: newItem.summary,
          price: Number(newItem.price),
          quantity: Number(newItem.quantity),
          totalPrice: Number(newItem.price),
        });
        state.totalPrice = state.totalPrice + Number(newItem.price);
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.totalPrice =
          existingItem.totalPrice + existingItem.price * newItem.quantity;
        state.totalPrice = state.totalPrice + existingItem.price;
      }
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});
export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
