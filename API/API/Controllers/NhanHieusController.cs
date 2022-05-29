using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanHieusController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public NhanHieusController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        // GET: api/ThuongHieus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhanHieu>>> GetThuongHieus()
        {
            return await _context.NhanHieus.ToListAsync();
        }
        // GET: api/ThuongHieus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NhanHieu>> GetThuongHieu(int id)
        {
            var thuongHieu = await _context.NhanHieus.FindAsync(id);
            if (thuongHieu == null)
            {
                return NotFound();
            }
            return thuongHieu;
        }
        // PUT: api/ThuongHieus/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhanHieu(int id, [FromForm] UploadBrand upload)
        {
            NhanHieu thuonghieu = new NhanHieu();
            thuonghieu = await _context.NhanHieus.FirstOrDefaultAsync(c => c.Id == id);
            thuonghieu.Ten = upload.Name;
            thuonghieu.DateCreate = DateTime.Now;
            _context.NhanHieus.Update(thuonghieu);
            try
            {
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThuongHieuExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
              Notification notification = new Notification()
            {
                TenSanPham = upload.Name,
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return NoContent();
        }
        // POST: api/ThuongHieus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<NhanHieu>> PostNhanHieu([FromForm] UploadBrand upload)
        {
            NhanHieu nhanhieu = new NhanHieu();
            nhanhieu.Ten = upload.Name;
           nhanhieu.DateCreate = DateTime.Now;
            _context.NhanHieus.Add(nhanhieu);
            Notification notification = new Notification()
            {
                TenSanPham = upload.Name,
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // DELETE: api/ThuongHieus/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteThuongHieu(int id)
        {
            SanPham[] product;
            product = await _context.SanPhams.Where(b => b.Id_NhanHieu == id).ToArrayAsync();
            var brand = await _context.NhanHieus.FindAsync(id);
            if (product == null)
            {
                _context.NhanHieus.Remove(brand);
                Notification notification = new Notification()
                {
                    TenSanPham = brand.Ten,
                    TranType = "Delete"
                };
                _context.Notifications.Add(notification);
                await _hubContext.Clients.All.BroadcastMessage();
                await _context.SaveChangesAsync();
            }
            else
            {
                _context.SanPhams.RemoveRange(product);
                await _context.SaveChangesAsync();
                _context.NhanHieus.Remove(brand);
                Notification notification = new Notification()
                {
                    TenSanPham = brand.Ten,
                    TranType = "Delete"
                };
                _context.Notifications.Add(notification);
                await _hubContext.Clients.All.BroadcastMessage();
                await _context.SaveChangesAsync();
            }
            return Ok();
        }
        private bool ThuongHieuExists(int id)
        {
            return _context.NhanHieus.Any(e => e.Id == id);
        }
    }
}
