import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "../thunks/cartThunks.js";
import { placeOrder } from "../thunks/orderThunks.js";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => (item._id ?? item.id) !== action.payload,
      );
    },
    changeQuantity: (state, action) => {
      const item = state.items.find(
        (entry) => (entry._id ?? entry.id) === action.payload.id,
      );
      if (item && action.payload.quantity > 0) item.quantity = action.payload.quantity;
    },
    addLocalProduct: (state, action) => {
      const product = action.payload;
      const productId = product._id ?? product.id;
      if (!productId) return;

      const existing = state.items.find(
        (item) => (item._id ?? item.id) === productId,
      );
      if (existing) existing.quantity += 1;
      else state.items.push({ ...product, id: productId, quantity: 1 });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        const existing = state.items.find(
          (item) => (item._id ?? item.id) === action.payload._id,
        );
        if (existing) existing.quantity += 1;
        else state.items.push({ ...action.payload, quantity: 1 });
      })
      // empty the cart after a successful order
      .addCase(placeOrder.fulfilled, (state) => { state.items = []; });
  },
});

export const { removeFromCart, changeQuantity, addLocalProduct } = cartSlice.actions;
export default cartSlice.reducer;
