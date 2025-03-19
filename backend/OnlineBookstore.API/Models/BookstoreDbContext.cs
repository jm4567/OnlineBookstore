using Microsoft.EntityFrameworkCore;

namespace OnlineBookstore.API.Models;

public class BookstoreDbContext: DbContext
{
    public BookstoreDbContext(DbContextOptions<BookstoreDbContext> options) : base(options)
    {
        
    }
    public DbSet<Book> Books { get; set; }
}