using API.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
namespace API.Data
{
    public class SeedData
    {
        public static async Task Seed(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DPContext>();
                context.Database.EnsureCreated();
                var count = await context.SanPhams.CountAsync();
                if(count < 1000000)
                {
                    for (var i = 0; i < 10000000; i++)
                    {
                        var product = new SanPham();
                        product.MoTa = @"Sản phẩm dễ dàng phối với quần ngắn quần dài, thích hợp mang trong mọi hoạt động.";
                        product.ThanhPhan = @"Chất liệu thun";
                        product.GiaNhap = 120000;
                        product.GiaBan = 160000;
                        product.GioiTinh = 1;
                        product.Id_Loai = 1;
                        product.Id_NhaCungCap = 1;
                        product.TrangThaiHoatDong = true;
                        product.TrangThaiSanPham = "new";
                        product.NgayTao = System.DateTime.Now;
                        product.HuongDan = "Bảo quản nơi khô thoáng";
                        product.KhuyenMai = 0;
                        product.Ten = "Áo sơ mi thun lạnh Broker";
                        product.Tag = "Fashion";
                        product.NgayCapNhat = System.DateTime.Now;
                        context.Add(product);
                        await context.SaveChangesAsync();
                        var image = new ImageSanPham();
                        image.IdSanPham = product.Id;
                        image.ImageName = "Áo sơ mi thun lạnh Broker 0.png";
                        context.Add(image);
                        await context.SaveChangesAsync();
                        var spbt1 = new SanPhamBienThe();
                        spbt1.Id_SanPham = product.Id;
                        spbt1.Id_Mau = 1;
                        spbt1.SizeId = 1;
                        spbt1.SoLuongTon = 100;
                        context.Add(spbt1);
                        await context.SaveChangesAsync();
                        var spbt2 = new SanPhamBienThe();
                        spbt2.Id_SanPham = product.Id;
                        spbt2.Id_Mau = 2;
                        spbt2.SizeId = 2;
                        spbt2.SoLuongTon = 100;
                        context.Add(spbt2);
                        await context.SaveChangesAsync();
                    }
                }
                else
                {
                    var result = "done";
                }
            }
        }
    }
}
