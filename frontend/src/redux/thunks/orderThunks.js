import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const placeOrder = createAsyncThunk("orders/place", async (cartItems, { rejectWithValue }) => {
  try {
    const items = cartItems.map((i) => ({ product: i._id, quantity: i.quantity }));
    const res = await axiosInstance.post("/orders", { items });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Order failed");
  }
});

export const fetchMyOrders = createAsyncThunk("orders/fetchMine", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get("/orders/my");
    return res.data;
  } catch (err) {
    return rejectWithValue("Could not load orders");
  }
});
