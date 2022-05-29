using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class PhieuNhapHangNhaCungCap
    {
        public int Id { get; set; }
        public string SoChungTu { get; set; }
        public DateTime NgayTao { get; set; }
        public decimal TongTien { get; set; }
        public string GhiChu { get; set; }
        public string NguoiLapPhieu { get; set; }
        public string TenNhaCungCap { get; set; }
    }
}
