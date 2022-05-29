using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using API.Helper;
using API.Helper.SignalR;
namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaGiamGiasController : ControllerBase
    {
        private readonly DPContext _context;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly IHubContext<BroadcastHub, IHubClient> _hubContext;
        public MaGiamGiasController(DPContext context, IHubContext<BroadcastHub, IHubClient> hubContext)
        {
            this._hubContext = hubContext;
            this._context = context;
            this._serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaGiamGia>>> GetMaGiamGias()
        {
            return await _context.MaGiamGias.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult> TaoMaGiamGia([FromForm] UploadMaGiamGia uploadMaGiamGia )
        {
            MaGiamGia maGiamGia = new MaGiamGia();
            maGiamGia.Code= StringHelper.RandomString(5);
            maGiamGia.SoTienGiam= uploadMaGiamGia.SoTienGiam;
            _context.Add(maGiamGia);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> SuaMaGiamGia([FromForm] UploadMaGiamGia uploadMaGiamGia,int id)
        {
            MaGiamGia maGiamGia;
            maGiamGia = await _context.MaGiamGias.FindAsync(id);
            maGiamGia.Code = StringHelper.RandomString(5);
            maGiamGia.SoTienGiam = uploadMaGiamGia.SoTienGiam;
            _context.Update(maGiamGia);
            await _context.SaveChangesAsync();
            await _hubContext.Clients.All.BroadcastMessage();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMaGiamGias(int id)
        {
            MaGiamGia mgg;
            mgg = await _context.MaGiamGias.FindAsync(id);
            _context.MaGiamGias.Remove(mgg);
            await _hubContext.Clients.All.BroadcastMessage();
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
