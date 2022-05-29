using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadChiTietPhieuNhapHang
    {
        public decimal GiaNhapSanPhamBienThe { get; set; }
        public string TenSanPhamBienThe { get; set; }
        public int SoLuongNhap { get; set; }
    }
}
