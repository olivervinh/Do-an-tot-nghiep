using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class NhaCungCap
    {
        public int Id { get; set; }
        public string Ten { get; set; }
        public string SDT { get; set; }
        public string ThongTin { get; set; }
        public string DiaChi { get; set; }
        public virtual ICollection<PhieuNhapHang> PhieuNhapHangs { get; set; }
        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}
