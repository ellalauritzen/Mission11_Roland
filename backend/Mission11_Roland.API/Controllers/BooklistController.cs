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
        public IEnumerable<Book> Get()
        {
            var bookList = _context.Books.ToList();

            return bookList;
        }
    }
}
