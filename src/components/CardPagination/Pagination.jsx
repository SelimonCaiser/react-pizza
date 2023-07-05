import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
const Pagination = ({ onChangePage, pageCount, pageRange }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={pageRange}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
