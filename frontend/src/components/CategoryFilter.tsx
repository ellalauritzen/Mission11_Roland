import { useEffect, useState } from 'react';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/Booklist/GetBookCategories',
        );
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="card-title mb-0">Book Categories</h5>
      </div>
      <div className="card-body">
        <div className="list-group list-group-flush">
          {categories.map((c) => (
            <label
              key={c}
              className="list-group-item list-group-item-action d-flex align-items-center"
            >
              <input
                className="form-check-input me-3"
                type="checkbox"
                value={c}
                checked={selectedCategories.includes(c)}
                onChange={handleCheckboxChange}
              />
              <span className="flex-grow-1">{c}</span>
              <span className="badge bg-secondary ms-2">
                {/* You could add a count of books in this category if available */}
              </span>
            </label>
          ))}
        </div>
      </div>
      {selectedCategories.length > 0 && (
        <div className="card-footer">
          <button
            className="btn btn-outline-secondary btn-sm w-100"
            onClick={() => setSelectedCategories([])}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default CategoryFilter;
