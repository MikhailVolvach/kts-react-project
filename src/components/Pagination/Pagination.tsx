import React from "react";

import classNames from "classnames";
import Button from "components/Button";
import ArrowIcon from "svg/arrow-back.svg";
import fetchPageNumbers from "utils/fetchPageNumbers";

import style from "./Pagination.module.scss";

export type PaginationProps = {
    callback: (number: number) => void;
    currentPage?: number;
    totalPages: number;
};

const Pagination: React.FC<PaginationProps> = ({ totalPages, callback, currentPage = 0 }) => {
    const SKIP_PAGES = 2;

    const pages = fetchPageNumbers(totalPages, currentPage);

    const handleClick = React.useCallback(
        (e: React.SyntheticEvent<HTMLButtonElement>) => {
            const page = +(e.currentTarget.dataset.attr || 1);
            if (page === currentPage) {
                return;
            }
            callback(page);
        },
        [callback],
    );

    const handlePrevious = React.useCallback(() => {
        callback(currentPage - SKIP_PAGES);
    }, [callback, currentPage]);

    const handleNext = React.useCallback(() => {
        callback(currentPage + SKIP_PAGES);
    }, [callback, currentPage]);

    return (
        <div className={style.pagination}>
            <div className={style.pagination__container}>
                {pages.map((page) => {
                    if (page === "LEFT") {
                        return (
                            <Button
                                key={page}
                                className={classNames(style.pagination__arrow, style.pagination__arrow_previous)}
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
                                key={page}
                                className={classNames(style.pagination__arrow, style.pagination__arrow_next)}
                                onClick={handleNext}
                                disabled={currentPage > totalPages - 1}
                            >
                                <img src={ArrowIcon} alt="" />
                            </Button>
                        );
                    }

                    return (
                        <Button
                            key={page}
                            onClick={handleClick}
                            className={classNames(
                                style.pagination__item,
                                currentPage === page && style.pagination__item_active,
                            )}
                            dataAttr={page.toString()}
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
