using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.ViewModel;

namespace Web.Services
{
    public interface IAuthService
    {

        Task<AuthModel> RegisterAsync(RegisterVm model);

        Task<AuthModel> LoginAsync(string username, string pass);

    }
}
