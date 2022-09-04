export type PaginationProps = {
  callback: (number: number) => void;
  currentPage?: number;
  pagesArr: number[];
};
