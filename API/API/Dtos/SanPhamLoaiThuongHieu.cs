using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class SanPhamLoaiThuongHieu
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public decimal? KhuyenMai { get; set; }
        public string MoTa { get; set; }
        public string Tag { get; set; }
        public string Image { get; set; }
        public int? GioiTinh { get; set; }
        public string TenLoai { get; set; }
        public string TenNhanHieu { get; set; }
        public int? SoLuongLike { get; set; }
        public int? SoLuongComment { get; set; }
        public bool IsLike { get; set; }
        public string IdUserLogged { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? GiaNhap { get; set; }
        public string TenNhaCungCap { get; set; }
        public string TrangThaiSanPham { get; set; }
        public string TrangThaiSanPhamThietKe { get; set; }
        public bool? TrangThaiHoatDong { get; set; }
        public string HuongDan { get; set; }
        public string ThanhPhan { get; set; }
        public int? UpdateBy { get; set; }
        public int? Id_NhanHieu { get; set; }
        public int? Id_Loai { get; set; }
        public int? Id_NhaCungCap { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? GiaSanPhams { get; set; }
        public int? SanPhamThietKes { get; set; }
        public int? SanPham_SanPhamThietKes { get; set; }
    }
}
