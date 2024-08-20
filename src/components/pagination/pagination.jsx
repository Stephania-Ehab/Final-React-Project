// import React from 'react';

// function Pagination({ page, setPage }) {
//   return (
//     <div className="pagination">
//       <button onClick={() => setPage(page - 1)} disabled={page === 1}>
//         Previous
//       </button>
//       <span>{page}</span>
//       <button onClick={() => setPage(page + 1)}>
//         Next
//       </button>
//     </div>
//   );
// }

// export default Pagination;

import React from 'react';
import './pagination.css';

function Pagination({ page, setPage }) {
  const totalPages = 10; // Example total pages

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
