import React from "react";
import styles from "./Cart.module.scss";
const EmptyCart = () => {
  return (
    <section className="container-fluid">
      <section className="container">
        <section
          className={`${styles.row_cart} row justify-content-center align-items-center`}
        >
          <section className="col-2">
            <img
              className="col-12"
              src="https://www.freeiconspng.com/uploads/red-simple-shopping-cart-icon-12.png"
              alt=""
            />

            <h1 className="text-center mt-5 text-secondary">Cart is Empty</h1>
          </section>
        </section>
      </section>
    </section>
  );
};

export default EmptyCart;
