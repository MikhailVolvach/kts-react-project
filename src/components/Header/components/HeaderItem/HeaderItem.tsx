import React, { FC } from "react";

import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

import styles from "./HeaderItem.module.scss";

export type HeaderItemProps = {
  link: string;
  text: string;
};

const HeaderItem: FC<HeaderItemProps> = ({ link, text }) => {
  const location = useLocation();
  let pathName = location.pathname.slice(1);

  if (pathName.indexOf("/") !== -1)
    pathName = pathName.slice(0, pathName.indexOf("/"));

  const headerItemClass = classNames(
    styles.nav__item,
    `${"/" + pathName === link ? styles.nav__item_active : ""}`
  );
  return (
    <li className={headerItemClass}>
      <Link to={link}>
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default HeaderItem;
