using Microsoft.EntityFrameworkCore;

namespace Mission11_Roland.API.Data
{
    // create a class to represent the database context
    public class BooklistDbContext : DbContext
    {
        public BooklistDbContext(DbContextOptions<BooklistDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }

    }
}
