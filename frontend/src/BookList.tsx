import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `http://localhost:5000/Booklist/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`,
      );
      const data = await response.json();

      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems]);

  return (
    <>
      <h1 className="text-center my-4">Books: </h1>
      <div className="container">
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
                      <strong>Number of Pages:</strong> {b.pageCount}
                    </li>
                    <li>
                      <strong>Price:</strong> {b.price}
                    </li>
                    <li>
                      <strong>Publisher:</strong> {b.publisher}
                    </li>
                    <li>
                      <strong>ISBN: </strong>
                      {b.isbn}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center gap-2 mt-3">
            <button
              disabled={pageNum === 1}
              onClick={() => setPageNum(pageNum - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setPageNum(i + 1)}
                disabled={pageNum === i + 1}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={pageNum === totalPages}
              onClick={() => setPageNum(pageNum + 1)}
            >
              Next
            </button>

            <br />
            <label>
              Results per page:
              <select
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
      </div>
    </>
  );
}

export default BookList;
