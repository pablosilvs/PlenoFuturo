// faq.js - Controle de interação do FAQ (abrir e fechar)

const FAQ = (() => {

    // Alterna a visibilidade da resposta do FAQ pelo índice
    const toggleFaq = (index) => {
        const ans = document.getElementById(`faq-ans-${index}`);
        const icon = document.getElementById(`faq-icon-${index}`);
        if (!ans || !icon) return;

        if (ans.style.display === 'none' || ans.style.display === '') {
            ans.style.display = 'block';
            icon.innerText = '-';
        } else {
            ans.style.display = 'none';
            icon.innerText = '+';
        }
    };

    // Inicializa eventos baseado em itens FAQ renderizados
    const init = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item, idx) => {
            item.addEventListener('click', () => toggleFaq(idx));
        });
    };

    return {
        toggleFaq,
        init
    };
})();
