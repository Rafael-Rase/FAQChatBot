document.addEventListener("DOMContentLoaded", function () {
    const ajudaLink = document.getElementById("ajuda-link");
    const faqModal = document.getElementById("faq-modal");
    const closeFaq = document.getElementById("close-faq");
    const faqSection = document.getElementById("faq-section");

    // Perguntas frequentes (completas)
    const faqs = [
        { q: "Como acesso meus cursos?", a: "Clique em 'Meus Cursos' no menu lateral." },
        { q: "Posso estudar pelo celular?", a: "Sim! Nosso site é compatível com dispositivos móveis." },
        { q: "Esqueci minha senha, e agora?", a: "Use a opção 'Esqueci minha senha' na tela de login." },
        { q: "Os cursos têm certificado?", a: "Sim! Após concluir o curso, o certificado é liberado automaticamente." },
        { q: "Como entro em contato com o suporte?", a: "Envie e-mail para suporte@zeroum.com ou use o chat dentro da plataforma." },
        { q: "Como sei meu progresso nos cursos?", a: "Você pode visualizar o progresso em cada card do seu curso no painel principal." },
        { q: "Posso baixar as aulas para assistir offline?", a: "No momento, as aulas só estão disponíveis online." },
        { q: "Os cursos têm prazo para conclusão?", a: "Não! Você pode estudar no seu ritmo, sem prazos." },
        { q: "Há testes ou atividades nos cursos?", a: "Sim, alguns cursos possuem atividades de fixação e testes automáticos." },
        { q: "Como posso mudar meu e-mail de login?", a: "Entre em contato com o suporte para solicitar a alteração de e-mail." },
        { q: "Posso cancelar minha matrícula?", a: "Sim, envie uma solicitação ao suporte informando o motivo do cancelamento." },
        { q: "Quais são as formas de pagamento disponíveis?", a: "Aceitamos cartões de crédito, PIX e boleto bancário. As opções aparecem no momento da compra do curso." },
        { q: "Qual idade mínima e os pré-requisitos para fazer um curso na Zero Um Cursos?", a: "Para fazer um curso na Zero Um Cursos é necessário ter, no mínimo, 14 anos e possuir CPF e conta de e-mail válida." }
    ];

    // Monta o HTML do FAQ mantendo o design original
    faqSection.innerHTML = `
        <h2 style="color: #fff; margin-bottom:10px;">❓ Perguntas Frequentes</h2>
        ${faqs.map(f => `
            <div class="faq-item">
                <button class="faq-question">${f.q}</button>
                <div class="faq-answer" style="display:none;">${f.a}</div>
            </div>
        `).join('')}
        <hr style="margin:15px 0; border:1px solid #222;">
        <div class="chatbot">
            <h3 style="color:#9c45e8;">❓ Ainda com dúvidas?</h3>
            <p style="color:#ccc;">Pergunte ao nosso assistente 🤖:</p>
            <div id="chat-window" style="
                background:#111;
                height:150px;
                overflow-y:auto;
                border-radius:8px;
                padding:10px;
                margin-bottom:10px;
                border:1px solid #222;
            "></div>
            <input type="text" id="user-input" placeholder="Digite sua pergunta..." style="
                width:80%;
                padding:8px;
                border-radius:5px;
                border:none;
                outline:none;
            ">
            <button id="send-btn" style="
                background:#9c45e8;
                color:white;
                border:none;
                padding:8px 12px;
                border-radius:5px;
                cursor:pointer;
                font-weight:bold;
            ">Enviar</button>
        </div>
    `;

    // Ação de abrir modal
    ajudaLink.addEventListener("click", function (e) {
        e.preventDefault();
        faqModal.style.display = "flex";

        // 👉 limpa o chat e envia mensagem inicial do bot
        chatWindow.innerHTML = "";
        setTimeout(() => {
            addMessage("bot", "Olá, tudo bem? 😊 Como posso lhe ajudar hoje? Eu sei sobre, cursos, certificado, pagamento...");
        }, 400);
    });

    // Fechar modal
    closeFaq.addEventListener("click", () => faqModal.style.display = "none");
    window.addEventListener("click", (e) => {
        if (e.target === faqModal) faqModal.style.display = "none";
    });

    // Expande/recolhe respostas
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const ans = btn.nextElementSibling;
            ans.style.display = ans.style.display === "block" ? "none" : "block";
        });
    });

    // Chatbot simples
    const chatWindow = document.getElementById("chat-window");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    function addMessage(sender, text) {
        const msg = document.createElement("div");
        msg.style.margin = "5px 0";
        msg.style.color = sender === "bot" ? "#9c45e8" : "#fff";
        msg.textContent = `${sender === "bot" ? "🤖" : "🧑"} ${text}`;
        chatWindow.appendChild(msg);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    const respostas = {
        cursos: "Você pode ver todos os seus cursos na aba 'Meus Cursos'.",
        senha: "Use 'Esqueci minha senha' na tela de login para redefinir.",
        certificado: "Após concluir o curso, o certificado aparece automaticamente.",
        suporte: "Entre em contato pelo e-mail suporte@zeroum.com ou use este chat.",
        celular: "Sim, a plataforma funciona perfeitamente em celulares e tablets!",
        idade: "Para fazer um curso na Zero Um Cursos é necessário ter, no mínimo, 14 anos e possuir CPF e conta de e-mail válida."
    };

    sendBtn.addEventListener("click", () => {
        const pergunta = userInput.value.trim().toLowerCase();
        if (pergunta === "") return;
        addMessage("user", pergunta);
        userInput.value = "";
        let resposta = "Desculpe, não entendi sua pergunta. Pode reformular?";
        for (let chave in respostas) {
            if (pergunta.includes(chave)) {
                resposta = respostas[chave];
                break;
            }
        }
        setTimeout(() => addMessage("bot", resposta), 600);
    });

    userInput.addEventListener("keypress", e => {
        if (e.key === "Enter") sendBtn.click();
    });
});
