using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
namespace API.Dtos
{
    public class CartViewModel
    {
        public int CartID { get; set; }
        public string UserID { get; set; }
        public string Mau { get; set; }
        public int SoLuong { get; set; }
        public int? IdSanPhamBienThe { get; set; }
        public string Size { get; set; }
        public ProductDetail ProductDetail { get; set; }
    }
    public class CountComment
    {
        public SanPham sanpham { get; set; }
        public int socomment { get; set; }
    }
}
