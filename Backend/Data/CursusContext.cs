using Microsoft.EntityFrameworkCore;

namespace CASECFP_WebApi.Data
{
    public class CursusContext : DbContext
    {
        public CursusContext(DbContextOptions<CursusContext> options)
            : base(options)
        {
        }

        public DbSet<CASECFP_WebApi.Models.Cursus> Cursus { get; set; }
        public DbSet<CASECFP_WebApi.Models.CursusInstantie> CursusInstantie { get; set; }
    }
}
