import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import { AiFillHome } from "react-icons/ai";
import { BsFillCartDashFill } from "react-icons/bs";
import { NavLink, Link } from "react-router-dom";
import Hamburger from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductState, sidebar } from "../../redux/productSlice";
import { useLockedBody } from "usehooks-ts";
import { fetchCartState } from "../../redux/cartSlice";
const navLink = [
  {
    name: "Home",
    icon: <AiFillHome className={styles.icon} />,
    link: "/",
  },
  {
    name: "Cart",
    icon: <BsFillCartDashFill className={styles.icon} />,
    link: "/cart",
  },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const state = useSelector(fetchAllProductState);
  const cartState = useSelector(fetchCartState);

  console.log("cart", cartState);
  useLockedBody(state.sidebarToggle, "root");

  return (
    <section
      className={`container-fluid shadow-sm  ${styles.outer}  ${styles.sticky}`}
    >
      <section className={`container ${styles.inner}`}>
        <section
          className={`row justify-content-between align-items-center  ${styles.row}`}
        >
          <section className={`col   ${styles.col}`}>
            <Link to={"/"} className={styles.logo}>
              <img
                className="col-2"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPkUwimZ2dcmd7cY3qq_DLg9HiyckRgm6GWA&usqp=CAU"
                alt=""
              />
            </Link>
          </section>

          <ul className={`col d-flex justify-content-end gap-5 ${styles.col}`}>
            {navLink.map(({ name, link, icon }, index) => {
              return (
                <li key={index}>
                  <NavLink className={styles.link} to={link}>
                    {icon}
                    {name}

                    {name === "Cart" && (
                      <span class="badge bg-danger">
                        {cartState.cart.length}
                      </span>
                    )}
                  </NavLink>
                </li>
              );
            })}

            <li className="d-xl-none">
              <Hamburger
                size={25}
                toggled={state.sidebarToggle}
                onToggle={(toggled) => {
                  if (toggled) {
                    dispatch(sidebar(true));
                  } else {
                    dispatch(sidebar(false));
                  }
                }}
                rounded
              />
            </li>
          </ul>
        </section>
      </section>
    </section>
  );
};

export default Navbar;
