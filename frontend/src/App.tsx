import React from 'react';
import Fingerprint from './components/Fingerprint';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">


          {/* Main Content */}
          <div className="container flex-grow-1">
            <div className="row justify-content-center">
              <div className="col-12 col-xl-10">
                <Routes>
                  <Route path="/" element={<BooksPage />} />
                  <Route
                    path="/bookDetails/:title/:bookId/:price"
                    element={<BookDetailsPage />}
                  />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/cart" element={<CartPage />} />
                </Routes>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="footer mt-auto py-3 bg-light">
            <div className="container text-center">
              <span className="text-muted">
                © {new Date().getFullYear()} Book Store. All Rights Reserved.
              </span>
            </div>
          </footer>
        </div>
        <Fingerprint />
      </Router>
    </CartProvider>
  );
}

export default App;
