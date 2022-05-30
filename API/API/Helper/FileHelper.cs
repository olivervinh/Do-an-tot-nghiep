using API.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
namespace API.Helper
{
    public static class FileHelper
    {
        private static string GetContentType(string path)
        {
            var provider = new FileExtensionContentTypeProvider();
            string contentType;
            if (!provider.TryGetContentType(path, out contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
        //input : id
        //output : path (folder name/id)
        public static async Task<string> UploadImageAndReturnPathAsync(int id, string type, IFormFile file)
        {
            //define directory path
            string dirPath = "wwwroot/images/" + type;
            bool exist = Directory.Exists(dirPath);
            if (!exist)
            {
                Directory.CreateDirectory(dirPath);
            }
            if (file.Length > 0 && file.Length < 5120)
            {
                //get file extension
                var fileExtension = "." + file.FileName.Split(".")[file.FileName.Split(".").Length - 1];
                var path = Path.Combine(Directory.GetCurrentDirectory(), dirPath, id.ToString() + fileExtension);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                };
                return path;
            }
            return null;
        }
        public static bool DeleteFileOnTypeAndNameAsync(string type , string name)
        {
            try
            {
                if (type == "product")
                {
                   File.Delete(Path.Combine("wwwroot/Images/list-image-product", name));
                    return true;
                }
                else
                {
                    File.Delete(Path.Combine("wwwroot/Images/list-image-blog", name));
                    return true;
                }
            }
            catch (Exception)
            {
                return false;
            }
        }
        public static async Task<string> UploadImageAndReturnFileNameAsync(UploadSanpham sanpham, UploadBlog blog,string type, IFormFile[] file,int i)
        {
            if (type == "product")
            {
                var path = Path.Combine(
                      Directory.GetCurrentDirectory(), "wwwroot/Images/list-image-product",
                     sanpham.Ten + i + "." + file[i].FileName.Split(".")[file[i].FileName.Split(".").Length - 1]);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file[i].CopyToAsync(stream);
                }
                return sanpham.Ten + i + "." + file[i].FileName.Split(".")
                            [file[i].FileName.Split(".").Length - 1];
            }
            else
            {
                var path = Path.Combine(
                     Directory.GetCurrentDirectory(), "wwwroot/Images/list-image-blog",
                    blog.TieuDe + i + "." + file[i].FileName.Split(".")[file[i].FileName.Split(".").Length - 1]);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    await file[i].CopyToAsync(stream);
                }
                return blog.TieuDe + i + "." + file[i].FileName.Split(".")
                            [file[i].FileName.Split(".").Length - 1];
            }
        }
    }
}
