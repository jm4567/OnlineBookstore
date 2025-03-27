import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFiltering';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';
import Carousel from '../components/Carousel';

function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <div className="container mt-4">
      <CartSummary />
      <WelcomeBand />
      <div className="row">
        <div className="col-md-3">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-6">
          <BookList selectedCategories={selectedCategories} />
        </div>
        <div className="col-md-3">
          <Carousel />
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
