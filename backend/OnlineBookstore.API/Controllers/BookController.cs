using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnlineBookstore.API.Models;

namespace OnlineBookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BookController : ControllerBase
    {
        private BookstoreDbContext _bookContext;
        
        public BookController(BookstoreDbContext temp)
        {
            _bookContext = temp;
        }
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool ascending = true, [FromQuery] List<string>?bookCat = null)
        {
            var query = _bookContext.Books.AsQueryable();

            // sorting
            query = ascending? query.OrderBy(b=> b.Title):
            query.OrderByDescending(b=>b.Title);

            //book types 
            if (bookCat != null && bookCat.Any())
            {
                query = query.Where(b=> bookCat.Contains(b.Category));
            }
            var totalNumBooks = query.Count();

            var books = query
                .Skip((pageNum-1)* pageSize)
                .Take(pageSize)
                .ToList();


            var someObject = new{
                    Books = books,
                    TotalNumBooks = totalNumBooks
                };
            return Ok(someObject);
        }

        [HttpGet("GetBookCategory")]
        public IActionResult GetBookCategories()
        {
            var bookCat = _bookContext.Books
            .Select(b => b.Category)
            .Distinct()
            .ToList();

            return Ok(bookCat);
        }

             //action related to adding data
        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _bookContext.Books.Add(newBook);
            _bookContext.SaveChanges();
            return Ok(newBook);
        }
        
        //action to update book

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _bookContext.Books.Find(bookId); //pull book into existing 

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _bookContext.Books.Update(existingBook);
            _bookContext.SaveChanges();

            return Ok(existingBook);
        }
        //action to delete book

        [HttpDelete("DeleteBook/{bookId}")]

        public IActionResult DeleteBook(int bookId)
        {
            var book =  _bookContext.Books.Find(bookId);

            if (book == null)
            {
                return NotFound(new {message="Book not found"});
            }

            _bookContext.Books.Remove(book);
            _bookContext.SaveChanges();

            return NoContent(); //successfully deleted the book
        }

    }
}
