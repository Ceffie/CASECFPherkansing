using System.ComponentModel.DataAnnotations;

namespace CASECFP_WebApi.Models
{
    public class CursusInstantie
    {
        public int Id { get; set; }

        [Required]
        public DateTimeOffset StartDatum { get; set; }
    }
}
