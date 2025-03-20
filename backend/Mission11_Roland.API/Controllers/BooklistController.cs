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
        public IActionResult GetAllBooks(int pageSize = 10, int pageNum = 1)
        {
            // get the books from the context   
            var bookList = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // get the total number of books
            var totalNumBooks = _context.Books.Count();

            return Ok(new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}
