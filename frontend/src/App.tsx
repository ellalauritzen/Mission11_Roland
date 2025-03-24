// Ella Roland
// Mission 11
// Bookstore example

import { useState } from 'react';
import './App.css';
import BookList from './BookList.tsx';
import CategoryFilter from './CategoryFilter.tsx';
import Fingerprint from './Fingerprint.tsx';
import WelcomeBand from './WelcomeBand.tsx';

function App() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container mt-4">
        <div className="row bg-primary text-white">
          <WelcomeBand />
        </div>
        <br/>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories}/>
          </div>
        </div>
      </div>
      <br />
      <Fingerprint />
    </>
  );
}

export default App;
