using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class GiaSanPhamMauSacSanPhamSize
    {
        public int Id { get; set; }
        public string MaMau { get; set; }
        public string TenSanPham { get; set; }
        public string TenSize { get; set; }
        public int Id_SanPham { get; set; }
        public int Id_Mau { get; set; }
        public int Id_Size { get; set; }
        public int SoLuongTon { get; set; }
    }
}
