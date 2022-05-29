using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class PhieuNhapHang
    {
        public int Id { get; set; }
        public string SoChungTu { get; set; }
        public  DateTime NgayTao { get; set; }
        public decimal TongTien { get; set; }
        public string GhiChu { get; set; }
        public string NguoiLapPhieu { get; set; }
        [ForeignKey("NguoiLapPhieu")]
        public virtual AppUser AppUser { get; set; }
        public int Id_NhaCungCap { get; set; }
        [ForeignKey("Id_NhaCungCap")]
        public virtual NhaCungCap NhaCungCap { get; set; }
        public virtual ICollection<ChiTietPhieuNhapHang> ChiTietPhieuNhaps { get; set; }
    }
}
