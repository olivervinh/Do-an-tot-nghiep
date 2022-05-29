using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class SanPhamBienThe
    {
        [Key]
        public int Id { get; set; }
        public int? Id_SanPham { get; set; }
        [ForeignKey("Id_SanPham")]
        public virtual SanPham SanPham { get; set; }
        public int? Id_Mau { get; set; }
        [ForeignKey("Id_Mau")]
        public virtual MauSac MauSac { get; set; }
        public int SoLuongTon { get; set; }
        public virtual ICollection<ChiTietHoaDon> ChiTietHoaDon { get; set; }
        public int? SizeId { get; set; }
        [ForeignKey("SizeId")]
        public virtual Size Size { get; set; }
    }
}
