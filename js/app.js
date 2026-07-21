// Base de Dados de Artigos Completos e Profissionais
const artigosDB = [
    {
        id: 'regra-50-30-20',
        categoria: 'Finanças',
        titulo: 'Regra dos 50-30-20: Como Organizar o Orçamento Familiar na Maturidade',
        resumo: 'Aprenda a aplicar a regra orçamentária 50-30-20 para equilibrar gastos essenciais, estilo de vida e investimentos focados na aposentadoria.',
        tempoLeitura: '5 min de leitura',
        data: '21 de Julho de 2026',
        conteudo: `
            <p>A gestão financeira na maturidade exige um olhar estratégico sobre os recursos disponíveis. Com a proximidade ou consolidação da aposentadoria, manter o equilíbrio entre qualidade de vida e segurança financeira torna-se prioridade absoluta.</p>
            <h3>O que é a Regra 50-30-20?</h3>
            <p>Originada popularmente no livro "All Your Worth", a metodologia divide a renda líquida mensal em três grandes pilares:</p>
            <ul>
                <li><strong>50% para Necessidades:</strong> Gastos essenciais como moradia, saúde, alimentação, contas básicas e transporte.</li>
                <li><strong>30% para Desejos:</strong> Estilo de vida, lazer, viagens, hobbies e restaurantes.</li>
                <li><strong>20% para Objetivos Financeiros:</strong> Formação de reserva de emergência, investimentos de longo prazo e quitação de dívidas.</li>
            </ul>
            <h3>Adaptando para a Maturidade</h3>
            <p>Para quem está na faixa dos 40 anos ou mais, o foco na fatia de 20% deve ser implacável. Priorize investimentos em renda fixa atrelados à inflação (como Tesouro IPCA+) para blindar seu poder de compra a longo prazo.</p>
        `
    },
    {
        id: 'transicao-carreira-45',
        categoria: 'Carreira',
        titulo: 'Como Fazer uma Transição de Carreira aos 45 Anos com Segurança Financeira',
        resumo: 'Planeje sua mudança de profissão após os 40 anos sem comprometer seu orçamento. Guia passo a passo sobre requalificação e networking.',
        tempoLeitura: '7 min de leitura',
        data: '21 de Julho de 2026',
        conteudo: `
            <p>Mudar de carreira na maturidade não é mais uma exceção, mas uma tendência crescente impulsionada pela busca de propósito e longevidade ativa.</p>
            <h3>1. Mapeamento de Competências Transferíveis</h3>
            <p>Suas habilidades acumuladas ao longo de décadas (liderança, gestão de crises, negociação e inteligência emocional) são altamente valiosas em novos mercados.</p>
            <h3>2. Reserva de Transição</h3>
            <p>Antes de dar o salto profissional, certifique-se de possuir uma reserva financeira equivalente a pelo menos 6 a 12 meses do seu custo de vida atual.</p>
        `
    },
    {
        id: 'suplementos-memoria',
        categoria: 'Saúde',
        titulo: 'Melhores Suplementos para Memória e Foco Comprovados pela Ciência',
        resumo: 'Descubra quais suplementos alimentares realmente ajudam no foco e clareza mental para adultos acima dos 40 anos segundo estudos científicos.',
        tempoLeitura: '6 min de leitura',
        data: '21 de Julho de 2026',
        conteudo: `
            <p>A preservação da função cognitiva é um dos pilares fundamentais da longevidade saudável. A ciência moderna tem validado compostos que auxiliam na neuroproteção e foco.</p>
            <h3>Nutrientes em Destaque</h3>
            <ul>
                <li><strong>Ômega-3 (EPA e DHA):</strong> Essencial para a integridade das membranas neuronais e redução de processos inflamatórios cerebrais.</li>
                <li><strong>Vitamina D3 e K2:</strong> Receptores vitamínicos no cérebro influenciam diretamente a clareza mental e o humor.</li>
                <li><strong>Magnésio L-Treonato:</strong> Conhecido por cruzar a barreira hematoencefálica com eficiência, auxiliando na memória de curto e longo prazo.</li>
            </ul>
            <p><em>Aviso importante: Sempre consulte um médico ou nutricionista antes de iniciar qualquer suplementação.</em></p>
        `
    }
];

// Roteador SPA Inteligente
function router() {
    const hash = window.location.hash.slice(1) || 'home';
    const root = document.getElementById('app-root');
    window.scrollTo(0, 0);

    if (hash === 'home') {
        renderHome(root);
    } else if (hash.startsWith('artigo/')) {
        const id = hash.split('/')[1];
        renderArticle(root, id);
    } else {
        renderInstitutional(root, hash);
    }
}

