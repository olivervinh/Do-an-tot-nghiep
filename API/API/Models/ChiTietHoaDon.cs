using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class ChiTietHoaDon
    {
        [Key]
        public int Id { get; set; }
        public int Soluong { get; set; }     
        public decimal? ThanhTien { get; set; }
        public decimal? GiaBan { get; set; }
        public string Mau { get; set; }
        public string Size { get; set; }
        public int? Id_HoaDon { get; set; }
        [ForeignKey("Id_HoaDon")]
        public int? Id_SanPham { get; set; }
        [ForeignKey("Id_SanPham")]
        public virtual SanPham SanPham { get; set; }
        public virtual HoaDon HoaDon { get; set; }
        public int? Id_SanPhamBienThe { get; set; }
        [ForeignKey("Id_SanPhamBienThe")]
        public virtual SanPhamBienThe SanPhamBienThe { get; set; }
    }
}
