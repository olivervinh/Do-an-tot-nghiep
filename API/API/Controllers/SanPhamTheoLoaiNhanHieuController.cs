using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860
namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SanPhamTheoLoaiNhanHieuController : ControllerBase
    {
        private readonly DPContext _context;
        public SanPhamTheoLoaiNhanHieuController(DPContext context)
        {
            _context = context;
        }
        // GET: api/<GetProductsOfCategoryController>
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetCategory(int id)
        { 
           return await _context.SanPhams.Where(s=>s.Id_Loai == id).ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<SanPham>>> GetBrand(int id)
        {
            return await _context.SanPhams.Where(s => s.Id_NhanHieu == id).ToListAsync();
        }
    }
}
