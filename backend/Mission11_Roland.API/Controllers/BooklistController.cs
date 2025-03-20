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
       private BooklistDbContext _context;

        public BooklistController(BooklistDbContext temp)
        {
            _context = temp;
        }

        [HttpGet("AllBooks")]
        public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1)
        {
            var bookList = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            return Ok(new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}
