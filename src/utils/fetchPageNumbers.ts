import { range } from "utils/range";

const fetchPageNumbers = (totalPages: number, currentPage: number, pageNeighbours = 1) => {
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

export default fetchPageNumbers;
