import React from "react";
import styles from "./Loader.module.scss";
const Loader = () => {
  return (
    <section className="container-fluid">
      <section className="container">
        <section className={`row ${styles.row}`}>
          <section className="col d-flex justify-content-center">
            <div
              className="spinner-border text-danger"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Loader;
