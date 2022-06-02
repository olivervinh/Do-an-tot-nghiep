using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChiTietHoaDonsController : Controller
    {
        private readonly DPContext _context;
        public ChiTietHoaDonsController(DPContext context)
        {
            this._context = context;
        }
        public async Task<ActionResult<IEnumerable<ChiTietHoaDon>>> ChiTetHoaDons()
        {
            return await _context.ChiTietHoaDons.ToListAsync();
        }
        [HttpPost("chitiethoadon/{id}")]
        public async Task<ActionResult> ChitietHoaDon(int id)
        {
            var resuft = _context.ChiTietHoaDons.Where(d => d.Id_HoaDon == id)
                .Select(
                d => new ChiTietHoaDon
                {
                    GiaBan = d.GiaBan,
                    Soluong = d.Soluong,
                    Mau = d.Mau,
                    Size = d.Size,
                    SanPham = _context.SanPhams.Where(t => t.Id == d.Id_SanPham).FirstOrDefault()
                }
                );
            return Json(await resuft.FirstOrDefaultAsync());
        }
        [HttpPost("huydon/{id}")]
        public async Task<ActionResult> HuyDon(int id)
        {
            var resuft = await _context.HoaDons.Where(d => d.Id == id).SingleOrDefaultAsync();
            resuft.TrangThai = 2;
            await _context.SaveChangesAsync();
            return Json(resuft);
        }
        [HttpPost("thongtintaikhoan/{id}")]
        public async Task<ActionResult> ThongTinTaiKhoan(string idUser)
        {
            var resuft = await _context.AppUsers.Where(d => d.Id == idUser).Select(d => new ThongTinTaiKhoan
            {
                Ho = d.FirstName,
                Ten = d.LastName,
                DiaChi = d.DiaChi,
                SoDienThoai = d.SDT
            }).FirstOrDefaultAsync();
            return Json(resuft);
        }
    }
}
