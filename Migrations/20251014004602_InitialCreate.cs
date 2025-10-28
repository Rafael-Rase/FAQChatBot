using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FAQChatBot.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    Id_Aluno = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Telefone = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    CPF = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: false),
                    Senha = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DataCadastro = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.Id_Aluno);
                });

            migrationBuilder.CreateTable(
                name: "Categorias",
                columns: table => new
                {
                    Id_Categoria = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorias", x => x.Id_Categoria);
                });

            migrationBuilder.CreateTable(
                name: "ChatBots",
                columns: table => new
                {
                    Id_ChatBot = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Texto_Pergunta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Permite_Digitar = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatBots", x => x.Id_ChatBot);
                });

            migrationBuilder.CreateTable(
                name: "Conversas",
                columns: table => new
                {
                    Id_Conversa = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Aluno = table.Column<int>(type: "int", nullable: false),
                    Resolvida = table.Column<bool>(type: "bit", nullable: false),
                    Data_Inicio = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Data_Fim = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Conversas", x => x.Id_Conversa);
                    table.ForeignKey(
                        name: "FK_Conversas_Alunos_Id_Aluno",
                        column: x => x.Id_Aluno,
                        principalTable: "Alunos",
                        principalColumn: "Id_Aluno",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Perguntas",
                columns: table => new
                {
                    Id_Pergunta = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Categoria = table.Column<int>(type: "int", nullable: false),
                    Texto_Pergunta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    resposta = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Data_Criacao = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Perguntas", x => x.Id_Pergunta);
                    table.ForeignKey(
                        name: "FK_Perguntas_Categorias_Id_Categoria",
                        column: x => x.Id_Categoria,
                        principalTable: "Categorias",
                        principalColumn: "Id_Categoria",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpcoesChatBots",
                columns: table => new
                {
                    Id_Opcao = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_ChatBot = table.Column<int>(type: "int", nullable: false),
                    Gera_Email = table.Column<bool>(type: "bit", nullable: false),
                    Texto_Opcao = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpcoesChatBots", x => x.Id_Opcao);
                    table.ForeignKey(
                        name: "FK_OpcoesChatBots_ChatBots_Id_ChatBot",
                        column: x => x.Id_ChatBot,
                        principalTable: "ChatBots",
                        principalColumn: "Id_ChatBot",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Feedbacks",
                columns: table => new
                {
                    Id_Feedback = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Id_Conversa = table.Column<int>(type: "int", nullable: false),
                    Comentario = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nota = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Feedbacks", x => x.Id_Feedback);
                    table.ForeignKey(
                        name: "FK_Feedbacks_Conversas_Id_Conversa",
                        column: x => x.Id_Conversa,
                        principalTable: "Conversas",
                        principalColumn: "Id_Conversa",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Conversas_Id_Aluno",
                table: "Conversas",
                column: "Id_Aluno");

            migrationBuilder.CreateIndex(
                name: "IX_Feedbacks_Id_Conversa",
                table: "Feedbacks",
                column: "Id_Conversa");

            migrationBuilder.CreateIndex(
                name: "IX_OpcoesChatBots_Id_ChatBot",
                table: "OpcoesChatBots",
                column: "Id_ChatBot");

            migrationBuilder.CreateIndex(
                name: "IX_Perguntas_Id_Categoria",
                table: "Perguntas",
                column: "Id_Categoria");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Feedbacks");

            migrationBuilder.DropTable(
                name: "OpcoesChatBots");

            migrationBuilder.DropTable(
                name: "Perguntas");

            migrationBuilder.DropTable(
                name: "Conversas");

            migrationBuilder.DropTable(
                name: "ChatBots");

            migrationBuilder.DropTable(
                name: "Categorias");

            migrationBuilder.DropTable(
                name: "Alunos");
        }
    }
}
