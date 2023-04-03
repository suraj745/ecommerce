import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProductState,
  filterProduct,
  sidebar,
  sortByPrice,
} from "../../redux/productSlice";

const SidebarDropdown = ({ name, order, check, category }) => {
  const dispatch = useDispatch();
  const state = useSelector(fetchAllProductState);
  return (
    <div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name={!category ? "flexRadioDefault1" : "flexRadioDefault2"}
          id={name}
          checked={check === "default" ? true : false}
          onClick={() => {
            dispatch(sidebar(false));
            category
              ? dispatch(filterProduct(category))
              : dispatch(sortByPrice(order));
          }}
        />
        <label className="form-check-label" htmlFor={name}>
          <h4> {name}</h4>
        </label>
      </div>
    </div>
  );
};

export default SidebarDropdown;
