using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using API.Dtos;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartsController : Controller
    {
        private readonly DPContext _context;
        public CartsController(DPContext context)
        {
            _context = context;
        }
        // GET: api/Carts
        [HttpPost("getCart/{id}")]
        public async Task<ActionResult<IEnumerable<CartViewModel>>> GetCarts(string id)
        {
            var getiduser = id;
            var resuft =await _context.Carts.Where(s => s.UserID == getiduser)
                .Select(d => new CartViewModel
                {
                    IdSanPhamBienThe = d.Id_SanPhamBienThe,
                    CartID = d.CartID,
                    Mau = d.Mau,
                    Size = d.Size,
                    SoLuong = d.SoLuong,
                    ProductDetail = _context.SanPhams.Where(i => i.Id == d.SanPhamId).Select(
                        i => new ProductDetail
                        {
                            Image = _context.ImageSanPhams.Where(q => q.IdSanPham == d.SanPhamId).Select(q => q.ImageName).FirstOrDefault(),
                            Id = i.Id,
                            Ten = i.Ten,
                            GiaBan = i.GiaBan,
                            KhuyenMai = i.KhuyenMai
                        }).FirstOrDefault(),
                }).ToListAsync();
            return resuft;
        }
        [HttpPost("coutcomment")]
        public async Task<ActionResult> CoutComment()
        {
            var list_id_san_pham = await _context.SanPhams.Select(d => d.Id).ToListAsync();
            var resuft = new List<CountComment>();
            for (int i = 0; i < list_id_san_pham.Count(); i++)
            {
                resuft.Add(new CountComment
                {
                    sanpham = _context.SanPhams.Where(d => d.Id == list_id_san_pham[i]).FirstOrDefault(),
                    socomment = _context.UserComments.Where(d => d.IdSanPham == list_id_san_pham[i]).Count(),
                });
            }
            return Json(resuft);
        }
        [HttpGet("getcouttotalqty")]
        public async Task<TotalCart> GetTotalQty()
        {
            var variableQtys = await _context.Carts.Select(s => s.SoLuong).ToListAsync();
            var totalQty = 0;
            foreach(var item in variableQtys)
            {
                totalQty += item;
            }
            return new TotalCart(totalQty);
        }
        public class TotalCart
        {
            public TotalCart(int totalQty)
            {
                this.totalQty = totalQty;
            }
            public int totalQty { get; set; }
        }
        [HttpPost("update")]
        public async Task<ActionResult> UpdateCarts(Cart json)
        {
            var resuft = await _context.Carts.Where(s => s.CartID == json.CartID).FirstOrDefaultAsync();
            if (json.SoLuong < 1)
            {
                _context.Carts.Remove(resuft);
            }
            else
            {
                resuft.SoLuong = json.SoLuong;
            }
            _context.SaveChanges();
            var resuft1 = _context.Carts.Where(s => s.UserID == json.UserID)
                .Select(d => new CartViewModel
                {
                    CartID = d.CartID,
                    Mau = d.Mau,
                    Size = d.Size,
                    SoLuong = d.SoLuong,
                    ProductDetail = _context.SanPhams.Where(i => i.Id == d.SanPhamId).Select(
                        i => new ProductDetail
                        {
                            Image = _context.ImageSanPhams.Where(q => q.IdSanPham == d.SanPhamId).Select(q => q.ImageName).FirstOrDefault(),
                            Id = i.Id,
                            Ten = i.Ten,
                            GiaBan = i.GiaBan,
                            KhuyenMai = i.KhuyenMai
                        }).FirstOrDefault(),
                }).ToList();
            return Json(resuft1);
        }
        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Cart>> GetCart(int id)
        {
            var cart = await _context.Carts.FindAsync(id);
            if (cart == null)
            {
                return NotFound();
            }
            return cart;
        }
        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCart(int id, Models.Cart cart)
        {
            if (id != cart.CartID)
            {
                return BadRequest();
            }
            _context.Entry(cart).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CartExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
        [HttpPost("delete")]     
        public async Task<IActionResult> Delete([FromBody]DeleteCart delete)
        {
            var card = _context.Carts.Where(d => d.Id_SanPhamBienThe == delete.Id_sanpham && d.UserID == delete.User_ID).SingleOrDefault();
            _context.Carts.Remove(card);
            await _context.SaveChangesAsync();
            return Json("1");
        }
        public class DeleteCart
        {
            public int Id_sanpham { get; set; }
            public string User_ID { get; set; }
        }
        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Models.Cart>> PostCart(Models.Cart cart)
        {
            var shoppingCartItem =
                    _context.Carts.SingleOrDefault(
                        s => s.SanPhamId == cart.SanPhamId && s.UserID == cart.UserID && s.Mau == cart.Mau && s.Size == cart.Size);
            if (shoppingCartItem == null)
            {
                Models.Cart newCart = new Models.Cart();
                newCart.UserID = cart.UserID;
                newCart.SanPhamId = cart.SanPhamId;
                newCart.Id_SanPhamBienThe = cart.Id_SanPhamBienThe;
                newCart.Size = cart.Size;
                newCart.Mau = cart.Mau;
                newCart.Gia = _context.SanPhams.Where(d => d.Id == cart.SanPhamId).Select(d => d.GiaBan).FirstOrDefault();
                newCart.SoLuong = cart.SoLuong;
                _context.Carts.Add(newCart);
                await _context.SaveChangesAsync();
            }
            else
            {
                shoppingCartItem.SoLuong = shoppingCartItem.SoLuong + cart.SoLuong;
            }
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetCart", new { id = cart.CartID }, cart);
        }
        public class UpdateCart
        {
            public int Id_sanpham { get; set; }
            public int id_sanphambienthe { get; set; }
            public int soLuong { get; set; }
        }
        private bool CartExists(int id)
        {
            return _context.Carts.Any(e => e.CartID == id);
        }
    }
}