import React from 'react';
import './pagination.css';

function Pagination({ page, setPage }) {
  const totalPages = 10;

  return (
    <div className="pagination">
      <button 
        onClick={() => setPage(page - 1)} 
        disabled={page === 1}
        className="pagination-button"
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-number ${page === index + 1 ? 'active' : ''}`}
          onClick={() => setPage(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button 
        onClick={() => setPage(page + 1)} 
        disabled={page === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
