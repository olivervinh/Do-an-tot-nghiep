using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class ChatUserName
    {
        public string Name { get; set; }
        public string ContentChat { get; set; }
        public DateTime TimeChat { get; set; }
        public string IdUser { get; set; }
    }
}
