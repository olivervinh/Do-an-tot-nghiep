using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public AccountsController(UserManager<AppUser> userManager, IMapper mapper, DPContext context)
        {
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }
        // POST api/accounts
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] RegistrationViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userIdentity = _mapper.Map<AppUser>(model);      
            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            AppUser user = new AppUser();
            user = await _context.AppUsers.FirstOrDefaultAsync(s => s.Id == userIdentity.Id);
            _context.AppUsers.Update(user);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("updateprofile/{id}")]
        public async Task<IActionResult> Put([FromForm] UpdateUserProfile model, string id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            user.SDT = model.SDT;
            user.DiaChi = model.DiaChi;
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.PasswordHash = model.Password;
            _context.AppUsers.Update(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}