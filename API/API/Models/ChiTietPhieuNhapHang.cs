using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class ChiTietPhieuNhapHang
    {
        [Key]
        public int Id { get; set; }
        public int SoluongNhap { get; set; }
        public decimal ThanhTienNhap { get; set; }
        public int? Id_PhieuNhapHang { get; set; }
        [ForeignKey("Id_PhieuNhapHang")]
        public virtual PhieuNhapHang PhieuNhapHang { get; set; }
        public int? Id_SanPhamBienThe { get; set; }
        [ForeignKey("Id_SanPhamBienThe")]
        public virtual SanPhamBienThe SanPhamBienThe { get; set; }
    }
}
