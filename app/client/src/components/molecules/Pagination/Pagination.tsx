// // src/components/molecules/Pagination/Pagination.tsx
import React, { useState } from 'react';
import Button from '@components/atoms/Button/Button'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const page = parseInt(e.target.value, 10);
    setSelectedPage(page);
    onPageChange(page);
  };

  return (
    <div className="pagination">
      {/* Previous Button */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel="Go to previous page"
      >
        Previous
      </Button>

      {/* Page Selection Dropdown */}
      <select
        value={selectedPage}
        onChange={handlePageChange}
        aria-label="Select page"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            Page {page}
          </option>
        ))}
      </select>

      {/* Next Button */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel="Go to next page"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;