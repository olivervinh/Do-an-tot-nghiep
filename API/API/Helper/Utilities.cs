using API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace API.Helper
{
    public static class Utilities
    {
        public static decimal SPjoinSPBTTraVeGia(int IdThamSo,DbSet<SanPham> SanPhams, DbSet<SanPhamBienThe> SanPhamBienThes)
        {
            SanPham kb = (SanPham)(from spbt in SanPhamBienThes
                                   join sp in SanPhams
                                   on spbt.Id_SanPham equals sp.Id
                                   select new SanPham()
                                   {
                                       Id = (int)spbt.Id,
                                       GiaBan = sp.GiaBan,
                                   }).First(s => s.Id == IdThamSo);
            return (decimal)kb.GiaBan;
        }
    }
}
