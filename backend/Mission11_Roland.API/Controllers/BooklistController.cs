using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Roland.API.Data;

namespace Mission11_Roland.API.Controllers
{
    //set the route to the controller
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
            var query = _context.Books.AsQueryable();

            if(category != null && category.Any())
            {
                query = query.Where(b => category.Contains(b.Category));
            }

            var totalNumBooks = query.Count();

            // get the books from the context   
            var bookList = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            string favBooKClassification = Request.Cookies["FavoriteClassification"];

            Console.WriteLine("-----COOKIE------\n" + favBooKClassification);

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
    }
}
