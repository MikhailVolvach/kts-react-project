export const pages = (totalElems: number, elemsPerPage: number) => {
    return Math.ceil(totalElems / elemsPerPage);
};
