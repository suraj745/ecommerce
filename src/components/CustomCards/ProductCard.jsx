import React from "react";
import Rating from "./Rating/Rating";
import styles from "./ProductCard.module.scss";
import { Link, useParams } from "react-router-dom";
const ProductCard = ({ id, image, title, rating, price }) => {
  const params = useParams();
  return (
    <Link to={`/single/${id}`} className="text-decoration-none text-dark">
      <ul className={`${styles.card_container}  px-3 py-5 container `}>
        <li>
          <img className="" src={image} alt="" />
        </li>
        <li>
          <h3>{title}...</h3>
          <Rating rating={rating} />
          <h3 className="text-danger">Rs {price}</h3>
        </li>
      </ul>
    </Link>
  );
};

export default ProductCard;
