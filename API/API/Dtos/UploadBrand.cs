using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadBrand
    {
        public int Id { get; set; }
        public string ThongTin { get; set; }
        public string Name { get; set; }
        public IFormFile TileImage { get; set; }
    }
}
