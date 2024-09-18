const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex space-x-2">
        {currentPage > 1 && (
          <li>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              Previous
            </button>
          </li>
        )}
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-md transition duration-300 ${
                currentPage === number
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 transition duration-300"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
