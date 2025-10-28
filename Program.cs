using FAQChatBot.Models;
using Microsoft.EntityFrameworkCore;
using FAQChatBot.Services;

var builder = WebApplication.CreateBuilder(args);

// Registrar serviços
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ConexaoBD")));
builder.Services.AddHttpClient();
builder.Services.AddScoped<IChatService, GeminiChatService>();

// Criar a aplicação
var app = builder.Build();

// Garantir que o banco de dados seja criado (LocalDB)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Pipeline de middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthorization();

// Rota padrão
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}"); 

app.Run();
