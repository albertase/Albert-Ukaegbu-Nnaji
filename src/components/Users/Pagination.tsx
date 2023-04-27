import React, { useEffect, useState } from "react";
import { NextIcon, PrevIcon } from "../svgIcons";

interface PaginationProps {
  currentPage: number;
  numberOfPages: number;
  next: () => void;
  previous: () => void;
  setPage: (num: number) => void;
}

const Pagination: React.VFC<PaginationProps> = ({
  currentPage,
  numberOfPages,
  next,
  previous,
  setPage,
}) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    const num: number[] = [];
    for (let i = 0; i < numberOfPages; i++) {
      num.push(i + 1);
    }
    setNumbers(num);
  }, [numberOfPages]);

  return (
    <div className="pagination">
      <div className="total">
        <span>Showing</span>
        <span className="control">{currentPage}</span>
        <span>out of {numberOfPages}</span>
      </div>

      <div className="numbers">
        <button type="button" onClick={previous}>
          <PrevIcon />
        </button>

        {numbers.map((num) => (
          <span key={num} onClick={() => setPage(num)}>
            {num}
          </span>
        ))}

        <button type="button" onClick={next}>
          <NextIcon />
        </button>
      </div>
    </div>
  );
};

export default Pagination;