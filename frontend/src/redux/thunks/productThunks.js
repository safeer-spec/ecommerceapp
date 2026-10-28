import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance.js";

export const fetchProducts = createAsyncThunk("products/fetchAll", async (search = "", { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/products?search=${search}`);
    return res.data;
  } catch (err) {
    return rejectWithValue("Could not load products");
  }
});

export const fetchProductById = createAsyncThunk("products/fetchOne", async (id, { rejectWithValue }) => {
  try {
    const res = await axiosInstance.get(`/products/${id}`);
    return res.data;
  } catch (err) {
    return rejectWithValue("Product not found");
  }
});

export const fetchRecommendations = createAsyncThunk("products/recommendations", async (id) => {
  const res = await axiosInstance.get(`/analytics/recommendations/${id}`);
  return res.data;
});
