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
        [HttpGet]
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
    }
}