function renderHome(root) {
    root.innerHTML = `
        <section class="hero-section">
            <h1>Viva a melhor fase da sua vida com autonomia</h1>
            <p>Conteúdos práticos sobre finanças, saúde integrativa e transição de carreira para uma longevidade ativa.</p>
            <div class="search-box">
                <input type="text" id="searchInput" placeholder="O que você deseja aprender hoje?" oninput="filterArticles(this.value)">
            </div>
        </section>
        <h2 style="margin-bottom: 25px; font-family: 'Merriweather', serif;">Últimos Artigos</h2>
        <div class="articles-grid" id="articlesGrid">
            ${artigosDB.map(art => `
                <article class="card">
                    <div>
                        <span class="card-category">${art.categoria}</span>
                        <h3>${art.titulo}</h3>
                        <p>${art.resumo}</p>
                    </div>
                    <div class="card-footer">
                        <span>${art.tempoLeitura}</span>
                        <a href="#artigo/${art.id}" style="color: var(--accent); text-decoration: none; font-weight: 600;">Ler artigo &rarr;</a>
                    </div>
                </article>
            `).join('')}
        </div>
    `;
}

function filterArticles(query) {
    const grid = document.getElementById('articlesGrid');
    if (!grid) return;
    const filtered = artigosDB.filter(art => 
        art.titulo.toLowerCase().includes(query.toLowerCase()) || 
        art.resumo.toLowerCase().includes(query.toLowerCase())
    );
    grid.innerHTML = filtered.map(art => `
        <article class="card">
            <div>
                <span class="card-category">${art.categoria}</span>
                <h3>${art.titulo}</h3>
                <p>${art.resumo}</p>
            </div>
            <div class="card-footer">
                <span>${art.tempoLeitura}</span>
                <a href="#artigo/${art.id}" style="color: var(--accent); text-decoration: none; font-weight: 600;">Ler artigo &rarr;</a>
            </div>
        </article>
    `).join('') || '<p>Nenhum artigo encontrado para sua busca.</p>';
}

function renderArticle(root, id) {
    const art = artigosDB.find(a => a.id === id);
    if (!art) {
        root.innerHTML = `<div class="content-page"><h2>Artigo não encontrado</h2><p><a href="#home">Voltar ao início</a></p></div>`;
        return;
    }
    root.innerHTML = `
        <article class="content-page">
            <span class="card-category">${art.categoria}</span>
            <h1 style="font-family: 'Merriweather', serif; margin: 15px 0; color: var(--text-primary); font-size: 2rem;">${art.titulo}</h1>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 30px;">Publicado em ${art.data} • ${art.tempoLeitura}</p>
            <div style="font-size: 1.05rem; line-height: 1.8;">
                ${art.conteudo}
            </div>
            <hr style="border: 0; border-top: 1px solid var(--border); margin: 40px 0;">
            <a href="#home" class="btn-primary">&larr; Voltar para a Página Inicial</a>
        </article>
    `;
}

