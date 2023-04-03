import { createSlice } from "@reduxjs/toolkit";
import { fetchSingleProduct } from "./fetchers";

const initialState = {
  single: [],
  status: "idle",
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.single = action.payload;
      state.status = "idle";
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export default singleProductSlice.reducer;

export const fetchSingleProductState = (state) => state.singleProduct;
