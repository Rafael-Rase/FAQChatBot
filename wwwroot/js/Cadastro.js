document.addEventListener('DOMContentLoaded', function () {

    const cadastroForm = document.getElementById('cadastroForm');

    cadastroForm.addEventListener('submit', function (event) {
        event.preventDefault();


        const nomeInput = document.getElementById('nome');
        const cpfInput = document.getElementById('cpf');
        const emailInput = document.getElementById('email_cadastro');
        const telefoneInput = document.getElementById('telefone');
        const senhaInput = document.getElementById('senha_cadastro');
        const confirmaSenhaInput = document.getElementById('confirma_senha');


        const nome = nomeInput.value.trim();
        const cpf = cpfInput.value.trim();
        const email = emailInput.value.trim();
        const telefone = telefoneInput.value.trim();
        const senha = senhaInput.value.trim();
        const confirmaSenha = confirmaSenhaInput.value.trim();


        if (nome.length < 3) {
            alert('Por favor, insira seu Nome Completo.');
            nomeInput.focus();
            return;
        }


        const cleanedCPF = cpf.replace(/[^\d]/g, '');

        if (cleanedCPF.length !== 11) {
            alert('Por favor, insira um CPF válido com 11 dígitos (sem contar a 
pontuação).'); 
            cpfInput.focus();
            return;
        }




        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Por favor, insira um endereço de E-mail válido.');
            emailInput.focus();
            return;
        }


        const cleanedTelefone = telefone.replace(/[^\d]/g, '');


        if (cleanedTelefone.length < 10 || cleanedTelefone.length > 11) {
            alert('Por favor, insira um Telefone válido com DDD (mínimo 10 dígitos, 
máximo 11 dígitos).'); 
            telefoneInput.focus();
            return;
        }


        if (senha.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            senhaInput.focus();
            return;
        }


        if (senha !== confirmaSenha) {
            alert('As senhas digitadas não coincidem. Verifique a confirmação.');
            confirmaSenhaInput.focus();
            return;
        }



        console.log('Dados de cadastro prontos para envio:', {
            nome: nome, cpf:
                cleanedCPF, telefone: cleanedTelefone, email: email, senha: senha
        });
        alert('Cadastro realizado com sucesso! Faça login para começar.');


        window.location.href = 'index.html';

    });

});