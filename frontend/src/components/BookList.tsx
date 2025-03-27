import { useState, useEffect } from 'react';
import { Book } from '../types/Books';
import { useNavigate, useParams } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]); //setting it so it can be updated
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [ascending, setAscending] = useState<boolean>(true); //default set to true
  const navigate = useNavigate();
  const { addToCart } = useCart();

  //fetch all books
  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCat=${encodeURIComponent(cat)}`)
        .join('&');
      const response = await fetch(
        //parameters to change result size, page number, and sort
        `https://localhost:5000/api/Book?pageSize=${pageSize}&pageNum=${pageNum}&ascending=${ascending}${selectedCategories.length ? `&${categoryParams}` : ''}`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(totalItems / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, totalItems, ascending, selectedCategories]);

  //sorting ascending or descending
  const toggleSort = () => {
    setAscending(!ascending);
    setPageNum(1);
  };

  return (
    <>
      <button onClick={toggleSort}>
        Sort by Title {ascending ? '(A-Z)' : '(Z-A)'}
      </button>
      <DarkModeToggle />
      <br />
      <br />
      {books.map((b) => (
        <div
          id="bookCard"
          className="card mb-3 shadow-sm border-1 hover-shadow"
          key={b.bookId}
        >
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>Author: {b.author}</li>
              <li>Publisher: {b.publisher}</li>
              <li>ISBN: {b.isbn}</li>
              <li>Classification: {b.classification}</li>
              <li>Category: {b.category}</li>
              <li>Number of Pages: {b.pageCount}</li>
              <li>Price: {b.price}</li>
            </ul>
            <button
              //arrow function to pick the specific book
              className="btn btn-success"
              onClick={() => {
                const newItem: CartItem = {
                  bookId: Number(b.bookId),
                  title: b.title || 'No Book Found',
                  quantityAmount: 1,
                  price: Number(b.price),
                };
                addToCart(newItem);
                navigate('/cart');
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>
      {[...Array(totalPages)].map(
        //for loop but with map
        (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        )
      )}
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
    </>
  );
}

export default BookList;
