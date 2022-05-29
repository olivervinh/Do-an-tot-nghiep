using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadSanpham
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public decimal? KhuyenMai { get; set; }
        public string MoTa { get; set; }
        public string Tag { get; set; }
        public int? GioiTinh { get; set; }
        public string TrangThaiSanPham { get; set; }
        public bool? TrangThaiHoatDong { get; set; }
        public decimal? GiaBan { get; set; }
        public decimal? GiaNhap { get; set; }
        public string HuongDan { get; set; }
        public string ThanhPhan { get; set; }
        public int? Id_NhanHieu { get; set; }
        public int? Id_NhaCungCap { get; set; }
        public int? Id_Loai { get; set; }
        public ICollection<IFormFile> files { get; set; }
    }
}
