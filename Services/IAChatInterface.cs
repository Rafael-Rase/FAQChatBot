using System.Threading.Tasks;


namespace FAQChatBot.Services

{
    public interface IChatService
    {
        Task<string> ObterRespostaIAAsync(string perguntaUsuario);
    }
}


