import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "../thunks/cartThunks.js";
import { placeOrder } from "../thunks/orderThunks.js";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
    },
    changeQuantity: (state, action) => {
      const item = state.items.find((i) => i._id === action.payload.id);
      if (item && action.payload.quantity > 0) item.quantity = action.payload.quantity;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const existing = state.items.find((i) => i._id === action.payload._id);
        if (existing) existing.quantity += 1;
        else state.items.push({ ...action.payload, quantity: 1 });
      })
      // empty the cart after a successful order
      .addCase(placeOrder.fulfilled, (state) => { state.items = []; });
  },
});

export const { removeFromCart, changeQuantity } = cartSlice.actions;
export default cartSlice.reducer;
