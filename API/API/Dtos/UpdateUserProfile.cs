using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class UpdateUserProfile
    {
        public string SDT { get; set; }
        public string DiaChi { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Quyen { get; set; }
        public string Password { get; set; }
    }
}
