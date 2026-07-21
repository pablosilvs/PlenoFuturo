// app.js - Ponto único de inicialização do PlenoFuturo

// Inicializa o tema (claro/escuro)
Theme.init();

// Inicializa o banner de cookies e consentimento LGPD
CookieConsent.init();

// Inicializa o roteador SPA para controle de páginas
Router.init();

// Inicializa o FAQ para interação de abrir/fechar perguntas
FAQ.init();

// Inicializa o formulário newsletter com validação e feedback
Newsletter.init();

// (Opcional) Inicializar gerenciador de anúncios quando disponível
if (typeof AdsManager !== 'undefined') {
    AdsManager.checkAndDisplayAds();
}
