using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace API.Dtos
{
    public class ThangRevenue
    {
        public string Month { get; set; }
        public decimal Revenues { get; set; }
        public List<NgayRevenue> ListNgayRevenues { get; set; }
    }
}
