// router.js - SPA Roteador e Renderização

const Router = (() => {
    const rootId = 'app-root';

    // Função para scrollar ao topo ao mudar a rota
    const scrollToTop = () => window.scrollTo(0, 0);

    // Ponto de entrada para renderizar as páginas conforme hash
    const route = () => {
        const root = document.getElementById(rootId);
        if (!root) return;

        const hash = window.location.hash.slice(1) || 'home';
        scrollToTop();

        if (hash === 'home' || hash === '') {
            Renderer.renderHome(root);
        } else if (hash.startsWith('artigo/')) {
            const id = hash.split('/')[1];
            Renderer.renderArticle(root, id);
        } else if (hash === 'calculadoras') {
            Renderer.renderCalculators(root);
        } else {
            Renderer.renderInstitutional(root, hash);
        }

        AdsManager.checkAndDisplayAds();
    };

    // Inicializa o roteador
    const init = () => {
        window.addEventListener('hashchange', route);
        window.addEventListener('DOMContentLoaded', route);
    };

    return { init };
})();
