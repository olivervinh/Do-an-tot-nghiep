using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Models
{
    public class AppUser : IdentityUser
    {
        public string DiaChi { get;set; }
        public string SDT { get; set; }
        public string ImagePath { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Quyen { get; set; }
        public virtual ICollection<UserLike> UserLikes { get; set; }
        public virtual ICollection<UserComment> UserComments { get; set; }
        public virtual ICollection<PhieuNhapHang> PhieuNhapHangs { get; set; }
        public virtual ICollection<UserChat> UserChats { get; set; }
        public virtual ICollection<Calendar> Calendars { get; set; }
    }
}
