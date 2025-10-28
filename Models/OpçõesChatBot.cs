using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace FAQChatBot.Models
{
    public class OpcoesChatBot
    {
        [Key]
        public int Id_Opcao { get; set; }

        public int Id_ChatBot { get; set; }

        [ForeignKey("Id_ChatBot")]
        public virtual ChatBot ChatBot { get; set; }

        public bool Gera_Email { get; set; } //redirecionamento para atendente

        [Required]
        public string Texto_Opcao { get; set; }
    }
}