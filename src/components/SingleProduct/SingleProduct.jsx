import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../../redux/fetchers";
import { useParams } from "react-router-dom";
import styles from "./SingleProduct.module.scss";
import { fetchSingleProductState } from "../../redux/singleProductSlice";
import Rating from "../CustomCards/Rating/Rating";
import { addToCart } from "../../redux/cartSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { single } = useSelector(fetchSingleProductState);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, [dispatch]);

  return (
    <section className={`container-fluid ${styles.outer} my-5`}>
      <section className={`container ${styles.inner}`}>
        <section
          className={`row justify-content-center align-items-center ${styles.row}`}
        >
          <section className={`col-lg-6 ${styles.left} text-center`}>
            <img className="col-5" src={single.image} alt="" />
          </section>
          <ul className={`col-lg-6 ${styles.right}`}>
            <li>{/* <Rating rating={single.rating} /> */}</li>
            <li>
              <h1>{single.title}</h1>
            </li>
            <li className={styles.description}>
              <p>{single.description}</p>
            </li>
            <li className="text-danger">
              <h1>₹ {single.price}</h1>
            </li>
            <li>
              <button
                className="btn btn-danger"
                onClick={() => dispatch(addToCart(single))}
              >
                Add to Cart
              </button>
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
};

export default SingleProduct;
