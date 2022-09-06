export const pagesArr = (totalElems: number, elemsPerPage: number) => {
  return Array.from(
    { length: Math.ceil(totalElems / elemsPerPage) },
    (v, k) => k + 1
  );
};
