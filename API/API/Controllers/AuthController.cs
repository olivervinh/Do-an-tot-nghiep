using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Helpers;
using API.Models;
using API.Dtos;
using API.Helper.Factory;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtFactory _jwtFactory;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly JwtIssuerOptions _jwtOptions;
        private readonly DPContext _context;
        private readonly IMapper _mapper;
        public AuthController(UserManager<AppUser> userManager, IMapper mapper, DPContext context, IJwtFactory jwtFactory, IOptions<JwtIssuerOptions> jwtOptions)
        {
            _userManager = userManager;
            _jwtFactory = jwtFactory;
            _jwtOptions = jwtOptions.Value;
            _mapper = mapper;
            _context = context;
            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }
        static string id;
        [HttpPost("registerCustomer")]
        public async Task<IActionResult> Post([FromBody] JObject json)
        {
            var model = JsonConvert.DeserializeObject<RegistrationViewModel>(json.GetValue("data").ToString());
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            model.Quyen = "Customer";
            var userIdentity = _mapper.Map<AppUser>(model);
            var result = await _userManager.CreateAsync(userIdentity, model.Password);
            AppUser user = new AppUser();
            user = await _context.AppUsers.FirstOrDefaultAsync(s => s.Id == userIdentity.Id);
            _context.AppUsers.Update(user);
            if (!result.Succeeded) return new BadRequestObjectResult(Errors.AddErrorsToModelState(result, ModelState));
            await _context.JobSeekers.AddAsync(new JobSeeker { Id_Identity = userIdentity.Id, Location = model.Location });
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPost("getDiaChi")]
        public async Task<IActionResult> GetDiaChi([FromBody] JObject json)
        {
            var id = json.GetValue("id_user").ToString();
            var resuft = await _context.AppUsers.Where(d => d.Id == id).Select(d => d.DiaChi).SingleOrDefaultAsync();
            return Json(resuft);
        }
        // POST api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Post([FromBody] CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                quyen = _context.AppUsers.FirstOrDefault(s => s.Id == id).Quyen,
                hinh = _context.AppUsers.FirstOrDefault(s => s.Id == id).ImagePath,
                fullname = _context.AppUsers.FirstOrDefault(s => s.Id == id).FirstName + " " + _context.AppUsers.FirstOrDefault(s => s.Id == id).LastName,
                email = _context.AppUsers.FirstOrDefault(s => s.Id == id).Email,
                auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
            };
            var json = JsonConvert.SerializeObject(response, _serializerSettings);
            return new OkObjectResult(json);
        }
        [HttpPost("logout")]
        public IActionResult logout()
        {
            id = null;
            return Ok();
        }
        public async Task<IActionResult> UpdateUser([FromBody] CredentialsViewModel credentials)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var identity = await GetClaimsIdentity(credentials.UserName, credentials.Password);
            if (identity == null)
            {
                return BadRequest(Errors.AddErrorToModelState("login_failure", "Invalid username or password.", ModelState));
            }
            var response = new
            {
                id = identity.Claims.Single(c => c.Type == "id").Value,
                quyen = _context.AppUsers.FirstOrDefault(s => s.Id == id).Quyen,
                email = _context.AppUsers.FirstOrDefault(s => s.Id == id).Email,
                auth_token = await _jwtFactory.GenerateEncodedToken(credentials.UserName, identity),
                expires_in = (int)_jwtOptions.ValidFor.TotalSeconds
            };
            var json = JsonConvert.SerializeObject(response, _serializerSettings);
            return new OkObjectResult(json);
        }
        private async Task<ClaimsIdentity> GetClaimsIdentity(string userName, string password)
        {
            if (!string.IsNullOrEmpty(userName) && !string.IsNullOrEmpty(password))
            {
                // get the user to verifty
                var userToVerify = await _userManager.FindByNameAsync(userName);
                if (userToVerify != null)
                {
                    // check the credentials  
                    if (await _userManager.CheckPasswordAsync(userToVerify, password))
                    {
                        AuthHistory auth = new AuthHistory();
                        auth.IdentityId = userToVerify.Id;
                        auth.Datetime = DateTime.Now;
                        _context.AuthHistories.Add(auth);
                        await _context.SaveChangesAsync();
                        id = userToVerify.Id;
                        return await Task.FromResult(_jwtFactory.GenerateClaimsIdentity(userName, userToVerify.Id));
                    }
                }
            }
            return await Task.FromResult<ClaimsIdentity>(null);
        }
        [HttpGet("AuthHistory")]
        public async Task<ActionResult<AppUser>> GetAuthHistory()
        {
            AppUser appUser = new AppUser();
            appUser = await _context.AppUsers.FindAsync(id);
            return appUser;
        }
    }
}