using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace API.Models
{
    public class Cart
    {
        public Cart()
        {
            SoLuong = 1;
        }
        [Key]
        public int CartID { get; set; }
        public decimal? Gia { get; set; }
        public string Mau { get; set; }
        public string Size { get; set; }
        public string UserID { get; set; }
        [ForeignKey("UserID")]
        public virtual AppUser User { get; set; }
        public int SanPhamId { get; set; }
        [ForeignKey("SanPhamId")]
        public virtual SanPham SanPham { get; set; }
        public int? Id_SanPhamBienThe { get; set; }
        [ForeignKey("Id_SanPhamBienThe")]
        public virtual SanPhamBienThe SanPhamBienThe { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = "Vui Lòng Nhập Số Lượng")]
        public int SoLuong { get; set; }
    }
}