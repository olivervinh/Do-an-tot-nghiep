using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class TimKiemNangCao
    {
        public string TenSanPham { get; set; }
        public string Mau { get; set; }
        public string Size { get; set; }
        public decimal GiaDau { get; set; }
        public decimal GiaCuoi { get; set; }
        public int SoLuongTonDau { get; set; }
        public int SoLuongTonCuoi { get; set; }
        public DateTime NgayThemDau { get; set; }
        public DateTime NgayThemCuoi { get; set; }
    }
}
