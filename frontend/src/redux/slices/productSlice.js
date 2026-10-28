import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductById, fetchRecommendations } from "../thunks/productThunks.js";

const productSlice = createSlice({
  name: "products",
  initialState: { list: [], selected: null, recommendations: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.selected = action.payload; })
      .addCase(fetchRecommendations.fulfilled, (state, action) => { state.recommendations = action.payload; });
  },
});

export default productSlice.reducer;
