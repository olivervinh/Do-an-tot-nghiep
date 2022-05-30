using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Data
{
    public class DPContext : IdentityDbContext
    {
        public DPContext(DbContextOptions<DPContext> options) : base(options) { }
        public DbSet<NotificationCheckout> NotificationCheckouts { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<ChiTietHoaDon> ChiTietHoaDons { get; set; }
        public DbSet<HoaDon> HoaDons { get; set; }
        public DbSet<NhanHieu> NhanHieus { get; set; }
        public DbSet<Loai> Loais { get; set; }
        public DbSet<SanPhamBienThe> SanPhamBienThes { get; set; }
        public DbSet<MauSac> MauSacs { get; set; }
        public DbSet<SanPham> SanPhams { get; set; }
        public DbSet<UserChat> UserChats { get; set; }
        public DbSet<Size> Sizes { get; set; }
        public DbSet<ImageSanPham> ImageSanPhams { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<MaGiamGia> MaGiamGias { get; set; }
        public DbSet<UserLike> UserLikes { get; set; }
        public DbSet<UserComment> UserComments { get; set; }
        public DbSet<NhaCungCap> NhaCungCaps { get; set; }
        public DbSet<PhieuNhapHang> PhieuNhapHangs { get; set; }
        public DbSet<ChiTietPhieuNhapHang> ChiTietPhieuNhapHangs { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<AuthHistory> AuthHistories { get; set; }
        public DbSet<JobSeeker> JobSeekers { get; set; }
        public DbSet<Blog> Blogs { get; set; }
        public DbSet<ImageBlog> ImageBlogs { get; set; }
    }
}
