using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadSanPhamBienThe
    {
        public int MauId { get; set; }
        public int SanPhamId { get; set; }
        public int SizeId { get; set; }
        public int SoLuongTon { get; set; }
    }
}
