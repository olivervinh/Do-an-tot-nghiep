using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class SanPhamLoai
    {
        public int SoLuongSanPham { get; set; }
        public string ImagePath { get; set; }
        public int Id { get; set; }
        public string Ten { get; set; }
        public decimal? KhuyenMai { get; set; }
        public string MoTa { get; set; }
        public decimal Gia { get; set; }
        public string Tag { get; set; }
        public string HuongDan { get; set; }
        public string ThanhPhan { get; set; }
        public int? GioiTinh { get; set; }
        public string TrangThaiSanPham { get; set; }
        public string TrangThaiSanPhamThietKe { get; set; }
        public bool? TrangThaiHoatDong { get; set; }
        public int? Id_NhanHieu { get; set; }
        public int? Id_Loai { get; set; }
        public int? GiaSanPhams { get; set; }
        public int? SanPhamThietKes { get; set; }
        public int? SanPham_SanPhamThietKes { get; set; }
        public string TenLoai { get; set; }
    }
}
