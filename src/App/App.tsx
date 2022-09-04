import React from "react";

import Product from "@pages/Product";
import Products from "@pages/Products";
import { Navigate, useRoutes } from "react-router-dom";

import "@styles/style.scss";
import Layout from "../Layout";

const App = () => {
  const routesArr = useRoutes([
    {
      path: "/products",
      element: <Layout />,
      children: [
        { index: true, element: <Products /> },
        { path: ":id", element: <Product /> },
        { path: "services", element: <h1>Services</h1> },
        { path: "article", element: <h1>Article</h1> },
        { path: "about", element: <h1>About Us</h1> },
      ],
    },
    { path: "*", element: <Navigate to={"/products"} replace /> },
  ]);

  return routesArr;
};

export default App;
