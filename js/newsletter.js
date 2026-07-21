// newsletter.js - Controle do formulário de newsletter

const Newsletter = (() => {
    const formId = 'newsletter-form';
    const inputId = 'newsEmail';
    const feedbackId = 'newsFeedback';

    // Valida email simples
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    // Manipula o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        const input = document.getElementById(inputId);
        const feedback = document.getElementById(feedbackId);
        if (!input || !feedback) return;

        if (validateEmail(input.value)) {
            feedback.innerText = 'Inscrição realizada com sucesso! Verifique sua caixa de entrada.';
            feedback.style.color = 'var(--success)';
            feedback.style.display = 'block';
            input.value = '';
        } else {
            feedback.innerText = 'Por favor, insira um e-mail válido.';
            feedback.style.color = 'var(--error)';
            feedback.style.display = 'block';
        }
    };

    // Inicializa o formulário adicionando o event listener
    const init = () => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', handleSubmit);
        }
    };

    return { init };
})();
