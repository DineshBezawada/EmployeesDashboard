import React from 'react';
import './pagination.css';

const Pagination = ({ totalRecords, pageDataLimit, currentPage, updateCurrentPage }) => {
  const totalPages = Math.ceil(totalRecords / pageDataLimit);
const getPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) pageNumbers.push(1);
      if (startPage > 2) pageNumbers.push('...');
for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) pageNumbers.push('...');
      if (endPage < totalPages) pageNumbers.push(totalPages);
    }
return pageNumbers;
  };

  const pageNumbers = getPageNumbers();
const handlePageClick = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      updateCurrentPage(pageNumber); 
    }
  };

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageClick(1)}
        disabled={currentPage === 1}
        className="page-btn first-last"
      >
        First
      </button>
<button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className="page-btn"
      >
        Prev
      </button>
{pageNumbers.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && handlePageClick(page)}
          className={`page-btn ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled-ellipsis' : ''}`}
          disabled={page === '...'}
        >
{page}
        </button>
      ))}
<button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="page-btn"
      >
        Next
      </button>
<button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className="page-btn first-last"
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;