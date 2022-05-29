using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UploadSPTK
    {
        public string idElement { get; set; }
        public string file { get; set; }
    }
}
