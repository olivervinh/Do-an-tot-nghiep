using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class TenSanPhamBienTheChiTietPhieuNhap
    {
        public int Id { get; set; }
        public string TenSanPhamBienTheMauSize { get; set; }
        public int SoluongNhap { get; set; }
        public decimal GiaNhap { get; set; }
        public decimal ThanhTienNhap { get; set; }
        public int Id_PhieuNhapHang { get; set; }
    }
}
