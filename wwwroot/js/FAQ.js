console.log("faq.js carregado");

document.addEventListener("DOMContentLoaded", function () {
    const ajudaLink = document.getElementById("ajuda-link");
    const faqModal = document.getElementById("faq-modal");
    const closeFaq = document.getElementById("close-faq");
    const faqSection = document.getElementById("faq-section");

    // Perguntas frequentes (completas)
    const faqs = [
        { q: "Como acesso meus cursos?", a: "Para acessar seus cursos, clique em 'Meus Cursos' no menu lateral. Lá você encontrará todos os cursos que adquiriu, com acesso aos módulos, aulas e atividades disponíveis." },
        { q: "Posso estudar pelo celular?", a: "Sim! Nossa plataforma é totalmente compatível com celulares e tablets, permitindo que você assista às aulas, realize atividades e acompanhe seu progresso de qualquer lugar." },
        { q: "Esqueci minha senha, e agora?", a: "Se você esqueceu sua senha, clique em 'Esqueci minha senha' na tela de login e siga os passos para redefinir sua senha de forma segura e rápida." },
        { q: "Os cursos têm certificado?", a: "Sim! Ao concluir um curso, o certificado é gerado automaticamente. Você poderá baixá-lo em PDF ou compartilhá-lo via link oficial diretamente do painel do curso." },
        { q: "Como entro em contato com o suporte?", a: "Nosso suporte está disponível via e-mail suporte@zeroum.com ou pelo chat da plataforma. Estamos prontos para esclarecer dúvidas sobre matrícula, acesso aos cursos, certificados e pagamentos." },
        { q: "Como sei meu progresso nos cursos?", a: "Você pode acompanhar seu progresso diretamente em cada card de curso no painel principal. Os módulos concluídos, atividades feitas e porcentagem de avanço ficam visíveis para facilitar seu acompanhamento." },
        { q: "Posso baixar as aulas para assistir offline?", a: "No momento, as aulas estão disponíveis apenas online. Recomendamos acesso à internet para assistir às aulas e realizar atividades." },
        { q: "Os cursos têm prazo para conclusão?", a: "Não! Você pode estudar no seu próprio ritmo. Não há prazos fixos para terminar os cursos, garantindo flexibilidade de acordo com sua disponibilidade." },
        { q: "Há testes ou atividades nos cursos?", a: "Sim! Muitos cursos incluem atividades de fixação e testes automáticos para reforçar o aprendizado e permitir que você avalie seu progresso durante o curso." },
        { q: "Como posso mudar meu e-mail de login?", a: "Para alterar seu e-mail de login, entre em contato com o suporte informando seu novo e-mail e solicitando a atualização de forma segura." },
        { q: "Posso cancelar minha matrícula?", a: "Sim, você pode cancelar sua matrícula a qualquer momento. Basta enviar uma solicitação ao suporte, informando o motivo do cancelamento, e sua matrícula será processada." },
        { q: "Quais são as formas de pagamento disponíveis?", a: "Aceitamos cartões de crédito, PIX e boleto bancário. As opções são exibidas no momento da compra do curso, e você pode consultar detalhes e histórico de pagamentos em sua conta." },
        { q: "Qual idade mínima e os pré-requisitos para fazer um curso na Zero Um Cursos?", a: "Para se inscrever em nossos cursos, é necessário ter pelo menos 14 anos, possuir CPF válido e uma conta de e-mail ativa para cadastro e comunicação." }
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
            <h3 style="color:#9c45e8; text-align:center;">❓ Ainda com dúvidas?</h3>
            <p style="color:#ccc; text-align:center;">Pergunte ao nosso assistente 🤖:</p>
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

    // Inicializa elementos do chat
    const chatWindow = document.getElementById("chat-window");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");


    // Histórico de perguntas e respostas
    let historico = [];

    // Estado atual do chatbot
    let etapa = "boasVindas"; // boasVindas, perguntando, continuarOuParar, finalizar

 
    function addMessage(sender, text) {
        const msgContainer = document.createElement("div");
        msgContainer.style.display = "flex";
        msgContainer.style.justifyContent = sender === "bot" ? "flex-start" : "flex-end";
        msgContainer.style.margin = "5px 0";

        const msg = document.createElement("div");
        msg.style.padding = "10px 14px";
        msg.style.borderRadius = "12px";
        msg.style.maxWidth = "70%";
        msg.style.wordWrap = "break-word";
        msg.style.whiteSpace = "pre-wrap";
        msg.style.backgroundColor = sender === "bot" ? "#f0f0f0" : "#9c45e8";
        msg.style.color = sender === "bot" ? "#000" : "#fff";
        msg.textContent = `${sender === "bot" ? "🤖" : "🧑"} ${text}`;

        msgContainer.appendChild(msg);
        chatWindow.appendChild(msgContainer);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }


    // Respostas automáticas
    const respostas = {
        curso: "Você pode acessar todos os seus cursos na aba 'Meus Cursos'. Cada curso mostra seu progresso, módulos disponíveis e materiais complementares. Além disso, você pode retomar de onde parou e acessar atividades de fixação online.",
        senha: "Se você esqueceu sua senha, clique em 'Esqueci minha senha' na tela de login e siga as instruções para redefinir sua senha de forma segura.",
        certificado: "Após concluir um curso, o certificado é gerado automaticamente. Você pode baixá-lo em PDF diretamente no seu painel de cursos ou compartilhar via link oficial fornecido pelo sistema.",
        suporte: "Nosso suporte está disponível via e-mail suporte@zeroum.com ou através deste chat. Estamos prontos para tirar dúvidas sobre matrícula, acesso aos cursos, certificados e pagamentos.",
        celular: "Sim! Nossa plataforma é totalmente compatível com celulares e tablets. Você consegue assistir às aulas, acessar materiais e realizar atividades diretamente do seu dispositivo móvel.",
        idade: "Para se inscrever em qualquer curso da Zero Um Cursos, é necessário ter no mínimo 14 anos e possuir CPF válido, além de uma conta de e-mail ativa para cadastro.",
        pagamento: "Aceitamos diversas formas de pagamento: cartões de crédito, PIX e boleto bancário. As opções aparecem no momento da compra, e você pode consultar detalhes e histórico de pagamentos na sua conta."
    };
    // Função para mostrar instruções iniciais
    function instrucoes() {
        setTimeout(() => addMessage("bot", "Você pode me perguntar sobre: 'curso', 'senha', 'certificado', 'suporte', 'celular', 'idade' ou 'pagamento' e mais."),1000);
        etapa = "perguntando";
    }

    // Processa a pergunta do usuário
    function processarPergunta(pergunta) {
        let resposta = "Desculpe, não entendi sua pergunta. Pode reformular?";
        for (let chave in respostas) {
            if (pergunta.includes(chave)) {
                resposta = respostas[chave];
                break;
            }
        }

        historico.push({ pergunta: pergunta, resposta: resposta });
        setTimeout(() =>  addMessage("bot", resposta),500);

        // Segunda resposta do bot oferecendo continuar ou parar
        setTimeout(() => {
            setTimeout(() => addMessage("bot", "Aqui está a informação que encontrei. Você quer continuar perguntando ou finalizar o chat? (responda 'continuar' ou 'parar')"), 2000);
            etapa = "continuarOuParar";
        }, 600);
    }

    // Finaliza o chat perguntando se resolveu
    function finalizarChat() {
        setTimeout(() => addMessage("bot", "Você conseguiu resolver seu problema? (responda 'sim' ou 'não')"), 2000);
        etapa = "finalizar";
    }

    // Resposta final do bot
    function respostaFinal(respostaUsuario) {
        if (respostaUsuario.toLowerCase() === "sim") {
            setTimeout(() =>  addMessage("bot", "Fico feliz em ter ajudado! 😊"), 500);
        } else {
            setTimeout(() => addMessage("bot", "Desculpe por não conseguir ajudar completamente. 😔 Entre em contato pelo email suporte@zeroum.com para mais detalhes."),500);
        }
        console.log("Histórico da conversa:", historico);
        etapa = "concluido";
    }

    // Abrir modal
    ajudaLink.addEventListener("click", function (e) {
        e.preventDefault();
        faqModal.style.display = "flex";
        chatWindow.innerHTML = "";
        addMessage("bot", "Olá, tudo bem? 😊 Sou seu assistente virtual e estou aqui para ajudá-lo com qualquer dúvida sobre nosso site...");
        setTimeout(instrucoes, 500);
    });

    // Fechar modal
    closeFaq.addEventListener("click", () => faqModal.style.display = "none");
    window.addEventListener("click", e => { if (e.target === faqModal) faqModal.style.display = "none"; });

    // Expande/recolhe respostas
    document.querySelectorAll(".faq-question").forEach(btn => {
        btn.addEventListener("click", () => {
            const ans = btn.nextElementSibling;
            ans.style.display = ans.style.display === "block" ? "none" : "block";
        });
    });

    // Envia pergunta e controla fluxo
    sendBtn.addEventListener("click", () => {
        const pergunta = userInput.value.trim().toLowerCase();
        if (!pergunta) return;
        addMessage("user", pergunta);
        userInput.value = "";

        switch (etapa) {
            case "perguntando":
                processarPergunta(pergunta);
                break;
            case "continuarOuParar":
                if (pergunta === "continuar") {
                    instrucoes();
                } else if (pergunta === "parar") {
                    finalizarChat();
                } else {
                    addMessage("bot", "Opção inválida! Por favor, responda 'continuar' ou 'parar'.");
                }
                break;
            case "finalizar":
                if (["sim", "não", "nao"].includes(pergunta)) {
                    respostaFinal(pergunta);
                } else {
                    addMessage("bot", "Por favor, responda apenas 'sim' ou 'não'.");
                }
                break;
            case "concluido":
                addMessage("bot", "O chat foi finalizado. Se quiser, pode abrir novamente fechando a aba ajuda e abrindo novamente.");
                break;
        }
    });

    userInput.addEventListener("keypress", e => { if (e.key === "Enter") sendBtn.click(); });
});