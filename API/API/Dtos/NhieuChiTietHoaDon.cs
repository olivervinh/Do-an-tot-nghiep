using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class NhieuChiTietHoaDon
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public string Size { get; set; }
        public string MauSac { get; set; }
        public string Hinh { get; set; }
        public int SoLuong { get; set; }
        public decimal GiaBan { get; set; }
        public decimal ThanhTien { get; set; }
    }
}
