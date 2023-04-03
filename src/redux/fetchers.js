import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import env from "../../env";
import { create } from "lodash";

export const fetchAllProducts = createAsyncThunk(
  "fetchAllProducts",
  async () => {
    const res = await axios.get(`${env.URL}products`);
    return [...res.data];
  }
);

// export const fetchSortingOfProducts = createAsyncThunk(
//   "fetchSortingOfProducts",
//   async (pattern) => {
//     const res = await axios.get(`${env.URL}products?sort=${pattern}`);
//     return [...res.data];
//   }
// );

export const fetchSingleProduct = createAsyncThunk(
  "fetchSingleProducts",
  async (id) => {
    const res = await axios.get(`${env.URL}products/${id}`);
    return res.data;
  }
);

// cart
