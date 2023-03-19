using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Services;
using Web.ViewModel;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService BookService;

        public BooksController(IBookService _BookService)
        {
            BookService = _BookService;
        }

        [HttpGet("Getall")]
        public IActionResult Getall()
            {
            var books = BookService.Getall();
            return Ok(JsonConvert.SerializeObject(books));
        }
        [HttpGet("Getbook")]
        public IActionResult Getbook(int id)
        {
            var books = BookService.Getbook(id);
            return Ok(JsonConvert.SerializeObject(books));
        }


        [HttpGet("Delete")]
        public IActionResult Delete(int id)
            {
            var books = BookService.Delete(id);
            return Ok(books);
        }


        [HttpPost("Create")]
        public async Task<IActionResult> Create(BookVm model)
        {
            var books = await BookService.Create(model);
            return Ok(books);
        }

        [HttpPost("Update")]
        public IActionResult Update(BookVm model)
        {
            var books =  BookService.Update(model);
            return Ok(books);
        }

    }
}
