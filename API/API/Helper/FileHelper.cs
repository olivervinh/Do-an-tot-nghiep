using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.IO;
using System.Threading.Tasks;
namespace API.Helper
{
    public static  class FileHelper
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
        public static bool DeleteFileOnPathAsync(string path)
        {
            try
            {
                File.Delete(Path.Combine(path));
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
