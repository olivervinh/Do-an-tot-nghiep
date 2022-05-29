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
    public class NotificationCheckOutController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public NotificationCheckOutController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        // GET: api/Notifications/notificationcount  
        [Route("notificationcheckoutcount")]
        [HttpGet]
        public async Task<ActionResult<NotificationCountResult>> GetNotificationCount()
        {
            var count = (from not in _context.NotificationCheckouts
                         select not).CountAsync();
            NotificationCountResult result = new NotificationCountResult
            {
                Count = await count
            };
            return result;
        }
        [Route("notificationcheckoutresult")]
        [HttpGet]
        public async Task<ActionResult<List<NotificationCheckout>>> GetNotificationMessage()
        {
            var results = from message in _context.NotificationCheckouts
                          orderby message.Id descending
                          select new NotificationCheckout
                          {
                              Id = message.Id,
                              ThongBaoMaDonHang = message.ThongBaoMaDonHang
                          };
            return await results.ToListAsync();
        }
        // DELETE: api/Notifications/deletenotifications  
        [HttpDelete]
        [Route("deletenotificationcheckout")]
        public async Task<IActionResult> DeleteNotifications()
        {
            await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE NotificationCheckouts");
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return NoContent();
        }
    }
}