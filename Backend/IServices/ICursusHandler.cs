using Backend.Data;
using Backend.Models;

namespace Backend.Services
{
    public interface ICursusHandler
    {
        Task<string> ReorganizeAndAddCursussenAsync(CursusContext _context, List<Cursus>cursussen);
    }
}
