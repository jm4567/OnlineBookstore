import { useState } from 'react';
import { Book } from '../types/Books';
import { updateBook } from '../api/BooksAPI';

// This component will handle the form for adding a new book
interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}
const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //set equal to whatever what in form and add whatever was typed in into form data
  };
  const handleSubmit = async (e: React.FormEvent) => {
    //prevent default and await data
    e.preventDefault();
    await updateBook(formData.bookId, formData);
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
        <button type="submit">Update Book</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default EditBookForm;
