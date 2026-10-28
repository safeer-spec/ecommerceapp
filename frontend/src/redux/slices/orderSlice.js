import { createSlice } from "@reduxjs/toolkit";
import { placeOrder, fetchMyOrders } from "../thunks/orderThunks.js";

const orderSlice = createSlice({
  name: "orders",
  initialState: { list: [], message: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.fulfilled, (state) => { state.message = "Order placed successfully!"; state.error = null; })
      .addCase(placeOrder.rejected, (state, action) => { state.error = action.payload; state.message = null; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => { state.list = action.payload; });
  },
});

export default orderSlice.reducer;
