// Aguarda o carregamento completo do documento HTML 
document.addEventListener('DOMContentLoaded', function () {

    // 1. Seleciona o formulário de login 
    const loginForm = document.querySelector('.login-box form');

    // 2. Adiciona um "ouvinte de evento" (event listener) para o envio do 
    formulário
    loginForm.addEventListener('submit', function (event) {

        // Impede o envio padrão do formulário (para que o JavaScript possa 
        validá - lo primeiro)
    event.preventDefault();

    // 3. Seleciona os campos de input 
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('senha');

    // 4. Obtém os valores dos campos (removendo espaços em branco no 
    início / fim)
const email = emailInput.value.trim();
const senha = passwordInput.value.trim();

// 5. Lógica de Validação 

// Verifica se o campo e-mail está vazio 
if (email === '') {
    alert('Por favor, preencha o campo E-mail.');
    emailInput.focus(); // Coloca o foco no campo 
    return; // Interrompe a função 
}

// Verifica se o campo senha está vazio 
if (senha === '') {
    alert('Por favor, preencha o campo Senha.');
    passwordInput.focus(); // Coloca o foco no campo 
    return; // Interrompe a função 
}

// Validação adicional de formato de e-mail (regex simples) 
// Isso verifica se o e-mail tem o padrão 'texto@texto.dominio' 
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
    alert('Por favor, insira um endereço de E-mail válido.');
    emailInput.focus();
    return;
}

// Se todas as validações passarem: 

// AQUI você faria a chamada real para o servidor (API) para autenticação. 
// Neste exemplo, vamos apenas simular um login bem-sucedido. 
console.log('Dados prontos para envio:', { email: email, senha: senha });
alert('Login bem-sucedido! Redirecionando...');

// Descomente a linha abaixo para enviar o formulário normalmente, 
// ou substitua por window.location.href para redirecionar o usuário. 
// loginForm.submit(); 


// ... Se todas as validações passarem: 

console.log('Dados prontos para envio:', { email: email, senha: senha });
// alert('Login bem-sucedido! Redirecionando...'); // Comente ou remova esta linha 

// REDIRECIONA PARA O DASHBOARD 
window.location.href = 'dashboard.html';

// DENTRO DE document.addEventListener('DOMContentLoaded', function() { ... 

// --- LÓGICA DE RECUPERAÇÃO DE SENHA --- 
const recuperarSenhaForm = document.getElementById('recuperarSenhaForm');

if (recuperarSenhaForm) {
    recuperarSenhaForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const emailInput = document.getElementById('email_recuperacao');
        const email = emailInput.value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            alert('Por favor, preencha o campo E-mail.');
            emailInput.focus();
            return;
        }

        if (!emailPattern.test(email)) {
            alert('Por favor, insira um endereço de E-mail válido.');
            emailInput.focus();
            return;
        }

           // Simulação de sucesso: 
           // Na vida real, o código aqui faria uma requisição ao servidor para 
enviar o link.
            console.log('Solicitação de recuperação enviada para:', email);
        alert(`Instruções de redefinição de senha foram enviadas para ${email}. 
Verifique sua caixa de entrada.`);

        // Opcional: Redirecionar para a página de login após o aviso 
        // window.location.href = 'index.html'; 
    });
}

   // ... (Seu código de validação de Login/Cadastro continua aqui) ... 
 
}); 
 
}); 
