using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data;
using Web.Models;
using Web.ViewModel;

namespace Web.Services
{
    public class BookService : IBookService
    {
        private ApplicationDbContext db ;

        public BookService(ApplicationDbContext _db)
        {
            db = _db;
        }
        public async Task<bool> Create(BookVm book)
        {
            try
            {
                var newbook = new Book
                {
                    Title = book.Title,
                    Author = book.Author
                };
                await db.Books.AddAsync(newbook);
                await db.SaveChangesAsync();
                return true;
            }

            catch
            {
                return false;
            }
            

        }

        public  bool Delete(int? id)
        {
            if (id != null)
            {
                try
                {

                    var book = db.Books.FirstOrDefault(x => x.Id == id);
                    if (book != null)
                    {
                        db.Books.Remove(book);
                        db.SaveChanges();
                        return true;
                    }
                    else
                        return false;

                }

                catch
                {
                    return false;
                }
                
            }
            else
                return false;
        }

        public List<BookVm> Getall()
        {
            var booklist = db.Books.ToList();
            return booklist != null ? db.Books.Select(x => new BookVm
            {
                id=x.Id,
                Title = x.Title,
                Author = x.Author
            }).ToList() : null;
        }

        public BookVm Getbook(int? id)
        {
            if (id == null)
                return null;
            else
            {
                var book = db.Books.Where(x => x.Id == id)?.Select(y => new BookVm
                {
                    id = y.Id,
                    Author = y.Author,
                    Title = y.Title
                }).FirstOrDefault();
                return book;
            }
        }

        public bool Update(BookVm tmpbook)
        {
            if (tmpbook != null)
            {
                try
                {

                    var book = db.Books.FirstOrDefault(x => x.Id == tmpbook.id);
                    if (book != null)
                    {
                        book.Title = tmpbook.Title;
                        book.Author = tmpbook.Author;
                        db.SaveChanges();
                        return true;
                    }
                    else
                        return false;

                }

                catch
                {
                    return false;
                }

            }
            else
                return false;
        }
    }
}
