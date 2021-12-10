using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class CursusInstantie
    {
        public int Id { get; set; }

        [Required]
        public DateTimeOffset StartDatum { get; set; }
    }
}
