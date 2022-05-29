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
    public class NhaCungCapsController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public NhaCungCapsController(DPContext context, IHubContext<BroadcastHub, IHubClient> _hubContext)
        {
            this._context = context;
            this._hubContext = _hubContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NhaCungCap>>> GetAllNhaCungCap()
        {
            return await _context.NhaCungCaps.ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> PostNhaCungCapAsync([FromForm] UploadNhaCungCap upload)
        {
            var nhacungcap = new NhaCungCap()
            {
                Ten = upload.Ten,
                SDT = upload.SDT,
                ThongTin = upload.ThongTin,
                DiaChi = upload.DiaChi,
            };
            _context.NhaCungCaps.Add(nhacungcap);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNhaCungCapAsync([FromForm] UploadNhaCungCap upload,int id)
        {
            var ncungcap = await _context.NhaCungCaps.FindAsync(id);
            ncungcap.Ten = upload.Ten;
            ncungcap.SDT = upload.SDT;
            ncungcap.ThongTin = upload.ThongTin;
            ncungcap.DiaChi = upload.DiaChi;
            _context.NhaCungCaps.Update(ncungcap);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNhaCungCapAsync(int id)
        {
            SanPham[] product;
            product = await _context.SanPhams.Where(s => s.Id_Loai == id).ToArrayAsync();
            var nhacungcap = await _context.NhaCungCaps.FindAsync(id);
            if (product == null)
            {
                _context.NhaCungCaps.Remove(nhacungcap);
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            else
            {
                _context.SanPhams.RemoveRange(product);
                await _context.SaveChangesAsync();
                _context.NhaCungCaps.Remove(nhacungcap);
                _context.SaveChanges();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            return Ok();
        }
    }
}
