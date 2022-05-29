using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
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
    public class ThongKeBieuDosController : ControllerBase //thong ke theo List<Object>
    {
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        private readonly DPContext _context;
        private readonly IDataConnector _connector;
        public ThongKeBieuDosController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext, IDataConnector connector)
        {
            this._context = context;
            this._hubContext = hubContext;
            this._connector = connector;
        }
        /// <summary>
        /// Biểu đồ liên quan đến vấn đề bán hàng của shop
        /// </summary>
        /// <returns></returns>
        [HttpGet("topthongkethang")]
        public async Task<ActionResult<IEnumerable<ThangRevenue>>> GetDoanhSoThangasync()
        {
            var sells = await _context.HoaDons.Where(s => s.TrangThai == 2)
                .GroupBy(a => a.NgayTao.Date.Month)
                .Select(a => new ThangRevenue { Revenues = a.Sum(b => b.TongTien), Month = a.Key.ToString()  })
                .OrderBy(a => a.Revenues)
                .ToListAsync();
            return sells;
        }
        [HttpPost("topthongkengaytheothang")]
        public async Task<ActionResult<IEnumerable<NgayRevenue>>> GetDoanhSoNgayTheoThangasync([FromForm]string month)
        {
            var sells = await _context.HoaDons.Where(s=>s.TrangThai==2)
                  .GroupBy(a => a.NgayTao.Date)
                  .Select(a => new NgayRevenue { Revenues = a.Sum(b => b.TongTien), Ngay = a.Key.Date })
                  .OrderBy(a => a.Revenues)
                  .Where(s=>s.Ngay.Month == int.Parse(month))
                  .ToListAsync();
            return sells;
        }
        //Thống kê số sản phẩm số lần xuất hiện trong đơn hàng (bán chạy)
        [HttpGet("topsolanxuathientrongdonhang")]
        public async Task<ActionResult<IEnumerable<TenSPSoLanXuatHienTrongDonHang>>> GetSoLanXuatHienTrongDonHang()
        {
            return await _connector.GetSoLanXuatHienTrongDonHang();
        }
        //Sản phẩm bán đạt lợi nhuận cao nhất trong top 10
        [HttpGet("topsanphamloinhattop")]
        public async Task<ActionResult<IEnumerable<TenSanPhamDoanhSo>>> Top10SanPhamLoiNhats()
        {
           return await _connector.Top10SanPhamLoiNhats();
        }
        //Tong so luong ban ra trong nam
        [HttpGet("topnhanhieubanchaynhattrongnam2021")]
        public async Task<ActionResult<IEnumerable<NhanHieuBanChayNhatTrongNam2021>>> GetNhanHieuBanChayNhatTrongNam2021()
        {
            return await _connector.GetNhanHieuBanChayNhatTrongNam2021();
        }
        //$sidebar-nav-link-active-bg; //131
        //Bien the dat doanh thu cao nhat
        [HttpGet("topdatasetbanratonkho")]
        public async Task<ActionResult<IEnumerable<DataSetBanRaTonKho>>> DataDataSetBanRaTonKho()
        {
            return await _connector.DataDataSetBanRaTonKho();
        }
        /// <summary>
        /// Biểu đồ liên quan tới vấn đề nhập hàng
        /// </summary>
        /// <returns></returns>
        [HttpGet("nhacungcaptongtien")]
        public async Task<ActionResult<IEnumerable<NhaCungCapTongTien>>> GetDoanhSoBans()
        {
            return await _connector.GetDoanhSoBans();
        }
        [HttpGet("nhacungcapsoluong")]
        public async Task<ActionResult<IEnumerable<NhaCungCapSoLuong>>> GetNhaCungCapSoLuongs()
        {
            return await _connector.GetNhaCungCapSoLuongs();
        }
    }
}
