import React from "react";

import Product from "@pages/Product";
import Products from "@pages/Products";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import "@styles/style.scss";
import Layout from "../Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products" element={<Layout />}>
          <Route index element={<Products />} />
          <Route path=":id" element={<Product />} />
          <Route path="services" element={<h1>Services</h1>} />
          <Route path="article" element={<h1>Article</h1>} />
          <Route path="about" element={<h1>About Us</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
