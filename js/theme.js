// theme.js - Controle do Tema Claro/Escuro com Persistência

const Theme = (() => {
    const toggleBtnId = 'theme-toggle';
    const storageKey = 'theme';

    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(storageKey, theme);
    };

    const toggleTheme = () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    };

    const init = () => {
        const savedTheme = localStorage.getItem(storageKey) || 'dark';
        setTheme(savedTheme);

        const toggleBtn = document.getElementById(toggleBtnId);
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);
        }
    };

    return { init };
})();

// Inicializar o tema quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
});
