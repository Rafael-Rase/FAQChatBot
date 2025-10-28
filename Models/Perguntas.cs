using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace FAQChatBot.Models
{
    public class Pergunta
    {
        [Key]
        public int Id_Pergunta { get; set; }

        public int Id_Categoria { get; set; }

        [ForeignKey("Id_Categoria")]
        public virtual Categoria Categoria { get; set; }

        public string Texto_Pergunta { get; set; }
        public string resposta { get; set; }
        public DateTime Data_Criacao { get; set; }
    }
}