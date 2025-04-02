using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Roland.API.Data;

namespace Mission11_Roland.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BooklistController : ControllerBase
    {
        // create private variable to hold the context
        private BooklistDbContext _context;

        // create a constructor to inject the context
        public BooklistController(BooklistDbContext temp)
        {
            _context = temp;
        }

        // create a method to get all books
        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1, [FromQuery] List<string>? category = null)
        {
            // Start with base query
            var query = _context.Books.AsQueryable();

            // Apply category filtering
            if (category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));

                // Debug logging
                Console.WriteLine($"Received Categories: {string.Join(", ", category)}");
                Console.WriteLine($"Total Books After Filtering: {query.Count()}");
            }

            // Calculate total number of books after filtering
            var totalNumBooks = query.Count();

            // Apply pagination AFTER filtering
            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Cookie handling remains the same
            string favBookClassification = Request.Cookies["FavoriteClassification"];
            Console.WriteLine("-----COOKIE------\n" + favBookClassification);
            HttpContext.Response.Cookies.Append("FavoriteClassification", "Fiction", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.Now.AddMinutes(1)
            });

            return Ok(new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories()
        {
            var bookCategories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();
            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }

        [HttpPut("UpdateBook/{bookId}")]
        public IActionResult UpdateBook(int bookId, [FromBody] Book updatedBook)
        {
            var existingBook = _context.Books.Find(bookId);

            existingBook.Title = updatedBook.Title;
            existingBook.Author = updatedBook.Author;
            existingBook.Publisher = updatedBook.Publisher;
            existingBook.ISBN = updatedBook.ISBN;
            existingBook.Classification = updatedBook.Classification;
            existingBook.Category = updatedBook.Category;
            existingBook.PageCount = updatedBook.PageCount;
            existingBook.Price = updatedBook.Price;

            _context.Books.Update(existingBook);
            _context.SaveChanges();

            return Ok(existingBook);
        }


        [HttpDelete("DeleteBook/{bookId}")]
        public IActionResult DeleteBook(int bookId)
        {
            var book = _context.Books.Find(bookId);
            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent();
        }

    }
}