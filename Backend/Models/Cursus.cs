using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Cursus
    {
        public int Id { get; set; }
        
        [Required]
        [Range(1, 5)]
        public int Duur { get; set; }

        [Required]
        [StringLength(300, ErrorMessage = "The {0} value cannot exceed {1} characters. ")]
        public string Titel { get; set; }

        [Required]
        [StringLength(10, ErrorMessage = "The {0} value cannot exceed {1} characters. ")]
        public string Code { get; set; }

        public IEnumerable<CursusInstantie> CursusInstanties { get; set; }
    }
}
