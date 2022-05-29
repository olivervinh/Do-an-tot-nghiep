using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class LichSuDangNhap
    {
        [Key]
        public int Id { get; set; }
        public string? IdUser { get; set; }
    }
}
