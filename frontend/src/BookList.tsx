import React, { useEffect, useState } from 'react';
import { Book } from '../types/Book';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch('http://localhost:5000/Booklist/AllBooks');
      const data = await response.json();

      setBooks(data);
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Books: </h1>
      <br />
      {books.map((b) => (
        <div key={b.bookID} className="book-card">
          <h3>{b.title}</h3>
          <ul>
            <li>Author: {b.author}</li>
            <li>Classification: {b.classification}</li>
            <li>Number of Pages: {b.pageCount}</li>
            <li>Price: {b.price}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
