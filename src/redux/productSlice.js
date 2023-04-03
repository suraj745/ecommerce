import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "./fetchers";
import * as _ from "lodash";
import toast from "react-hot-toast";
const initialState = {
  allProduct: [],
  status: "idle",
  sidebarToggle: false,
  category: [],
  filtered: localStorage.getItem("filtered") || "all",
  sortAction: localStorage.getItem("sortAction") || "desc",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sidebar: (state, action) => {
      state.sidebarToggle = action.payload;
    },

    sortByPrice: (state, action) => {
      localStorage.setItem("sortAction", action.payload);

      const sort = state.allProduct.sort((a, b) => {
        if (localStorage.getItem("sortAction") === "desc") {
          return b.price - a.price;
        } else if (localStorage.getItem("sortAction") === "asc") {
          return a.price - b.price;
        } else if (localStorage.getItem("sortAction") === "az") {
          return a.title.localeCompare(b.title);
        } else if (localStorage.getItem("sortAction") === "za") {
          return b.title.localeCompare(a.title);
        }
      });

      if (action.payload === "desc") {
        toast.success("Arranged in Highest to Lowest");
      } else if (action.payload === "asc") {
        toast.success("Arranged in Lowest to Highest");
      } else if (action.payload === "az") {
        toast.success("Arranged in a-z");
      } else if (action.payload === "za") {
        toast.success("Arranged in z-a");
      }

      state.allProduct = sort;
    },

    filterProduct: (state, action) => {
      localStorage.setItem("filtered", action.payload);
      toast.success(action.payload[0].toUpperCase() + action.payload.slice(1));
      state.filtered = action.payload.toLowerCase();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state, action) => {
      state.status = "loading";
    });

    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.allProduct = action.payload;

      let check =
        localStorage.getItem("sortAction") && localStorage.getItem("filtered");

      if (!check) {
        localStorage.setItem("filtered", "all");
        localStorage.setItem("sortAction", "desc");
      }

      let uniqueCategory = [];

      state.allProduct.map((value) => {
        return uniqueCategory.push(value.category);
      });

      uniqueCategory.unshift("All");
      state.category = _.uniq(uniqueCategory);

      state.status = "idle";
    });

    builder.addCase(fetchAllProducts.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { sortByPrice, sidebar, filterProduct } = productSlice.actions;
export default productSlice.reducer;

export const fetchAllProductState = (state) => state.product;
