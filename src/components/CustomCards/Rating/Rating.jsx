import React, { useState } from "react";
import "./Rating.module.scss";
import { AiOutlineStar } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ rating: { rate, count } }) => {
  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (element, index) => {
        let number = index + 0.5;
        return (
          <div key={index} className="d-inline-flex">
            {rate >= index + 1 ? (
              <FaStar color={`#fdcc0d`} />
            ) : rate >= number ? (
              <FaStarHalfAlt color={`#fdcc0d`} />
            ) : (
              <AiOutlineStar color={`#fdcc0d`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
