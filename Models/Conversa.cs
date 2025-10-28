using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace FAQChatBot.Models 
{ 
    public class Conversa
    {
        [Key]
        public int Id_Conversa { get; set; }

        public int Id_Aluno { get; set; }

        [ForeignKey("Id_Aluno")]
        public virtual Aluno Aluno { get; set; }

        [Required]
        public bool Resolvida { get; set; }

        public DateTime Data_Inicio { get; set; }
        public DateTime Data_Fim { get; set; }
    }
}