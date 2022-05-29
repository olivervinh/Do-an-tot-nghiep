using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController] 
    public class NotificationsController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public NotificationsController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        // GET: api/Notifications/notificationcount  
        [Route("notificationcount")]
        [HttpGet]
        public async Task<ActionResult<NotificationCountResult>> GetNotificationCount()
        {
            var count = (from not in _context.Notifications
                         select not).CountAsync();
            NotificationCountResult result = new NotificationCountResult
            {
                Count = await count
            };
            return result;
        }
        // GET: api/Notifications/notificationresult  
        [Route("notificationresult")]
        [HttpGet]
        public async Task<ActionResult<List<NotificationResult>>> GetNotificationMessage()
        {
            var results = from message in _context.Notifications
                          orderby message.Id descending
                          select new NotificationResult
                          {
                              TenSanPham = message.TenSanPham,
                              TranType = message.TranType
                          };
            return await results.ToListAsync();
        }
        // DELETE: api/Notifications/deletenotifications  
        [HttpDelete]
        [Route("deletenotifications")]
        public async Task<IActionResult> DeleteNotifications()
        {
            await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE Notifications");
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return NoContent();
        }
    }
}