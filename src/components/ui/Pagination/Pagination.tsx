import React from "react";

import { Color } from "@configs/colorConfig";
import { ReactComponent as ArrowIcon } from "@icons/arrow.svg";
import Button from "@ui/Button";
import { PaginationProps } from "@ui/Pagination/config";

import s from "./Pagination.module.scss";

const Pagination: React.FC<PaginationProps> = ({
  pagesArr,
  callback,
  currentPage = 0,
}) => {
  const handleClick = React.useCallback(
    (value: any) => {
      callback(value);
    },
    [callback]
  );

  const handlePrevious = React.useCallback(() => {
    callback(currentPage - 1);
  }, [callback, currentPage]);

  const handleNext = React.useCallback(() => {
    callback(currentPage + 1);
  }, [callback, currentPage]);

  return (
    <div className={s.pagination}>
      <div className={s.pagination__container}>
        <Button
          className={[s.pagination__arrow, s.pagination__arrow_previous].join(
            " "
          )}
          color={Color.secondary}
          disabled={currentPage < 2 && true}
          onClick={handlePrevious}
        >
          {/*<img src={arrowIcon} alt="Previous page" />*/}
          <ArrowIcon />
          {/*<object data={arrowIcon} type="image/svg+xml" />*/}
        </Button>
        {pagesArr.map((page) => (
          <Button
            onClick={handleClick}
            key={page}
            className={s.pagination__item}
            color={currentPage !== page ? Color.secondary : Color.primary}
          >
            {page}
          </Button>
        ))}
        <Button
          className={[s.pagination__arrow, s.pagination__arrow_next].join(" ")}
          disabled={currentPage === pagesArr[pagesArr.length - 1] && true}
          onClick={handleNext}
          color={Color.secondary}
        >
          {/*<object data={arrowIcon} type="image/svg+xml" />*/}
          <ArrowIcon />
        </Button>
      </div>
    </div>
  );
};

export default React.memo(Pagination);
