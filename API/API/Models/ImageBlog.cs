using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class ImageBlog
    {
        public int Id { get; set; }
        //public string? ImageName { get; set; }
        public string? ImageName { get; set; }
        public int? FkBlogId { get; set; }
        [ForeignKey("FkBlogId")]
        public virtual Blog Blog { get; set; }
    }
}
