using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.ViewModel
{
    public class AuthModel
    {

        public string Message { get; set; }
        public bool IsAuthenticated { get; set; }
        public string Email { get; set; }
        public string User { get; set; }
        public string Roles { get; set; }
        public string Token { get; set; }
        public DateTime EndTime { get; set; }

    }
}
