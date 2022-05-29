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
    public class LoaisController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public LoaisController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        // GET: api/Loais
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Loai>>> GetLoais()
        {
            return await _context.Loais.ToListAsync();
        }
        public int getCountSP(List<SanPham> sps, int LoaiId)
        {
            sps = _context.SanPhams.ToList();
            int count = 0;
            foreach(SanPham sp in sps)
            {
                if(sp.Id_Loai == LoaiId)
                {
                    count++;
                }
            }
            return count;
        }
        [HttpGet("{id}/products")]
        public async Task<ActionResult<IEnumerable<SanPhamLoai>>> GetLoaiIdProducts(int id)
        {
            var listSP = _context.SanPhams.ToList();
            var kb = from l in _context.Loais.Where(l=>l.Id==id)
                     join s in _context.SanPhams
                     on l.Id equals s.Id_Loai  
                     select new SanPhamLoai()
                     {
                         SoLuongSanPham = getCountSP(listSP, id),
                         Id = s.Id,
                         Ten = s.Ten,
                         KhuyenMai = s.KhuyenMai,
                         MoTa = s.MoTa,                 
                         TrangThaiHoatDong = s.TrangThaiHoatDong,
                         TrangThaiSanPham = "san pham thuong",
                         HuongDan = s.HuongDan,
                         ThanhPhan = s.ThanhPhan,
                         TenLoai = l.Ten,
                     };
            return await kb.ToListAsync();
        }
        // GET: api/Loais/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Loai>> GetLoai(int id)
        {
            var loai = await _context.Loais.FindAsync(id);
            if (loai == null)
            {
                return NotFound();
            }
            return loai;
        }
        // PUT: api/Loais/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoai(int id, [FromForm] UploadCategory upload)
        {
            Notification notification = new Notification()
            {
                TenSanPham = upload.Name,
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            Loai loai = new Loai();
            loai = await _context.Loais.FirstOrDefaultAsync(c => c.Id == id);
            loai.Ten = upload.Name;
            _context.Loais.Update(loai);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoaiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // POST: api/Loais
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Loai>> PostLoai([FromForm] UploadCategory upload)
        {
            Notification notification = new Notification()
            {
                TenSanPham = upload.Name,
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            Loai loai = new Loai();
            loai.Ten = upload.Name;
            _context.Loais.Add(loai);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // DELETE: api/Loais/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoai(int id)
        {
            SanPham[] product;
            product = await _context.SanPhams.Where(s => s.Id_Loai == id).ToArrayAsync();
            Size[] sizes;
            sizes = await _context.Sizes.Where(s => s.Id_Loai == id).ToArrayAsync();
            MauSac[] mausacs;
            mausacs = await _context.MauSacs.Where(s => s.Id_Loai == id).ToArrayAsync();
            var category = await _context.Loais.FindAsync(id);
            foreach (var pro in product)
            {
            };
            Notification notification = new Notification()
            {
                TenSanPham = category.Ten,
                TranType = "Delete"
            };
            _context.Notifications.Add(notification);
            if (product == null)
            {
                _context.Loais.Remove(category);
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            else
            {
                _context.Sizes.RemoveRange(sizes);
                _context.SanPhams.RemoveRange(product);
                _context.MauSacs.RemoveRange(mausacs);
                await _context.SaveChangesAsync();
                _context.Loais.Remove(category);
                await _context.SaveChangesAsync();
                await _hubContext.Clients.All.BroadcastMessage();
            }
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        private bool LoaiExists(int id)
        {
            return _context.Loais.Any(e => e.Id == id);
        }
    }
}
