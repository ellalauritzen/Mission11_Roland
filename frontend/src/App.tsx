// Ella Roland
// Mission 11
// Bookstore example

import Fingerprint from './components/Fingerprint';
import BooksPage from './pages/BooksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookDetailsPage from './pages/BookDetailsPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <div className="container">
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
        </Router>
        <Fingerprint />
      </CartProvider>
    </>
  );
}

export default App;
