import { useEffect, useState } from 'react';
import './CategoryFiltering.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  //list of book categories
  const [categories, setCategories] = useState<string[]>([]); //remember default state

  //consume
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Book/GetBookCategory'
        );

        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
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
    <div className="category-filter">
      <h5>Book Categories</h5>
      <div className="category-list">
        {categories.map((b) => (
          <div className="category-item" key={b}>
            <input
              type="checkbox"
              id={b}
              value={b}
              className="category-checkbox"
              onChange={handleCheckboxChange}
            />
            <label htmlFor={b}> {b}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
