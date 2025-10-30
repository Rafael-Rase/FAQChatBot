using BCrypt.Net;
using FAQChatBot.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

public class HomeController : Controller
{

    private readonly AppDbContext _context;

    public HomeController(AppDbContext context)
    {
        _context = context;
    }



    public IActionResult Index()
    {
        return View();
    }

    public IActionResult RecuperarSenha()
    {
        return View();
    }


    public IActionResult Dashboard()
    {

        return View();

    }

    public IActionResult Faq()
    {

        return View();
    }

    public async Task<IActionResult> Cadastro(Aluno novoAluno)
    {

        if (ModelState.IsValid)
        {

            if (string.IsNullOrEmpty(novoAluno.Senha))
            {
                ModelState.AddModelError("Senha", "A senha é obrigatória.");
                return View(novoAluno);
            }

            novoAluno.Senha = BCrypt.Net.BCrypt.HashPassword(novoAluno.Senha);


            novoAluno.DataCadastro = DateTime.Now;

            _context.Alunos.Add(novoAluno);


            await _context.SaveChangesAsync();


            return RedirectToAction("Index");
        }


        return View(novoAluno);
    }

    [HttpPost]
    public async Task<IActionResult> Login(string email, string senha)
    {

        if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(senha))
        {
            ViewData["Erro"] = "E-mail e senha são obrigatórios.";
            return View("Index");
        }


        var alunoDoBanco = await _context.Alunos
                                .FirstOrDefaultAsync(a => a.Email == email);


        if (alunoDoBanco == null)
        {
            ViewData["Erro"] = "Usuário ou senha inválidos.";
            return View("Index");
        }


        bool senhaEstaCorreta = BCrypt.Net.BCrypt.Verify(senha, alunoDoBanco.Senha);

        if (senhaEstaCorreta)
        {

            //return RedirectToAction("Dashboard");
            return RedirectToAction("Dashboard", "Home");
        }
        else
        {

            ViewData["Erro"] = "Usuário ou senha inválidos.";
            return View("Index");
        }
    }
}