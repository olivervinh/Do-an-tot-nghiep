using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class MauSacLoai
    {
        public int Id_Loai { get; set; }
        public string TenLoai { get; set; }
        public int Id { get; set; }
        public string MaMau { get; set; }
    }
}
