using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class ChiTietHoaDonSanPhamBienTheViewModel
    {
        public int IdCTHD { get; set; }
        public int SoLuong { get; set; }
        public string TenSanPham { get; set; }
        public string HinhAnh { get; set; }
        public decimal GiaBan { get; set; }
        public string DaLayTien { get; set; }//VD: chưa, rồi
        public int? TrangThai { get; set; } // VD : Đang lấy hàng, đã giao hàng
        public string TenMau { get; set; }
        public string TenSize { get; set; }
        public decimal ThanhTien { get; set; }
        public int Id_HoaDon { get; set; }
    }
}
