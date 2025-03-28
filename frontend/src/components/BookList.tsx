import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((c) => `category=${encodeURIComponent(c)}`)
        .join('&');

      try {
        const response = await fetch(
          `http://localhost:5000/Booklist/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`,
          {
            credentials: 'include',
          },
        );

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data = await response.json();

        const sortedBooks = [...(data.books || [])].sort((a, b) => {
          const titleA = a.title.replace(/^The\s+/i, '');
          const titleB = b.title.replace(/^The\s+/i, '');
          return sortOrder === 'asc'
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });

        setBooks(sortedBooks);
        setTotalItems(data.totalNumBooks || 0);
        setTotalPages(
          Math.max(1, Math.ceil((data.totalNumBooks || 0) / pageSize)),
        );
      } catch (error) {
        console.error('Error fetching books:', error);
        setBooks([]);
        setTotalItems(0);
        setTotalPages(1);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  return (
    <div className="container-fluid px-4 py-3">
      <div className="row mb-3">
        <div className="col-12 d-flex justify-content-between align-items-center">
          <h2 className="mb-0">Book Catalog</h2>
          <div className="d-flex align-items-center">
            <span className="me-2 text-muted">Sort by Title:</span>
            <select
              className="form-select form-select-sm w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {books.map((b) => (
          <div key={b.bookID} className="col">
            <div className="card h-100 shadow-sm hover-lift">
              <div className="card-body">
                <h5 className="card-title text-truncate mb-3">{b.title}</h5>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-muted">Author</span>
                    <span>{b.author}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-muted">Category</span>
                    <span>{b.category}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-muted">Pages</span>
                    <span>{b.pageCount}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span className="text-muted">Price</span>
                    <span className="fw-bold text-primary">${b.price}</span>
                  </li>
                </ul>
                <div className="d-grid">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() =>
                      navigate(`/bookDetails/${b.title}/${b.bookID}/${b.price}`)
                    }
                  >
                    View Details & Buy
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div className="row mt-4">
        <div className="col-12 d-flex justify-content-center align-items-center">
          <nav aria-label="Book list navigation">
            <ul className="pagination">
              <li className={`page-item ${pageNum === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setPageNum(pageNum - 1)}
                  disabled={pageNum === 1}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${pageNum === i + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPageNum(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${pageNum === totalPages ? 'disabled' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPageNum(pageNum + 1)}
                  disabled={pageNum === totalPages}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Page Size Selector */}
      <div className="row mt-3">
        <div className="col-12 d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <span className="me-2 text-muted">Results per page:</span>
            <select
              className="form-select form-select-sm w-auto"
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookList;
