// cookieConsent.js - Controle do banner e consentimento LGPD

const CookieConsent = (() => {
    const storageKey = 'cookieConsent';
    const bannerId = 'cookie-banner';

    // Exibe banner se consentimento não estiver salvo
    const showBanner = () => {
        if (localStorage.getItem(storageKey)) return;

        const banner = document.createElement('div');
        banner.id = bannerId;
        banner.style.position = 'fixed';
        banner.style.bottom = '0';
        banner.style.left = '0';
        banner.style.right = '0';
        banner.style.background = 'var(--card-bg)';
        banner.style.borderTop = '1px solid var(--border)';
        banner.style.padding = '20px 24px';
        banner.style.display = 'flex';
        banner.style.justifyContent = 'space-between';
        banner.style.alignItems = 'center';
        banner.style.zIndex = '1000';
        banner.style.boxShadow = '0 -4px 20px rgba(0,0,0,0.3)';
        banner.style.flexWrap = 'wrap';
        banner.style.gap = '20px';

        banner.innerHTML = `
            <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 800px; margin: 0;">
                Utilizamos cookies para melhorar sua experiência de navegação e exibir anúncios personalizados em conformidade com a LGPD.
            </p>
            <div style="display: flex; gap: 10px;">
                <button class="btn-primary" id="accept-cookies">Aceitar Todos</button>
                <button class="btn-secondary" id="reject-cookies">Recusar</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('accept-cookies').addEventListener('click', acceptCookies);
        document.getElementById('reject-cookies').addEventListener('click', rejectCookies);
    };

    const acceptCookies = () => {
        localStorage.setItem(storageKey, 'accepted');
        removeBanner();
        AdsManager.checkAndDisplayAds();
    };

    const rejectCookies = () => {
        localStorage.setItem(storageKey, 'rejected');
        removeBanner();
    };

    const removeBanner = () => {
        const banner = document.getElementById(bannerId);
        if (banner) banner.remove();
    };

    // Inicializa o banner na DOMContentLoaded
    const init = () => {
        document.addEventListener('DOMContentLoaded', showBanner);
    };

    return { init, acceptCookies, rejectCookies };
})();
