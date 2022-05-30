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
using API.Helper;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaoPhieuNhapsController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public TaoPhieuNhapsController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this._context = context;
            this._hubContext = hubContext;
        }
        [HttpGet("sanpham/{id}")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetAllSanPhams(UploadNhaCungCap uploadNhaCungCap)
        {
            return await _context.SanPhams.ToListAsync();
        }
        [HttpGet("sanphambienthe")]
        public async Task<ActionResult<IEnumerable<SanPhamBienThe>>> GetAllSanPhamBienThe()
        {
            return await _context.SanPhamBienThes.ToListAsync();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PhieuNhapHangNhaCungCap>>> GetAllPhieuNhap()
        {
            var kb = from ncc in _context.NhaCungCaps
                     join pnh in _context.PhieuNhapHangs
                     on ncc.Id equals pnh.Id_NhaCungCap
                     join us in _context.AppUsers
                     on pnh.NguoiLapPhieu equals us.Id
                     select new PhieuNhapHangNhaCungCap()
                     {
                         Id = pnh.Id,
                         GhiChu = pnh.GhiChu,
                         NgayTao = pnh.NgayTao,
                         NguoiLapPhieu = us.FirstName +' '+us.LastName,
                         SoChungTu = pnh.SoChungTu,
                         TenNhaCungCap = ncc.Ten,
                         TongTien = pnh.TongTien,
                     };
            return await kb.ToListAsync();
        }
        [HttpPost("SanPhamNhaCungCap")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetSanPhamNhaCungCaps(NhaCungCap ncc)
        {
          return await _context.SanPhams.Where(s => s.Id_NhaCungCap == ncc.Id).ToListAsync();
        }
        [HttpPost("NhaCungCap")]
        public async Task<ActionResult<NhaCungCap>> GetNhaCungCaps(NhaCungCap ncc)
        {
            return await _context.NhaCungCaps.FindAsync(ncc.Id);
        }
        [HttpPost("SanPhamBienTheMauSizeLoai")]
        public async Task<ActionResult<IEnumerable<SanPhamBienTheMauSizeLoai>>> GetTenSanPhamBienThe(SanPham sps)
        {
            var kb = from spbt in _context.SanPhamBienThes
                     join sp in _context.SanPhams.Where(s => s.Id==sps.Id)
                     on spbt.Id_SanPham equals sp.Id
                     join l in _context.Loais
                     on sp.Id_Loai equals l.Id
                     join m in _context.MauSacs
                     on spbt.Id_Mau equals m.Id
                     join s in _context.Sizes
                     on spbt.SizeId equals s.Id
                     select new SanPhamBienTheMauSizeLoai()
                     {
                         Id = spbt.Id,
                         TenSanPhamBienTheMauSize = "Id: "+spbt.Id+" Tên: "+sp.Ten + " " + l.Ten + " " + m.MaMau,
                         GiaNhap = (decimal)sp.GiaNhap,
                     };
            return await kb.ToListAsync();
        }
        [HttpPost]
        public async Task<IActionResult> PostTaoPhieuNhap(UploadPhieuNhapHang uploadPhieuNhap)
        {
            PhieuNhapHang phieuNhap = new PhieuNhapHang()
            {
                NguoiLapPhieu = uploadPhieuNhap.NguoiLapPhieu,
                NgayTao = DateTime.Now,
                Id_NhaCungCap=int.Parse(uploadPhieuNhap.IdNhaCungCap),
                SoChungTu = StringHelper.RandomString(7),
                TongTien = uploadPhieuNhap.TongTien,
                GhiChu = uploadPhieuNhap.GhiChu,
            };
            _context.Add(phieuNhap);
            await _context.SaveChangesAsync();
            List<ChiTietPhieuNhapHang> listctpn = new List<ChiTietPhieuNhapHang>();
            foreach (var chitietupload in uploadPhieuNhap.ChiTietPhieuNhaps)
            {
                ChiTietPhieuNhapHang ctpn = new ChiTietPhieuNhapHang();
                ctpn.Id_SanPhamBienThe = StringHelper.XuLyIdSPBT(chitietupload.TenSanPhamBienThe);
                ctpn.ThanhTienNhap = chitietupload.GiaNhapSanPhamBienThe*chitietupload.SoLuongNhap;
                ctpn.Id_PhieuNhapHang = phieuNhap.Id;
                ctpn.SoluongNhap = chitietupload.SoLuongNhap;
                SanPhamBienThe spbt = await _context.SanPhamBienThes.FindAsync(StringHelper.XuLyIdSPBT(chitietupload.TenSanPhamBienThe));
                spbt.SoLuongTon = spbt.SoLuongTon + chitietupload.SoLuongNhap;
               _context.SanPhamBienThes.Update(spbt);
                listctpn.Add(ctpn);
                _context.ChiTietPhieuNhapHangs.Add(ctpn);
                await _context.SaveChangesAsync();
            }
            _context.PhieuNhapHangs.Update(phieuNhap);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        } 
        [HttpGet("{id}")]
        public async Task<ActionResult<PhieuNhapChiTietPhieuNhap>> GetDetailPhieuNhapAsync(int id)
        {
            var listDetail = from spbt in _context.SanPhamBienThes
                     join sp in _context.SanPhams
                     on spbt.Id_SanPham equals sp.Id
                     join l in _context.Loais
                     on sp.Id_Loai equals l.Id
                     join m in _context.MauSacs
                     on spbt.Id_Mau equals m.Id
                     join s in _context.Sizes
                     on spbt.SizeId equals s.Id
                     join ctpn in _context.ChiTietPhieuNhapHangs
                     on spbt.Id equals ctpn.Id_SanPhamBienThe
                     select new TenSanPhamBienTheChiTietPhieuNhap()
                     {
                         Id = spbt.Id,
                         TenSanPhamBienTheMauSize =sp.Ten + " " + s.TenSize + " " + m.MaMau,
                         GiaNhap = (decimal)sp.GiaNhap,
                         SoluongNhap = ctpn.SoluongNhap,
                         ThanhTienNhap = ctpn.ThanhTienNhap,
                         Id_PhieuNhapHang = (int)ctpn.Id_PhieuNhapHang
                     };            
            var kb = (from phieunhap in _context.PhieuNhapHangs
                     join us in _context.AppUsers
                     on phieunhap.NguoiLapPhieu equals us.Id
                     join ncc in _context.NhaCungCaps
                     on phieunhap.Id_NhaCungCap equals ncc.Id
                     select new PhieuNhapChiTietPhieuNhap()
                     {
                         Id = phieunhap.Id,
                         GhiChu = phieunhap.GhiChu,
                         NgayTao = phieunhap.NgayTao,
                         SoChungTu = phieunhap.SoChungTu,
                         TongTien = phieunhap.TongTien,
                         NguoiLapPhieu = us.FirstName + " " + us.LastName,
                         NhaCungCap = new NhaCungCap()
                         {
                             Id = ncc.Id,
                             Ten = ncc.Ten,
                             DiaChi = ncc.DiaChi,
                             ThongTin = ncc.ThongTin,
                             SDT = ncc.SDT,
                         },
                         ChiTietPhieuNhaps = (List<TenSanPhamBienTheChiTietPhieuNhap>)listDetail.Where(s=>s.Id_PhieuNhapHang==id),
                     });
            return await kb.FirstOrDefaultAsync(s=>s.Id==id);
        }
    }
}
