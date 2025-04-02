import { useState, useEffect } from 'react';
import { Book } from '../types/Books';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types/CartItem';
import { useCart } from '../context/CartContext';
import DarkModeToggle from './DarkModeToggle';
import { fetchBooks } from '../api/BooksAPI';
import Pagination from './Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]); //setting it so it can be updated
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [ascending, setAscending] = useState<boolean>(true); //default set to true
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  //fetch all books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pageSize,
          pageNum,
          ascending,
          selectedCategories
        );
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        //even if there is error, but we need to execute
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, ascending, selectedCategories]);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p className="text-red-500"> Error: {error}</p>;

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
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
