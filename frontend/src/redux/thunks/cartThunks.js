import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

// Gets the product from the API, then the cart slice adds it
export const addToCart = createAsyncThunk("cart/add", async (productId, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/products/${productId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue("Could not add to cart");
  }
});
