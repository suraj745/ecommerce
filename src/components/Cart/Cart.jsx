import React, { useEffect } from "react";

import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  counter,
  fetchCartState,
  removeItemFromCart,
  totalCart,
} from "../../redux/cartSlice";
import EmptyCart from "./EmptyCart";
import * as _ from "lodash";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector(fetchCartState);

  if (state.cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className={`container-fluid ${styles.outer}`}>
      <section className={`container ${styles.inner}`}>
        <section
          className={`row justify-content-between align-items-center ${styles.row}`}
        >
          <section className="col-lg-10">
            {state.cart.map((value, index) => {
              return (
                <ul className={`${styles.card} col shadow-sm my-5 py-2 px-5`}>
                  <li className="col-lg-1 col-3">
                    <img className="col-12" src={value.image} alt="" />
                  </li>
                  <li className="col-lg-3">{value.title}</li>
                  <li className={`col-lg-2 ${styles.counter}`}>
                    <span
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch(counter({ id: value.id, tap: "inc" }))
                      }
                    >
                      +
                    </span>
                    <span> {value.quantity}</span>
                    <span
                      className="btn btn-danger"
                      onClick={() =>
                        dispatch(counter({ id: value.id, tap: "dec" }))
                      }
                    >
                      -
                    </span>
                  </li>
                  <li className="col-2">
                    <h3 className="text-danger">
                      {(value.price * value.quantity).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </h3>
                  </li>
                  <li className="col">
                    <button
                      onClick={() => dispatch(removeItemFromCart(value.id))}
                      className="btn btn-danger"
                    >
                      <h4>Remove</h4>
                    </button>
                  </li>
                </ul>
              );
            })}
          </section>
          <ul className="col-lg-2 text-lg-center d-flex flex-column gap-5">
            <li>
              <h2 className="text-danger">
                <b>
                  Total :{" "}
                  {_.sumBy(state.cart, function (item) {
                    return item.subtotal === 0 ? item.price : item.subtotal;
                  }).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </b>
              </h2>
            </li>
            <li>
              <button
                onClick={() => dispatch(clearCart())}
                className="btn btn-danger"
              >
                <h4>Clear Cart</h4>
              </button>
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
};

export default Cart;
