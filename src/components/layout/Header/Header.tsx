import React from "react";

import { routes } from "@configs/routes";
import account from "@icons/account.svg";
import cart from "@icons/cart.svg";
import logo from "@img/logo.png";
import classNames from "classnames";
import { Link } from "react-router-dom";

import HeaderItem from "./components/HeaderItem";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/products">
        <div className={styles.header__logo}>
          <img src={logo} alt="Logo" />
        </div>
      </Link>
      <nav className={classNames(styles.header__nav, styles.nav)}>
        <ul className={styles.nav__list}>
          {routes.map(({ path, text }) => (
            <HeaderItem link={path} text={text} />
          ))}
        </ul>
      </nav>
      <div className={styles.header__user}>
        <div className={styles.header__cart}>
          <img src={cart} alt="" />
        </div>
        <div className={styles.header__account}>
          <img src={account} alt="" />
        </div>
      </div>
    </header>
  );
};

export default React.memo(Header);
