import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <div className="container-fluid px-4">
        <CartSummary />
        <WelcomeBand />
        <br />
        <div className="row g-4">
          <div className="col-12 col-md-3 col-lg-2">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-12 col-md-9 col-lg-10">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default BooksPage;
