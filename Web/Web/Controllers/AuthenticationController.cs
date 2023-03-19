using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Data;
using Web.Models;
using Web.Services;
using Web.ViewModel;

namespace Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly RoleManager<IdentityRole> RoleManager;
        private ApplicationDbContext db;
        private readonly IAuthService authService;
        public AuthenticationController(IAuthService _authService, RoleManager<IdentityRole> roleManage, ApplicationDbContext _db)
        {
            authService = _authService;
            RoleManager = roleManage;
            db = _db;
        }
        [HttpPost("register")]
        public async Task<IActionResult> register(RegisterVm model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var result = await authService.RegisterAsync(model);
            return Ok(JsonConvert.SerializeObject(result));
        }

        [HttpGet("Login")]
        public async Task<IActionResult> Login(string user, string pas)
        {

            var result = await authService.LoginAsync(user, pas);

            return Ok(JsonConvert.SerializeObject(result));
        }
        [HttpGet("CreateRole")]
        public async Task createrole()
        {

            string[] roleNames = { "Admin", "User" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    //create the roles and seed them to the database: Question 1
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
            }


        }


       
    }
}
