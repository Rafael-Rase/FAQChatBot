using System.ComponentModel.DataAnnotations;


namespace FAQChatBot.Models
{
    public class Categoria
    {
        [Key]
        public int Id_Categoria { get; set; }

        [Required]
        public string Nome { get; set; }
    }
}