using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Web.Models;
using Web.ViewModel;

namespace Web.Services
{
    public class AuthService:IAuthService
    {

        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly SignInManager<User> _signmanager;
        private IConfiguration Configuration;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration _con, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _signmanager = signInManager;
            Configuration = _con;
            _roleManager = roleManager;
        }
        public async Task<AuthModel> LoginAsync(string username, string pass)
        {
            var auser = new AuthModel();
            var UserSign = await _userManager.FindByNameAsync(username);
            var result = await _signmanager.PasswordSignInAsync(username, pass, false, false);

            if (result.Succeeded)
            {
                var jwtSecurityToken = CreateJwtToken(UserSign.Id);
                auser.Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken);
                return auser;

            }
            else
            {
                auser.Message = "The username or password is invalid";
                return auser;
            }
        }

        public async Task<AuthModel> RegisterAsync(RegisterVm Model)
        {
            if (await _userManager.FindByEmailAsync(Model.Email) is not null)
                return new AuthModel { Message = "Email Already Exist" };

            if (await _userManager.FindByNameAsync(Model.Username) is not null)
                return new AuthModel { Message = "Username Already Exist" };

            User user = new User
            {
                UserName = Model.Username,
                FirstName=Model.FirstName,
                Email = Model.Email,

            };

            var result = await _userManager.CreateAsync(user, Model.password);

            if (!result.Succeeded)
            {
                var errors = string.Empty;
                foreach (var error in result.Errors)
                {
                    errors += " , " + error;
                }
                return new AuthModel { Message = errors };

            }

            //await _userManager.AddToRoleAsync(user, "User");
            var jwtSecurityToken = CreateJwtToken(user.Id);

            
            return new AuthModel
            {
                Email = user.Email,
                IsAuthenticated = true,
                Token = new JwtSecurityTokenHandler().WriteToken(jwtSecurityToken),
                User = user.UserName
            };

        }


        private JwtSecurityToken CreateJwtToken(string userid)
        {

            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:key"]));
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);
            var jwtSecurityToken = new JwtSecurityToken(
                issuer: Configuration["JWT:Issuer"],
                audience: Configuration["JWT:Audience"],
                claims: new List<Claim>() { new Claim(ClaimTypes.NameIdentifier, userid) },
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: signingCredentials);

            return jwtSecurityToken;
        }

    }
}
