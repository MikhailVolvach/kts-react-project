import React from "react";

import Product from "@pages/Product";
import Products from "@pages/Products";
import { Routes, Route, Navigate } from "react-router-dom";

import styles from "./Content.module.scss";

const Content = () => {
  return (
    <div className={styles.content}>
      <div className={styles.content__container + styles.container}>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/products">
            <Route path=":id" element={<Product />} />
          </Route>
          <Route path="/services" element={<h1>Services</h1>} />
          <Route path="/article" element={<h1>Article</h1>} />
          <Route path="/about" element={<h1>About Us</h1>} />
          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Content;
