using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper.SignalR;
using API.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogsController : Controller
    {
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        private readonly DPContext _context;
        public BlogsController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this._context = context;
            this._hubContext = hubContext;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BlogAndImage>>> GetllBlogs()
        {
            var blogs = _context.Blogs.Select(b => new BlogAndImage()
            {
                Id = b.Id,
                TieuDe = b.TieuDe,
                NoiDung = b.NoiDung,
                image = _context.ImageBlogs.Where(s => s.FkBlogId == b.Id).Select(s => s.ImageName).FirstOrDefault(),
                nameUser = _context.AppUsers.Where(s => s.Id == b.FkAppUser_NguoiThem).Select(s => s.FirstName + " " + s.LastName).FirstOrDefault(),
            });
            return await blogs.ToListAsync();
        }
        [HttpPost("getBlog")]
        public async Task<ActionResult> GetBlog()
        {
            var resuft = await _context.Blogs.Select(d=>
            new { 
                id=d.Id,
                tieude=d.TieuDe,
                noidung =d.NoiDung,
                image = _context.ImageBlogs.Where(s=>s.FkBlogId==d.Id).Select(d=>d.ImageName).SingleOrDefault(),
            }).ToListAsync();
            return Json(resuft);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBlog(int id, [FromForm] UploadBlog upload)
        {
            var listImage = new List<ImageBlog>();
            Blog blog = new Blog();
            blog = await _context.Blogs.FindAsync(id);
            blog.TieuDe = upload.TieuDe;
            blog.NoiDung = upload.NoiDung;
            blog.FkAppUser_NguoiThem = upload.FkUserId;
            Notification notification = new Notification()
            {
                TenSanPham = upload.TieuDe,
                TranType = "Edit"
            };
            _context.Notifications.Add(notification);
            ImageBlog[] images = _context.ImageBlogs.Where(s => s.FkBlogId == id).ToArray();
            _context.ImageBlogs.RemoveRange(images);
            ImageBlog image = new ImageBlog();
            var file = upload.files.ToArray();
            var imageBlogs = _context.ImageBlogs.ToArray().Where(s => s.FkBlogId == id);
            foreach (var i in imageBlogs)
            {
                FileHelper.DeleteFileOnTypeAndNameAsync("blog", i.ImageName);
            }
            if (upload.files != null)
            {
                for (int i = 0; i < file.Length; i++)
                {
                    if (file[i].Length > 0 && file[i].Length < 5120)
                    {
                        listImage.Add(new ImageBlog()
                        {
                            ImageName =await FileHelper.UploadImageAndReturnFileNameAsync(null,upload,"blog", (IFormFile[])upload.files,i),
                            FkBlogId = blog.Id,
                        });
                    }
                }
            }
            else // xu li khi khong cap nhat hinh
            {
                List<ImageBlog> List;
                List = _context.ImageBlogs.Where(s => s.FkBlogId == id).ToList();
                foreach (ImageBlog img in List)
                    listImage.Add(new ImageBlog()
                    {
                        ImageName = img.ImageName,
                        FkBlogId = blog.Id,
                    }); ;
            };
            blog.ImageBlogs = listImage;
            _context.Blogs.Update(blog);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // POST: api/Blogs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Blog>> PostBlog([FromForm] UploadBlog upload)
        {
            Blog blog = new Blog();
            blog.TieuDe = upload.TieuDe;
            blog.NoiDung = upload.NoiDung;
            blog.FkAppUser_NguoiThem = upload.FkUserId;
            Notification notification = new Notification()
            {
                TenSanPham = upload.TieuDe,
                TranType = "Add"
            };
            _context.Notifications.Add(notification);
            var file = upload.files.ToArray();
            _context.Blogs.Add(blog);
            await _context.SaveChangesAsync();
            if (upload.files != null)
            {
                for (int i = 0; i < file.Length; i++)
                {
                    if (file[i].Length > 0 && file[i].Length < 5120)
                    {
                        ImageBlog imageBlog = new ImageBlog();
                        _context.ImageBlogs.Add(imageBlog);
                        await _context.SaveChangesAsync();
                        imageBlog.ImageName = await FileHelper.UploadImageAndReturnFileNameAsync(null, upload, "blog", (IFormFile[])upload.files, i);
                        imageBlog.FkBlogId = blog.Id;
                        _context.ImageBlogs.Update(imageBlog);
                        await _context.SaveChangesAsync();
                    }
                }
            }
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        // DELETE: api/Blogs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBlog(int id)
        {
            var imageBlogs = _context.ImageBlogs.ToArray().Where(s => s.FkBlogId == id);
            foreach (var i in imageBlogs)
            {
                FileHelper.DeleteFileOnTypeAndNameAsync("blog", i.ImageName);
            }
            _context.ImageBlogs.RemoveRange(imageBlogs);
            var blog = await _context.Blogs.FindAsync(id);
            _context.Blogs.Remove(blog);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
