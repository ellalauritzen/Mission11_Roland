import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

//component to list out books
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc'); // Default: A-Z sorting
  const navigate = useNavigate();

  // stops unnecessary API calls
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `category=${encodeURIComponent(c)}`)
        .join('&');

      try {
        //calls database API
        const response = await fetch(
          `http://localhost:5000/Booklist/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length > 0 ? `&${categoryParams}` : ''}`,
          {
            credentials: 'include',
          },
        );
        //error handling
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        //data returned as json
        const data = await response.json();

        // Sort books by title before setting state
        const sortedBooks = [...(data.books || [])].sort((a, b) => {
          const titleA = a.title.replace(/^The\s+/i, ''); // Remove "The " from start
          const titleB = b.title.replace(/^The\s+/i, '');

          return sortOrder === 'asc'
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });

        //set sorted books and item/page counts
        setBooks(sortedBooks);
        setTotalItems(data.totalNumBooks || 0);
        setTotalPages(
          Math.max(1, Math.ceil((data.totalNumBooks || 0) / pageSize)),
        );
        //error handling. sets all to 0 if books aren't found
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]); // Sort order dependency added

  return (
    <>
      {/* Returns a list of books with the option to sort */}
      <div className="container">
        {/* Sorting Dropdown */}
        <div className="d-flex justify-content-end mb-3">
          <label className="me-2">
            Sort by Title:
            <select
              className="ms-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </label>
        </div>

        <div className="row">
          {books.map((b) => (
            <div key={b.bookID} className="col-12 mb-3">
              <div className="card shadow-sm border rounded p-3">
                <div className="card-body">
                  <h3 className="card-title">{b.title}</h3>
                  <ul className="list-unstyled">
                    <li>
                      <strong>Author: </strong>
                      {b.author}
                    </li>
                    <li>
                      <strong>Classification: </strong>
                      {b.classification}
                    </li>
                    <li>
                      <strong>Category: </strong>
                      {b.category}
                    </li>
                    <li>
                      <strong>Number of Pages:</strong> {b.pageCount}
                    </li>
                    <li>
                      <strong>Price: $</strong>
                      {b.price}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN: </strong>
                      {b.isbn}
                    </li>
                  </ul>

                  <div>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate(`/bookDetails/${b.title}/${b.bookID}`)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="d-flex justify-content-center gap-2 mt-3">
          <button
            className="btn btn-primary btn-sm"
            disabled={pageNum === 1}
            onClick={() => setPageNum(pageNum - 1)}
          >
            Previous
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i + 1}
              className={`btn btn-sm ${pageNum === i + 1 ? 'btn-dark' : 'btn-outline-primary'}`}
              onClick={() => setPageNum(i + 1)}
              disabled={pageNum === i + 1}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-primary btn-sm"
            disabled={pageNum === totalPages}
            onClick={() => setPageNum(pageNum + 1)}
          >
            Next
          </button>
        </div>

        {/* Page Size Selector */}
        <div className="d-flex justify-content-center mt-3">
          <label>
            Results per page:
            <select
              className="ms-2"
              value={pageSize}
              onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1);
              }}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>
    </>
  );
}

export default BookList;
