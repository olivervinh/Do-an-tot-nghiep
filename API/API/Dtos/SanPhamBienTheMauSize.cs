using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class SanPhamBienTheMauSize
    {
        public int Id { get; set; }
        public int? Id_SanPham { get; set; }
        public string TenMau { get; set; }
        public int? GioiTinh { get; set; }
        public int SoLuongTon { get; set; }
        public string TenSize { get; set; }
    }
}
