using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CASECFP_WebApi.Data;
using CASECFP_WebApi.Models;
using CASECFP_WebApi.Services;
using System.Text.Json;

namespace CASECFP_WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CursusController : ControllerBase
    {
        private readonly CursusContext _context;
        private ICursusHandler cursusHandler;

        public CursusController(CursusContext context, ICursusHandler cursusHandler)
        {
            _context = context;
            this.cursusHandler = cursusHandler;
        }

        // GET: api/Cursus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cursus>>> GetCursus()
        {
            return await _context.Cursus.Include(c => c.CursusInstanties).ToListAsync();
        }

        // POST: api/Cursus
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<string>> PostCursus(List<Cursus> cursussen)
        {
            var res = await cursusHandler.ReorganizeAndAddCursussenAsync(_context, cursussen);

            return Ok(JsonSerializer.Serialize(res));
        }
    }
}
