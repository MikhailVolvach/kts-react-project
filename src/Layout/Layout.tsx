import React, { useEffect, useState } from "react";

import Header from "@layout/Header";
import { Outlet } from "react-router-dom";

import "@styles/style.scss";
import s from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className="container">
      <Header />
      <main className={s.content}>
        <div className={s.content__container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
