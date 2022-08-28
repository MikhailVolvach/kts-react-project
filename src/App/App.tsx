import React from "react";

import Header from "@components/Header";
import { BrowserRouter } from "react-router-dom";

import Content from "../Content";
import "@styles/style.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <Content />
      </div>
    </BrowserRouter>
  );
};

export default App;
