using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class Review
    {
        public string tenUser { get; set; }
        public DateTime? NgayComment { get; set; }
        public string Content { get; set; }
    }
}
