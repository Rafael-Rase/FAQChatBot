// Espera o carregamento completo do HTML antes de rodar o script
document.addEventListener('DOMContentLoaded', function () {

    // Pega o formulário de cadastro pelo ID
    const cadastroForm = document.getElementById('cadastroForm');

    // Adiciona um evento que acontece quando o formulário é enviado
    cadastroForm.addEventListener('submit', function (event) {
        

        event.preventDefault(); // Impede que o formulário seja enviado automaticamente (evita refresh da página)

        // Pega os valores de cada campo do formulário
        const nomeInput = document.getElementById('nome');
        const cpfInput = document.getElementById('cpf_cadastro');
        const emailInput = document.getElementById('email_cadastro');
        const telefoneInput = document.getElementById('telefone_cadastro');
        const senhaInput = document.getElementById('senha_cadastro');
        const confirmaSenhaInput = document.getElementById('confirma_senha');

        // Remove espaços no começo e no fim dos valores digitados
        const nome = nomeInput.value.trim();
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmaSenha = confirmaSenhaInput.value.trim();

        // VALIDAÇÕES:

        // Verifica se o nome tem pelo menos 3 caracteres
        if (nome.length <= 3) {
            alert('Por favor, insira seu Nome Completo.'); // Mostra mensagem de alerta
            nomeInput.focus(); // Coloca o cursor no campo
            return; // Para a execução do código
        }

        // Remove qualquer caractere que não seja número do CPF
        const cleanedCPF = cpf.replace(/[^\d]/g, '');

        // Verifica se o CPF tem exatamente 11 números
        if (cleanedCPF.length !== 11) {
            alert('Por favor, insira um CPF válido com 11 dígitos (sem contar a pontuação e barra).');
            cpfInput.focus();
            return;
        }

        // Cria um padrão para validar e-mails
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Testa se o e-mail digitado bate com o padrão
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um endereço de E-mail válido.');
            emailInput.focus();
            return;
        }

        // Remove caracteres que não são números do telefone
        const cleanedTelefone = telefone.replace(/[^\d]/g, '');

        // Verifica se o telefone tem entre 10 e 11 números (DDD + número)
        if (cleanedTelefone.length < 10 || cleanedTelefone.length > 11) {
            alert('Por favor, insira um Telefone válido com DDD (mínimo 10 dígitos, máximo 11 dígitos).');
            telefoneInput.focus();
            return;
        }

        // Verifica se a senha tem pelo menos 6 caracteres
        if (senha.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            senhaInput.focus();
            return;
        }

        // Verifica se a senha e a confirmação de senha são iguais
        if (senha !== confirmaSenha) {
            alert('As senhas digitadas não coincidem. Verifique a confirmação.');
            confirmaSenhaInput.focus();
            return;
        }

        // Se passou por todas as validações, mostra os dados no console (para desenvolvedores)
        console.log('Dados de cadastro prontos para envio:', {
            nome: nome,
            cpf: cleanedCPF,
            telefone: cleanedTelefone,
            email: email,
            senha: senha
        });

        // Mostra mensagem de sucesso para o usuário
        alert('Cadastro realizado com sucesso! Faça login para começar.');

        // Redireciona para a página de login
        window.location.href = 'index.html';

    });

});
