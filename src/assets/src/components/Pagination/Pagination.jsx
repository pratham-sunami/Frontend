import React from "react";
import "./Pagination.css"
const Pagination = ({pageNo, setPageNo}) => {

  const prevThreeNumber = Array.from({ length: 3 }, (_, index) => {
    return pageNo - 1 - index;
  })
    .filter((value) => value > 0)
    .reverse();

  const nextFourNumber = Array.from({ length: 4 }, (_, index) => {
    return pageNo + index;
  });

  const pageArr = [...prevThreeNumber, ...nextFourNumber];

  const handlePrev = () => {
    setPageNo(pageNo - 1);
  };
  const handleNext = () => {
    setPageNo(pageNo + 1);
  };
  return (
    <div className="pagination-container">
      {pageNo > 1 && (
        <div
          onClick={() => {
            handlePrev();
          }}
          className="page-btn"
        >
          {" "}
          {"<"}{" "}
        </div>
      )}
      {pageArr.map((pageno,index) => {
        return (
          <button key={index}
            className={pageNo === pageno ? "page-btn active" : "page-btn"}
            onClick={() => {
              setPageNo(pageno);
            }}
          >
            {pageno}
          </button>
        );
      })}
      <div
        onClick={() => {
          handleNext();
        }}
        className="page-btn"
      >
        {" "}
        {">"}{" "}
      </div>
    </div>
  );
};

export default Pagination;
