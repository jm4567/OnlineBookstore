import { useState } from 'react';
import { Book } from '../types/Books';
import { addBook } from '../api/BooksAPI';

// This component will handle the form for adding a new book
interface NewBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}
const NewBookForm = ({ onSuccess, onCancel }: NewBookFormProps) => {
  const [formData, setFormData] = useState<Book>({
    //of book type inside book.ts
    //resset the form data to initial state
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: ' ',
    classification: '',
    category: ' ',
    pageCount: 0,
    price: 0,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //set equal to whatever what in form and add whatever was typed in into form data
  };
  const handleSubmit = async (e: React.FormEvent) => {
    //prevent default and await data
    e.preventDefault();
    await addBook(formData);
    onSuccess(); //got the data!
  };
  return (
    //form fields
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <div className="form-grid">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange} //like asp.for
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            name="publisher" //remember to match name in book.ts
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </label>
        <label>
          Classification:
          <input
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Number of Pages:
          <input
            type="number"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default NewBookForm;
