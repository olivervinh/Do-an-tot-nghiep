using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class SanPhamBienTheMauSizeLoai
    {
        public int Id { get; set; }
        public string SanPham { get; set; }
        public string MauLoai { get; set; }
        public int SoLuongTon { get; set; }
        public string SizeLoai { get; set; }
        public string TenSanPhamBienTheMauSize { get; set; }
        public decimal GiaNhap { get; set; }
        public decimal ThanhTien { get; set; }
    }
}
