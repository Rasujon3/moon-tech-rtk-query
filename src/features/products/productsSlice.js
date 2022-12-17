import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productSlice";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
  const products = fetchProducts();
  return products;
});

export const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
        state.error = "";
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.products = [];
        state.isLoading = true;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
