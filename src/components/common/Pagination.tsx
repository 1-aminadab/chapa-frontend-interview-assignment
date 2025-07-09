import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const generatePages = (): (number | 'dots')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | 'dots')[] = [];
    const leftBound = Math.max(2, currentPage - 1);
    const rightBound = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (leftBound > 2) pages.push('dots');

    for (let page = leftBound; page <= rightBound; page++) {
      pages.push(page);
    }

    if (rightBound < totalPages - 1) pages.push('dots');
    pages.push(totalPages);

    return pages;
  };

  const pages = generatePages();

  const buttonClasses = (disabled: boolean) =>
    `px-3 py-1 m-1 rounded border text-sm transition-colors ${
      disabled
        ? 'opacity-50 cursor-not-allowed border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  const pageNumberClasses = (active: boolean) =>
    `px-3 py-1 m-1 rounded border text-sm transition-colors ${
      active
        ? 'bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500'
        : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700'
    }`;

  return (
    <div className="flex flex-wrap justify-center items-center p-4">
      {totalPages > 7 && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage <= 1}
          className={buttonClasses(currentPage <= 1)}
        >
          « First
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={buttonClasses(currentPage <= 1)}
      >
        ‹ Back
      </button>

      {pages.map((page, index) =>
        page === 'dots' ? (
          <span key={index} className="px-2 text-gray-500 dark:text-gray-400 text-lg">
            …
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={pageNumberClasses(page === currentPage)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={buttonClasses(currentPage >= totalPages)}
      >
        Next ›
      </button>

      {totalPages > 7 && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className={buttonClasses(currentPage >= totalPages)}
        >
          Last »
        </button>
      )}
    </div>
  );
};

export default Pagination;