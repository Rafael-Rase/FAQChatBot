using FAQChatBot.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace FAQChatBot.Services
{
    public class GeminiChatService : IChatService
    {
        private readonly AppDbContext _context;
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;
        private const string GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";

        public GeminiChatService(AppDbContext context, IConfiguration configuration, HttpClient httpClient)
        {
            _context = context;
            _httpClient = httpClient;
            
           
            _apiKey = configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("A chave de API do Gemini não foi configurada em appsettings.json.");
        }

        public async Task<string> ObterRespostaIAAsync(string perguntaUsuario)
        {
            
            var faqContexto = await _context.Perguntas
                .Where(p => p.Texto_Pergunta.Contains(perguntaUsuario) || p.resposta.Contains(perguntaUsuario))
                .Take(5)
                .ToListAsync();

            var contextoFormatado = string.Join("\n---\n", faqContexto.Select(f => $"Pergunta: {f.Texto_Pergunta}\nResposta: {f.resposta}"));

            
            var systemInstruction = $@"Você é um chatbot de suporte técnico amigável. Use o 'CONTEXTO' fornecido abaixo para responder às perguntas do usuário. Se o contexto não contiver a resposta, diga 'Não encontrei a informação no FAQ, por favor, tente reformular sua pergunta ou entre em contato com o suporte.' CONTEXTO: {contextoFormatado}";

            
            var requestPayload = new 
            {
                contents = new[]
                {
                    new 
                    {
                        role = "user",
                        parts = new[]
                        {
                            new { text = systemInstruction },
                            new { text = perguntaUsuario }
                        }
                    }
                }
            };
            
           
            var jsonContent = new StringContent(
                JsonSerializer.Serialize(requestPayload),
                Encoding.UTF8,
                "application/json"
            );

            
            var response = await _httpClient.PostAsync($"{GEMINI_API_URL}{_apiKey}", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Content.ReadAsStringAsync();
               
                return $"Desculpe, a chamada à API falhou com status {response.StatusCode}. Detalhe: {errorBody}";
            }

           
            var jsonResponse = await response.Content.ReadAsStringAsync();
            
            
            using (JsonDocument doc = JsonDocument.Parse(jsonResponse))
            {
                var root = doc.RootElement;
                if (root.TryGetProperty("candidates", out JsonElement candidates) && candidates.GetArrayLength() > 0)
                {
                    if (candidates[0].TryGetProperty("content", out JsonElement content) && content.TryGetProperty("parts", out JsonElement parts) && parts.GetArrayLength() > 0)
                    {
                        if (parts[0].TryGetProperty("text", out JsonElement text))
                        {
                            return text.GetString() ?? "Resposta gerada, mas texto vazio.";
                        }
                    }
                }
            }

            return "A IA não conseguiu gerar uma resposta válida. Tente novamente.";
        }
    }
}