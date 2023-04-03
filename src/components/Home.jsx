import styles from "./Home.module.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProductState } from "../redux/productSlice";
import { fetchAllProducts } from "../redux/fetchers";
import Loader from "./Loader/Loader";
import ProductCard from "./CustomCards/ProductCard";
import Sidebar from "./Sidebar/Sidebar";
import { motion } from "framer-motion";
import { useMediaQuery } from "usehooks-ts";
import { toast } from "react-hot-toast";

const Home = () => {
  const matches = useMediaQuery("(max-width: 1200px)");

  const dispatch = useDispatch();

  const state = useSelector(fetchAllProductState);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  if (state.status === "loading") {
    return <Loader />;
  }

  return (
    <section className={`container-fluid position-relative  ${styles.outer}`}>
      <section className={`container-fluid  ${styles.inner}`}>
        <section className="row  flex-xl-row flex-row-reverse mt-2">
          {matches ? (
            state.sidebarToggle && (
              <motion.section
                initial={{ x: 1000 }}
                animate={{ x: 0 }}
                transition={{ type: "tween" }}
                className={`col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6  ${styles.sidebar_control}`}
              >
                <Sidebar />
              </motion.section>
            )
          ) : (
            <motion.section
              // initial={{ x: 1000 }}
              // animate={{ x: 0 }}
              transition={{ type: "tween" }}
              className={`col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6  ${styles.sidebar_control}`}
            >
              <Sidebar />
            </motion.section>
          )}

          <section className="col-xl-10 col">
            <section className={`row ${styles.row}`}>
              {state.allProduct
                .filter((value, index) => {
                  if (
                    localStorage.getItem("filtered").toLowerCase() === "all"
                  ) {
                    return state.allProduct;
                  } else {
                    return value.category === localStorage.getItem("filtered");
                  }
                })
                .map((value, index) => {
                  return (
                    <section
                      key={index}
                      className="col-xl-3 col-lg-3 col-md-4 col-sm-6 "
                    >
                      <ProductCard
                        id={value.id}
                        price={value.price}
                        image={value.image}
                        title={value.title.slice(0, 50)}
                        rating={value.rating}
                      />
                    </section>
                  );
                })}
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default Home;
