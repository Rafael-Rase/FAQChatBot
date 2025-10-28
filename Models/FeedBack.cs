using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using FAQChatBot.Models;

namespace FAQChatBot.Models
{
    public class Feedback
    {
        [Key]
        public int Id_Feedback { get; set; }

        public int Id_Conversa { get; set; }

        [ForeignKey("Id_Conversa")]
        public virtual Conversa Conversa { get; set; }

        public string Comentario { get; set; }
        public int Nota { get; set; }
    }
}