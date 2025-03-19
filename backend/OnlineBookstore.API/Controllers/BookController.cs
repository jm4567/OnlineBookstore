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
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, bool ascending = true)
        {
            var query = _bookContext.Books.AsQueryable();

            // sorting
            query = ascending? query.OrderBy(b=> b.Title):
            query.OrderByDescending(b=>b.Title);


            var books = query
                .Skip((pageNum-1)* pageSize)
                .Take(pageSize)
                .ToList();

                var totalNumBooks = _bookContext.Books.Count();

                var someObject = new{
                    Books = books,
                    TotalNumBooks = totalNumBooks
                };
            return Ok(someObject);
        }
    }
}
