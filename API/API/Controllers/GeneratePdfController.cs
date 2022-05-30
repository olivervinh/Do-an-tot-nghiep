using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Wkhtmltopdf.NetCore;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GeneratePdfController : Controller
    {
        private readonly IGeneratePdf _generatePdf;
        private readonly DPContext _context;
        private readonly IDataConnector _connector;
        public GeneratePdfController(IGeneratePdf generatePd, DPContext context, IDataConnector connector)
        {
            _generatePdf = generatePd;
            _context = context;
            _connector = connector;
        }
        [HttpGet("allorder")]
        public async Task<IActionResult> GetAllOrder()
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
            return await _generatePdf.GetPdf("Views/PDFs/GetAllOrder.cshtml", await kb.ToListAsync());
        }
        [HttpGet("orderdetail/{id}")]
        public async Task<IActionResult> GetOneOrder(int id)
        {
            var result = await _connector.GetOneOrder(id);
            return await _generatePdf.GetPdf("Views/PDFs/GetOrderDetail.cshtml", result);
        }
        [HttpGet("allsanpham")]
        public async Task<IActionResult> GetAllSanPham()
        {
            var listIdSanPhamliked = await _context.UserLikes.Select(s => s.IdSanPham).ToListAsync();
            var list = _context.SanPhams.Select(
                   s => new SanPhamLoaiThuongHieu()
                   {
                       Id = s.Id,
                       Ten = s.Ten,
                       GiaBan = s.GiaBan,
                       Tag = s.Tag,
                       KhuyenMai = s.KhuyenMai,
                       MoTa = s.MoTa,
                       HuongDan = s.HuongDan,
                       GioiTinh = s.GioiTinh,
                       ThanhPhan = s.ThanhPhan,
                       IsLike = listIdSanPhamliked.Contains(s.Id),
                       TrangThaiSanPham = s.TrangThaiSanPham,
                       TrangThaiHoatDong = s.TrangThaiHoatDong,
                       Id_Loai = s.Id_Loai,
                       Id_NhanHieu = s.Id_NhanHieu,
                       SoLuongComment = _context.UserComments.Where(x => x.IdSanPham == s.Id).Count(),
                       SoLuongLike = _context.UserComments.Where(x => x.IdSanPham == s.Id).Count(),
                       TenLoai = _context.Loais.Where(d => d.Id == s.Id_Loai).Select(d => d.Ten).FirstOrDefault(),
                       TenNhanHieu = _context.NhanHieus.Where(d => d.Id == s.Id_NhanHieu).Select(d => d.Ten).FirstOrDefault(),
                       Image = _context.ImageSanPhams.Where(q => q.IdSanPham == s.Id).Select(q => q.ImageName).FirstOrDefault(),
                   }).Where(s => s.TrangThaiHoatDong == true).ToList();
            return await _generatePdf.GetPdf("Views/PDFs/GetAllSanPham.cshtml", list);
        }
        [HttpGet("allphieunhap")]
        public async Task<IActionResult> GetAllNhaCungCap()
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
                         NguoiLapPhieu = us.FirstName + ' ' + us.LastName,
                         SoChungTu = pnh.SoChungTu,
                         TenNhaCungCap = ncc.Ten,
                         TongTien = pnh.TongTien,
                     };
            return await _generatePdf.GetPdf("Views/PDFs/GetAllPhieuNhap.cshtml", kb);
        }
        [HttpGet("phieunhapdetail/{id}")]
        public async Task<IActionResult> Getphieunhapdetail(int id)
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
                                 TenSanPhamBienTheMauSize = sp.Ten + " " + s.TenSize + " " + m.MaMau,
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
                          ChiTietPhieuNhaps = (List<TenSanPhamBienTheChiTietPhieuNhap>)listDetail.Where(s => s.Id_PhieuNhapHang == id),
                      });
            return await _generatePdf.GetPdf("Views/PDFs/GetPhieuNhapDetail.cshtml", await kb.FirstOrDefaultAsync(s => s.Id == id));
        }
    }
}