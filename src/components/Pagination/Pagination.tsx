import React from "react";

import Button from "components/Button";
import ArrowIcon from "svg/arrow-back.svg";
import classNames from "classnames";

import style from "./Pagination.module.scss";
import { range } from "utils/range";

export type PaginationProps = {
  callback: (number: number) => void;
  currentPage?: number;
  totalPages: number;
};

const fetchPageNumbers = (
  totalPages: number,
  currentPage: number,
  pageNeighbours: number = 1
) => {
  const totalNumbers = pageNeighbours * 2 + 3;
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbours);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
    let pages: (number | string)[] = range(startPage, endPage);

    const hasLeft = startPage > 2;
    const hasRight = totalPages - endPage > 1;
    const offset = totalNumbers - (pages.length + 1);

    switch (true) {
      case hasLeft && !hasRight: {
        const extraPages = range(startPage - offset, startPage - 1);
        pages = ["LEFT", ...extraPages, ...pages];
        break;
      }

      case !hasLeft && hasRight: {
        const extraPages = range(endPage + 1, endPage + offset);
        pages = [...pages, ...extraPages, "RIGHT"];
        break;
      }

      case hasLeft && hasRight:
      default: {
        pages = ["LEFT", ...pages, "RIGHT"];
        break;
      }
    }
    return [1, ...pages, totalPages];
  }
  return range(1, totalPages);
};

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  callback,
  currentPage = 0,
}) => {
  const pages = fetchPageNumbers(totalPages, currentPage);

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const page = +(
        (e.target as HTMLInputElement).childNodes[0].nodeValue || 1
      );
      if (page === currentPage) {
        return;
      }
      callback(+((e.target as HTMLInputElement).childNodes[0].nodeValue || 1));
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
    <div className={style.pagination}>
      <div className={style.pagination__container}>
        {pages.map((page, index) => {
          if (page === "LEFT") {
            return (
              <Button
                key={index}
                className={classNames(
                  style.pagination__arrow,
                  style.pagination__arrow_previous
                )}
                disabled={currentPage < 2}
                onClick={handlePrevious}
              >
                <img src={ArrowIcon} alt="" />
              </Button>
            );
          }

          if (page === "RIGHT") {
            return (
              <Button
                key={index}
                className={classNames(
                  style.pagination__arrow,
                  style.pagination__arrow_next
                )}
                onClick={handleNext}
                disabled={currentPage > totalPages - 1}
              >
                <img src={ArrowIcon} alt="" />
              </Button>
            );
          }

          return (
            <Button
              key={index}
              onClick={handleClick}
              className={classNames(
                style.pagination__item,
                currentPage === page && style.pagination__item_active
              )}
            >
              {page}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Pagination);
