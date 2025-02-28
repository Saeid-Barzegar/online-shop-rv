"use client"

import React from "react";
import { PaginationPropTypes } from "@/app/types/components.type";
import styles from "./style.module.scss";

const Pagination: React.FC<PaginationPropTypes> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {

  const handlePrev = () => currentPage > 1 && onPageChange(currentPage - 1);
  const handleNext = () => currentPage < totalPages && onPageChange(currentPage + 1);

  return (
    <div className={styles.pagination}>
      <button className={styles.button} onClick={handlePrev} disabled={currentPage === 1}>
        &laquo;
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`${styles.button} ${currentPage === page ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button className={styles.button} onClick={handleNext} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
