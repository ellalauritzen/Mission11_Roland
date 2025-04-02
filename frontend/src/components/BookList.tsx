import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadBooks = async () => {
      try{
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);

        const sortedBooks = [...(data.books || [])].sort((a, b) => {
          const titleA = a.title.replace(/^The\s+/i, '');
          const titleB = b.title.replace(/^The\s+/i, '');
          return sortOrder === 'asc'
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });

        setBooks(sortedBooks);
        setTotalPages(
          Math.max(1, Math.ceil((data.totalNumBooks || 0) / pageSize)),
        );
        // } catch (error) {
        //   console.error('Error fetching books:', error);
        //   setBooks([]);
        //   setTotalItems(0);
        //   setTotalPages(1);
      } catch (error){
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, sortOrder, selectedCategories]);

  if (loading) return <p>Loading books...</p>
  if (error) return <p className='text-red-500'>Error: {error}</p>;

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

      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </div>
  );
}

export default BookList;
