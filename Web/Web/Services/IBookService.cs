using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;
using Web.ViewModel;

namespace Web.Services
{
    public interface IBookService
    {
        List<BookVm> Getall();
        Task<bool> Create(BookVm book);
        BookVm Getbook(int? id);
        bool Delete(int? id);
        bool Update(BookVm tmpbook);

    }
}
