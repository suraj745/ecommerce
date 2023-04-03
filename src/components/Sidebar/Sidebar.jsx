import React from "react";
import styles from "./Sidebar.module.scss";
import { fetchAllProductState, sortByPrice } from "../../redux/productSlice";
import SidebarDropdown from "../SidebarDropdown/SidebarDropdown";
import { useSelector } from "react-redux";
import { Dropdown } from "bootstrap";

const Sidebar = () => {
  const state = useSelector(fetchAllProductState);
  const dropdown = {
    filter: [
      {
        name: "Hightest to Lowest",
        order: "desc",
      },
      {
        name: "Lowest to Highest",
        order: "asc",
      },

      {
        name: "a-z",
        order: "az",
      },
      {
        name: "z-a",
        order: "za",
      },
    ],
  };

  console.log(state);
  return (
    <ul className={styles.side_bar}>
      <li className={styles.sorting_section}>
        <section>
          <h3>FILTER</h3>
          <hr />
          {dropdown.filter.map(({ name, order, check }, index) => {
            return (
              <SidebarDropdown
                key={index}
                name={name}
                order={order}
                check={
                  order === localStorage.getItem("sortAction") && "default"
                }
              />
            );
          })}
        </section>
        <section className="my-5 ">
          <h3>Category</h3>
          <hr />

          {state.category.map((value, index) => {
            return (
              <SidebarDropdown
                key={index}
                name={value.charAt(0).toUpperCase() + value.slice(1)}
                category={value}
                check={
                  value.toLowerCase() ===
                    localStorage.getItem("filtered").toLowerCase() && "default"
                }
              />
            );
          })}
        </section>
      </li>
    </ul>
  );
};

export default Sidebar;
