using System.ComponentModel.DataAnnotations;

namespace FAQChatBot.Models
{
    public class ChatBot
    {
        [Key]
        public int Id_ChatBot { get; set; }

        [Required]
        public string Texto_Pergunta { get; set; }

        [Required]
        public bool Permite_Digitar { get; set; }
    }
}