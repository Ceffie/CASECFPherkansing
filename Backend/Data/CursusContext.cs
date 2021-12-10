using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class CursusContext : DbContext
    {
        public CursusContext(DbContextOptions<CursusContext> options)
            : base(options)
        {
        }

        public DbSet<Backend.Models.Cursus> Cursus { get; set; }
        public DbSet<Backend.Models.CursusInstantie> CursusInstantie { get; set; }
    }
}
