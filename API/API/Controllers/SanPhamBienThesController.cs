using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SanPhamBienThesController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public SanPhamBienThesController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GiaSanPhamMauSacSanPhamSize>>> GetSanPhamBienThes()
        {
            var kb = from g in _context.SanPhamBienThes
                     join m in _context.MauSacs
                     on g.Id_Mau equals m.Id
                     join sp in _context.SanPhams
                     on g.Id_SanPham equals sp.Id
                     join s in _context.Sizes
                     on g.SizeId equals s.Id
                     select new GiaSanPhamMauSacSanPhamSize()
                     {
                         Id_Mau = m.Id,
                         Id_SanPham = sp.Id,
                         Id_Size = s.Id,
                         Id = g.Id,
                         MaMau = m.MaMau,
                         TenSanPham = sp.Ten,
                         TenSize = s.TenSize,
                         SoLuongTon = g.SoLuongTon
                     };
            return await kb.Take(50).ToListAsync();
        }
        // GET: api/SanPhamBienThes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SanPhamBienThe>> Get(int id)
        {
            var giaSanPham = await _context.SanPhamBienThes.FindAsync(id);
            if (giaSanPham == null)
            {
                return NotFound();
            }
            return giaSanPham;
        }
        // PUT: api/SanPhamBienThes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSanPhamBienThe(int id, [FromForm] UploadSanPhamBienThe upload)
        {
            SanPhamBienThe spbt;
            spbt = await _context.SanPhamBienThes.FindAsync(id);
            spbt.Id_Mau = upload.MauId;
            spbt.Id_SanPham = upload.SanPhamId;
            spbt.SizeId = upload.SizeId;
            spbt.SoLuongTon = upload.SoLuongTon;           
           _context.SanPhamBienThes.Update(spbt);         
            Notification notification = new Notification()
            {
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // POST: api/SanPhamBienThes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<SanPhamBienThe>> PostSanPhamBienThe([FromForm] UploadSanPhamBienThe upload)
        {
            Notification notification = new Notification()
            {           
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            SanPhamBienThe spbt = new SanPhamBienThe()
            {
                Id_SanPham = upload.SanPhamId,
                SizeId = upload.SizeId,
                Id_Mau = upload.MauId,
                SoLuongTon = upload.SoLuongTon,
            };
            _context.SanPhamBienThes.Add(spbt);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // DELETE: api/SanPhamBienThes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSanPhamBienTh(int id)
        {
            SanPhamBienThe spbt;
            spbt = await _context.SanPhamBienThes.FindAsync(id);
            _context.SanPhamBienThes.Remove(spbt);
            Notification notification = new Notification()
            {
                //TenSanPham = spbt.ImagePath,
                TranType = "Delete",
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        private bool GiaSanPhamExists(int id)
        {
            return _context.SanPhamBienThes.Any(e => e.Id == id);
        }
    }
}
