using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadCategory
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NamNu { get; set; }
    }
}
