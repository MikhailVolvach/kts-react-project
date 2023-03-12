import React from "react";

import Button from "@components/Button";
import { ReactComponent as ArrowIcon } from "@svg/arrow-back.svg";
import { Log } from "@utils/log";
import classNames from "classnames";

import style from "./Pagination.module.scss";

export type PaginationProps = {
  callback: (number: number) => void;
  currentPage?: number;
  pagesArr: number[];
};

const Pagination: React.FC<PaginationProps> = ({
  pagesArr,
  callback,
  currentPage = 0,
}) => {
  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      // @ts-ignore
      callback(e.target.value);
    },
    [callback]
  );

  Log(pagesArr);

  const handlePrevious = React.useCallback(() => {
    callback(currentPage - 1);
  }, [callback, currentPage]);

  const handleNext = React.useCallback(() => {
    callback(currentPage + 1);
  }, [callback, currentPage]);

  return (
    <div className={style.pagination}>
      <div className={style.pagination__container}>
        <Button
          className={classNames(
            style.pagination__arrow,
            style.pagination__arrow_previous
          )}
          disabled={currentPage < 2 && true}
          onClick={handlePrevious}
        >
          <ArrowIcon />
        </Button>
        {pagesArr.map((page) => (
          <Button
            onClick={handleClick}
            key={page}
            className={classNames(
              style.pagination__item,
              currentPage === page && style.pagination__item_active
            )}
            customValue={page}
          >
            {page}
          </Button>
        ))}
        <Button
          className={classNames(
            style.pagination__arrow,
            style.pagination__arrow_next
          )}
          disabled={currentPage === pagesArr[pagesArr.length - 1] && true}
          onClick={handleNext}
        >
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
