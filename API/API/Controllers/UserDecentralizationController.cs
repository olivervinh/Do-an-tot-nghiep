using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserDecentralizationController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        public UserDecentralizationController(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }
        //get list role
        public async Task<IList<string>> GetAllListRole(AppUser user)
        {
            return await _userManager.GetRolesAsync(user);
        }
        //create new role
        public async Task<IActionResult> CreateNewRole(AppUser user,string role)
        {
            await _userManager.AddToRoleAsync(user, role);
            return Ok();
        }
    }
}
