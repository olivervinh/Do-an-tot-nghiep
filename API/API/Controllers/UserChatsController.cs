using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserChatsController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public UserChatsController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        [HttpGet("getchat")]
        public async Task<ActionResult<IEnumerable<ChatUserName>>> GetChat()
        {
            var query = from c in _context.UserChats
                        join u in _context.AppUsers
                        on c.IdUser equals u.Id
                        select new ChatUserName()
                        {
                            IdUser = c.IdUser,
                            ContentChat = c.ContentChat,
                            TimeChat = c.TimeChat,
                            Name = u.FirstName+" "+u.LastName,
                        };
            return await query.ToListAsync();
        }
        [HttpPost("addchat")]
        public async Task<ActionResult> AddChat([FromForm]UploadChat chat)
        {
            var newchat = new UserChat()
            {
                IdUser = chat.IdUser,
                ContentChat=chat.Content,
                TimeChat= DateTime.Now,
            };
           _context.UserChats.Add(newchat);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.Write(ex);
            }
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
    }
}