function renderInstitutional(root, page) {
    const pages = {
        'quem-somos': {
            titulo: 'Quem Somos',
            conteudo: `
                <p>O <strong>PlenoFuturo</strong> nasceu com um propósito claro: democratizar o conhecimento prático sobre longevidade ativa, planejamento financeiro de longo prazo e reinvenção profissional na maturidade.</p>
                <p>Acreditamos que a faixa dos 40, 50 anos e além não representa o fim de um ciclo, mas sim o início de uma fase marcada pela sabedoria, autonomia e novas conquistas. Nossa missão é fornecer conteúdos rigorosos, diretos ao ponto e livres de jargões complexos.</p>
            `
        },
        'privacidade': {
            titulo: 'Política de Privacidade (LGPD)',
            conteudo: `
                <p>A sua privacidade é de extrema importância para nós. O PlenoFuturo segue rigorosamente as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
                <h3>Coleta de Dados</h3>
                <p>Utilizamos cookies estritamente necessários para navegação e cookies analíticos/publicitários de terceiros (como o Google AdSense) mediante o seu consentimento explícito.</p>
                <h3>Seus Direitos</h3>
                <p>Você pode a qualquer momento solicitar a exclusão de dados de navegação ou ajustar suas preferências através do nosso banner de cookies.</p>
            `
        },
        'cookies': {
            titulo: 'Política de Cookies',
            conteudo: `
                <p>Utilizamos cookies para melhorar a sua experiência de navegação, personalizar conteúdos e analisar o tráfego do portal.</p>
                <h3>Como Gerenciar</h3>
                <p>Você tem total liberdade para aceitar, recusar ou personalizar o uso de cookies através do painel de preferências exibido no rodapé do site.</p>
            `
        },
        'termos': {
            titulo: 'Termos de Uso',
            conteudo: `
                <p>Ao acessar o portal <strong>PlenoFuturo</strong>, você concorda expressamente com os termos descritos nesta página.</p>
                <h3>Propriedade Intelectual</h3>
                <p>Todo o conteúdo publicado neste portal (textos, gráficos, logotipos) é protegido por direitos autorais, sendo vedada a reprodução comercial sem autorização prévia.</p>
            `
        },
        'aviso-legal': {
            titulo: 'Aviso Legal',
            conteudo: `
                <p>As informações fornecidas no portal <strong>PlenoFuturo</strong> possuem caráter estritamente educacional e informativo.</p>
                <p>Conteúdos sobre finanças e saúde não substituem a consultoria individualizada com profissionais certificados (médicos, planejadores financeiros ou advogados).</p>
            `
        },
        'faq': {
            titulo: 'FAQ - Perguntas Frequentes',
            conteudo: `
                <h3>1. Os conteúdos do PlenoFuturo são gratuitos?</h3><p>Sim, 100% gratuitos e acessíveis a qualquer momento.</p>
                <h3>2. Como posso sugerir novos temas?</h3><p>Através da nossa página de contato ou redes sociais oficiais.</p>
                <h3>3. O site possui anúncios?</h3><p>Sim, exibimos anúncios contextuais para manter a gratuidade da plataforma.</p>
                <h3>4. Como alterar minhas preferências de cookies?</h3><p>Basta limpar os dados de navegação ou redefinir as preferências no banner.</p>
                <h3>5. Preciso me cadastrar para ler os artigos?</h3><p>Não é obrigatório o cadastro para leitura.</p>
                <h3>6. Posso compartilhar os textos?</h3><p>Sim, desde que citada a fonte original.</p>
                <h3>7. Os artigos são revisados por especialistas?</h3><p>Sim, seguimos critérios rígidos de curadoria de conteúdo.</p>
                <h3>8. Como funciona a monetização?</h3><p>Por meio de anúncios de parceiros confiáveis como o Google AdSense.</p>
                <h3>9. O site é compatível com celulares?</h3><p>Sim, o design é totalmente responsivo para smartphones e tablets.</p>
                <h3>10. Posso investir com base nos artigos de finanças?</h3><p>Os textos são educacionais; recomenda-se análise de perfil de risco.</p>
                <h3>11. Como entrar em contato com a redação?</h3><p>Utilize o formulário disponível na aba Contato.</p>
                <h3>12. Com que frequência há novos artigos?</h3><p>Publicamos conteúdos novos semanalmente.</p>
                <h3>13. Os dados fornecidos no contato são seguros?</h3><p>Sim, protegidos conforme a LGPD.</p>
                <h3>14. O PlenoFuturo possui newsletter?</h3><p>Sim, em breve com boletins exclusivos por e-mail.</p>
                <h3>15. Como apoiar o projeto?</h3><p>Compartilhando nossos artigos com amigos e familiares!</p>
            `
        },
        'contato': {
            titulo: 'Contato',
            conteudo: `
                <p>Tem dúvidas, sugestões ou deseja anunciar conosco? Entre em contato através do e-mail:</p>
                <p><strong>contato@plenofuturo.com.br</strong></p>
                <p>Responderemos sua mensagem em até 48 horas úteis.</p>
            `
        }
    };

    const current = pages[page] || { titulo: 'Página não encontrada', conteudo: '<p>A página solicitada não existe.</p>' };
    root.innerHTML = `
        <div class="content-page">
            <h2>${current.titulo}</h2>
            ${current.conteudo}
            <hr style="border: 0; border-top: 1px solid var(--border); margin: 30px 0;">
            <a href="#home" class="btn-primary">&larr; Voltar para a Página Inicial</a>
        </div>
    `;
}

// Cookie Banner Manager
function initCookieBanner() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <p>Utilizamos cookies para melhorar sua experiência de navegação e exibir anúncios personalizados em conformidade com a LGPD. Ao continuar navegando, você concorda com nossa <a href="#privacidade" style="color: var(--accent);">Política de Privacidade</a>.</p>
            <div class="cookie-buttons">
                <button class="btn-primary" onclick="acceptCookies()">Aceitar Todos</button>
                <button class="btn-theme" onclick="rejectCookies()">Recusar</button>
            </div>
        `;
        document.body.appendChild(banner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    removeCookieBanner();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    removeCookieBanner();
}

function removeCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
}

// Theme Toggle
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
        });
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initCookieBanner();
    router();
});
