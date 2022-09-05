import React from "react";

import { HeaderItemProps } from "@layout/Header/components/HeaderItem/config";
import cn from "classnames";
import { Link, useLocation } from "react-router-dom";

import s from "./HeaderItem.module.scss";

const HeaderItem: React.FC<HeaderItemProps> = ({ link, text }) => {
  const { pathname } = useLocation();

  return (
    <li
      className={cn(s.nav__item, pathname.includes(link) && s.nav__item_active)}
    >
      <Link to={link}>
        <p>{text}</p>
      </Link>
    </li>
  );
};

export default React.memo(HeaderItem);
