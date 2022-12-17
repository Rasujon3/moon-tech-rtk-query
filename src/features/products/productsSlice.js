import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts, postProduct } from "./productsAPI";

const initialState = {
  products: [],
  isLoading: false,
  postSuccess: false,
  isError: false,
  error: "",
};

export const getProducts = createAsyncThunk("products/getProduct", async () => {
  const products = fetchProducts();
  return products;
});

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (data) => {
    const product = postProduct(data);
    return product;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    togglePostSuccess: (state) => {
      state.postSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
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
      })
      // post data
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
        state.postSuccess = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.postSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.error = "";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.postSuccess = false;
        state.isLoading = true;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export const { togglePostSuccess } = productsSlice.actions;

export default productsSlice.reducer;
