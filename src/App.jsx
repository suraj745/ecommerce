import React, { useState } from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { fetchAllProducts } from "./redux/fetchers";
import { Toaster } from "react-hot-toast";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import Cart from "./components/Cart/Cart";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
