using CASECFP_WebApi.Data;
using CASECFP_WebApi.Models;

namespace CASECFP_WebApi.Services
{
    public interface ICursusHandler
    {
        Task<string> ReorganizeAndAddCursussenAsync(CursusContext _context, List<Cursus>cursussen);
    }
}
