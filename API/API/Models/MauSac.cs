using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class MauSac
    {
        [Key]
        public int Id { get; set; }
        public string MaMau { get; set; }
        public int? Id_Loai { get; set; }
        [ForeignKey("Id_Loai")]
        public virtual Loai Loai { get; set; }
        public virtual ICollection<SanPhamBienThe> SanPhamBienThes { get; set; }
    }
}
