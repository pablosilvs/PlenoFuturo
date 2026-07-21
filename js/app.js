// app.js - Ponto único de inicialização do PlenoFuturo com integração de módulos e renderização

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

// Renderiza a homepage com artigos destacados
document.addEventListener('DOMContentLoaded', () => {
  Renderer.initHome();

  // Inicializa os anúncios se o AdsManager existir
  if (typeof AdsManager !== 'undefined') {
    AdsManager.checkAndDisplayAds();
  }
});
