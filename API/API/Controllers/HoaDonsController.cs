using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using OfficeOpenXml;
using Syncfusion.XlsIO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonsController : Controller
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        private readonly IDataConnector _connector;
        public HoaDonsController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext, IDataConnector connector)
        {
            this._context = context;
            this._hubContext = hubContext;
            _connector = connector;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HoaDonUser>>> AllHoaDons()
        {
            var kb = from hd in _context.HoaDons
                     join us in _context.AppUsers
                     on hd.Id_User equals us.Id
                     select new HoaDonUser()
                     {
                         GhiChu = hd.GhiChu,
                         Id = hd.Id,
                         NgayTao = hd.NgayTao,
                         TrangThai = hd.TrangThai,
                         TongTien = hd.TongTien,
                         FullName = us.FirstName + ' ' + us.LastName,
                     };
            return await kb.ToListAsync();
        }
        [HttpGet("admindetailorder/{id}")]
        public async Task<ActionResult<MotHoaDon>> HoaDonDetailAsync(int id)
        {
            return await _connector.HoaDonDetailAsync(id);
        }
        [HttpPost("hoadon/{id}")]
        public async Task<ActionResult> ChitietHoaDon(int id)
        {
            var resuft = await _context.HoaDons.Where(d => d.Id == id).FirstOrDefaultAsync();
            resuft.User = await _context.AppUsers.Where(d => d.Id == resuft.Id_User).FirstOrDefaultAsync();
            return Json(resuft);
        }
        [HttpPost("danhsachhoadon")]
        public async Task<ActionResult> ListHoaDon(UserDto user)
        {
            var resuft = await _context.HoaDons.Where(d => d.Id_User == user.idUser).ToListAsync();
            return Json(resuft);
        }
        [HttpPut("suatrangthai/{id}")]
        public async Task<IActionResult> SuaTrangThai(int id, HoaDonUser hd)
        {
            var kq = await _context.HoaDons.FindAsync(id);
            kq.TrangThai = hd.TrangThai;
            _context.HoaDons.Update(kq);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ChiTietHoaDonSanPhamBienTheViewModel>>> GetChiTietHoaDonSanPhamBienTheViewModel(int id)
        {
            var kb = from spbt in _context.SanPhamBienThes
                     join sp in _context.SanPhams
                     on spbt.Id_SanPham equals sp.Id
                     join cthd in _context.ChiTietHoaDons
                     on spbt.Id equals cthd.Id_SanPhamBienThe
                     join hd in _context.HoaDons
                     on cthd.Id_HoaDon equals hd.Id
                     join size in _context.Sizes
                     on spbt.SizeId equals size.Id
                     join mau in _context.MauSacs
                     on spbt.Id_Mau equals mau.Id
                     select new ChiTietHoaDonSanPhamBienTheViewModel()
                     {
                         IdCTHD = cthd.Id,
                         TenSanPham = sp.Ten,
                         //HinhAnh = spbt.ImagePath,
                         GiaBan = (decimal)sp.GiaBan,
                         SoLuong = cthd.Soluong,
                         ThanhTien = (decimal)cthd.ThanhTien,
                         Id_HoaDon = (int)cthd.Id_HoaDon,
                         TenMau = mau.MaMau,
                         TenSize = size.TenSize,
                     };
            return await kb.Where(s => s.Id_HoaDon == id).ToListAsync();
        }
        [HttpGet("magiamgia")]
        public async Task<ActionResult<IEnumerable<MaGiamGia>>> MaGiamGia()
        {
            return await _context.MaGiamGias.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<HoaDon>> TaoHoaDon(HoaDon hd)
        {
            HoaDon hoaDon = new HoaDon()
            {
                TrangThai = 0,
                GhiChu = hd.GhiChu,
                Id_User = hd.Id_User,
                NgayTao = DateTime.Now,
                Tinh = hd.Tinh,
                Huyen = hd.Huyen,
                Xa = hd.Xa,
                DiaChi = hd.DiaChi,
                TongTien = hd.TongTien
            };
            _context.HoaDons.Add(hoaDon);
            await _context.SaveChangesAsync();
            NotificationCheckout notification = new NotificationCheckout()
            {
                ThongBaoMaDonHang = hoaDon.Id,
            };
            _context.NotificationCheckouts.Add(notification);
            var cart = _context.Carts.Where(d => d.UserID == hd.Id_User).ToList();
            List<ChiTietHoaDon> ListCTHD = new List<ChiTietHoaDon>();
            for (int i = 0; i < cart.Count; i++)
            {
                var thisSanPhamBienThe =  _context.SanPhamBienThes.Find(cart[i].Id_SanPhamBienThe);
                ChiTietHoaDon cthd = new ChiTietHoaDon();
                cthd.Id_SanPham = cart[i].SanPhamId;
                cthd.Id_SanPhamBienThe = cart[i].Id_SanPhamBienThe;
                cthd.Id_HoaDon = hoaDon.Id;
                cthd.GiaBan = cart[i].Gia;
                cthd.Soluong = cart[i].SoLuong;
                cthd.ThanhTien = cart[i].Gia * cart[i].SoLuong;
                cthd.Size = cart[i].Size;
                cthd.Mau = cart[i].Mau;
                thisSanPhamBienThe.SoLuongTon = thisSanPhamBienThe.SoLuongTon - cart[i].SoLuong;
                _context.SanPhamBienThes.Update(thisSanPhamBienThe);
                _context.ChiTietHoaDons.Add(cthd);
                _context.Carts.Remove(cart[i]);
                await _context.SaveChangesAsync();
            };
            await _hubContext.Clients.All.BroadcastMessage();
            return Json(1);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHoaDons(int id)
        {
            ChiTietHoaDon[] cthd;
            cthd = _context.ChiTietHoaDons.Where(s => s.Id_HoaDon == id).ToArray();
            _context.ChiTietHoaDons.RemoveRange(cthd);
            HoaDon hd;
            hd = await _context.HoaDons.FindAsync(id);
            _context.HoaDons.Remove(hd);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
