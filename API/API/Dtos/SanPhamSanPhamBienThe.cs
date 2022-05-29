using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class SanPhamSanPhamBienThe
    {
        public int IdSP { get; set; }
        public string Name { get; set; }
        public int? GioiTinh { get; set; }
        public decimal Gia { get; set; }
        public string Hinh { get; set; }
        public string TrangThaiChoPhep { get; set; }
    }
}
