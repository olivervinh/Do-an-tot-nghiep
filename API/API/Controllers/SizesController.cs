using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SizesController : Controller
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public SizesController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }
        [HttpPost("sizetheomau")]
        public IActionResult getListSizeTheoMau([FromBody] JObject json)
        {
            try
            {
                var id = int.Parse(json.GetValue("id_san_pham").ToString());
                var mamau = json.GetValue("mamau").ToString();
                var id_loai_sp = _context.SanPhams.Where(d => d.Id == id).Select(d => d.Id_Loai).SingleOrDefault();
                var mauloai = mamau + id_loai_sp;
                var id_mau = _context.MauSacs.Where(d => d.MaMau+d.Id_Loai == mauloai && d.Id_Loai == id_loai_sp).Select(d => d.Id).SingleOrDefault();
                var list_idsize = _context.SanPhamBienThes.Where(d => d.Id_Mau == id_mau && d.Id_SanPham == id).Select(d => d.SizeId.ToString()).ToList();
                var resuft = _context.Sizes.Where(d => list_idsize.Contains(d.Id.ToString())).Select(
                    d => new
                    {
                        size = d.TenSize
                    }).ToList();
                return Json(resuft);
            }
            catch (Exception ex)
            {
                var a = ex;
                return Json("");
            }
        }
        // GET: api/Sizes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SizeLoai>>> GetSizes()
        {
            var kb = from l in _context.Loais
                     join s in _context.Sizes
                     on l.Id equals s.Id_Loai
                     select new SizeLoai()
                     {
                         Id = s.Id,
                         Id_Loai = (int)s.Id_Loai,
                         TenLoai = l.Ten,
                         TenSize = s.TenSize
                     };
            return await kb.ToListAsync();
        }
        [HttpGet("tensizeloai")]
        public async Task<ActionResult<IEnumerable<TenSizeLoai>>> GetTenSizeLoais()
        {
            var kb = from m in _context.Sizes
                     join l in _context.Loais
                     on m.Id_Loai equals l.Id
                     select new TenSizeLoai()
                     {
                         Id = m.Id,
                         SizeLoaiTen = m.TenSize+" "+l.Ten
                     };
            var kbs = kb.ToListAsync();
            return await kbs;
        }
        // GET: api/Sizes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Size>> GetSize(int id)
        {
            var size = await _context.Sizes.FindAsync(id);
            if (size == null)
            {
                return NotFound();
            }
            return size;
        }
        // PUT: api/Sizes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSize(int id, [FromForm] UploadSize upload)
        {
            Size size;
            size = await _context.Sizes.FindAsync(id);
            size.TenSize = upload.TenSize;
            size.Id_Loai = upload.Id_Loai;
            _context.Sizes.Update(size);
            Notification notification = new Notification()
            {
                TenSanPham = upload.TenSize,
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return NoContent();
        }
        // POST: api/Sizes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Size>> PostSize([FromForm]UploadSize upload)
        {
            Size size = new Size()
            {
                TenSize = upload.TenSize,
                Id_Loai = upload.Id_Loai,
            };
            _context.Sizes.Add(size);
            Notification notification = new Notification()
            {
                TenSanPham = upload.TenSize,
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return CreatedAtAction("GetSize", new { id = size.Id }, size);
        }
        // DELETE: api/Sizes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSize(int id)
        {
            var size = await _context.Sizes.FindAsync(id);
            if (size == null)
            {
                return NotFound();
            }
            _context.Sizes.Remove(size);
            Notification notification = new Notification()
            {
                TenSanPham = size.TenSize,
                TranType = "Delete"
            };
            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return NoContent();
        }
        private bool SizeExists(int id)
        {
            return _context.Sizes.Any(e => e.Id == id);
        }
    }
}
