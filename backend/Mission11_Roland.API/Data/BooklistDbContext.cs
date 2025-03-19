using Microsoft.EntityFrameworkCore;

namespace Mission11_Roland.API.Data
{
    public class BooklistDbContext : DbContext
    {
        public BooklistDbContext(DbContextOptions<BooklistDbContext> options) : base(options) { }

        public DbSet<Book> Books { get; set; }

    }
}
