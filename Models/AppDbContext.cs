using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using FAQChatBot.Models;


namespace FAQChatBot.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Aluno> Alunos { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Pergunta> Perguntas { get; set; }
        public DbSet<ChatBot> ChatBots { get; set; }
        public DbSet<OpcoesChatBot> OpcoesChatBots { get; set; }
        public DbSet<Conversa> Conversas { get; set; }
        public DbSet<Feedback> Feedbacks { get; set; }
    }
}