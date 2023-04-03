import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
  cart: [],
  status: "idle",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;

      const item = state.cart.find((item) => item.id === id);

      if (!item) {
        state.cart.push({
          ...action.payload,
          quantity: 1,
          subtotal: item ? item.price : 0,
        });

        toast.success(`${action.payload.title} added to cart`);
      } else {
        if (item.quantity < 5) {
          item.quantity += 1;
          item.subtotal = item.quantity * item.price;

          toast.success(`${item.quantity} items are in cart of same product`);
        } else {
          toast.error(`you can only take 5 item of same product`);
        }
      }
    },

    counter: (state, action) => {
      let exist = state.cart.find((item) => item.id === action.payload.id);

      if (exist && action.payload.tap === "inc") {
        if (exist.quantity < 5) {
          exist.quantity += 1;
          exist.subtotal = exist.quantity * exist.price;
          toast.success(`${exist.quantity} items are in cart of same product`);
          if (exist.quantity === 5) {
            toast.error("maximum 5 item can be add of same product");
          }
        }
      } else {
        if (exist.quantity > 1) {
          exist.quantity -= 1;
          exist.subtotal = exist.quantity * exist.price;
          toast.success(`${exist.quantity} items are in cart of same product`);
          if (exist.quantity === 1) {
            toast.error("item cannot be less than zero");
          }
        }
      }
    },

    removeItemFromCart: (state, action) => {
      let exist = state.cart.find((item) => item.id === action.payload);

      toast.success(`${exist.title} removed from cart`);

      state.cart = state.cart.filter((value) => {
        return value.id !== action.payload;
      });
    },

    clearCart: (state, action) => {
      state.cart.length = 0;

      toast.success("Cart is cleared");
    },
  },
});

export const { addToCart, counter, removeItemFromCart, clearCart, totalCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const fetchCartState = (state) => state.cart;
