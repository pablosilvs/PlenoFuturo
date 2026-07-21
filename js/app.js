// Base de Dados de Artigos com Padrão E-E-A-T
const artigosDB = [
    {
        id: 'regra-50-30-20-maturidade',
        categoria: 'Finanças',
        titulo: 'Regra dos 50-30-20: Como Organizar o Orçamento Familiar na Maturidade',
        resumo: 'Aprenda a aplicar a regra orçamentária para equilibrar gastos essenciais, estilo de vida e investimentos focados na aposentadoria.',
        tempoLeitura: '6 min de leitura',
        dataAtualizacao: '21 de Julho de 2026',
        autor: {
            nome: 'Carlos Eduardo Mendes',
            cargo: 'Planejador Financeiro CFP® e Especialista em Longevidade',
            bio: 'Atua há mais de 15 anos auxiliando famílias na estruturação de patrimônio e transição para a aposentadoria segura.'
        },
        conteudo: `
            <p>A gestão financeira na maturidade exige um olhar estratégico sobre os recursos disponíveis. Com a proximidade ou consolidação da aposentadoria, manter o equilíbrio entre qualidade de vida e segurança financeira torna-se prioridade absoluta.</p>
            <h2>O que é a Regra 50-30-20?</h2>
            <p>Originada popularmente no planejamento financeiro moderno, a metodologia divide a renda líquida mensal em três grandes pilares essenciais:</p>
            <ul>
                <li><strong>50% para Necessidades:</strong> Gastos como moradia, saúde, alimentação e contas básicas.</li>
                <li><strong>30% para Desejos:</strong> Estilo de vida, lazer, viagens e hobbies.</li>
                <li><strong>20% para Objetivos Financeiros:</strong> Reserva de emergência e investimentos de longo prazo.</li>
            </ul>
            <div id="adsense-article-slot" class="ads-container" style="display:none;">Anúncio Contextual</div>
            <h2>Adaptando para a Maturidade</h2>
            <p>Para quem está na faixa dos 40 anos ou mais, o foco na fatia de 20% deve ser implacável. Priorize investimentos em renda fixa atrelados à inflação para blindar seu poder de compra.</p>
        `
    },
    {
        id: 'transicao-carreira-45-anos',
        categoria: 'Carreira',
        titulo: 'Como Fazer uma Transição de Carreira aos 45 Anos com Segurança',
        resumo: 'Planeje sua mudança profissional após os 40 anos sem comprometer seu orçamento. Guia passo a passo sobre requalificação e networking.',
        tempoLeitura: '8 min de leitura',
        dataAtualizacao: '21 de Julho de 2026',
        autor: {
            nome: 'Ana Paula Vasconcelos',
            cargo: 'Mentora de Carreira Executiva e Requalificação',
            bio: 'Especialista em transição profissional sênior e recolocação no mercado corporativo e de inovação.'
        },
        conteudo: `
            <p>Mudar de carreira na maturidade não é mais uma exceção, mas uma tendência crescente impulsionada pela busca de propósito e longevidade ativa.</p>
            <h2>1. Mapeamento de Competências Transferíveis</h2>
            <p>Suas habilidades acumuladas ao longo de décadas são altamente valiosas em novos mercados e ecossistemas digitais.</p>
        `
    }
];

// Roteador SPA
function router() {
    const hash = window.location.hash.slice(1) || 'home';
    const root = document.getElementById('app-root');
    window.scrollTo(0, 0);

    if (hash === 'home' || hash === '') {
        renderHome(root);
    } else if (hash.startsWith('artigo/')) {
        const id = hash.split('/')[1];
        renderArticle(root, id);
    } else if (hash === 'calculadoras') {
        renderCalculators(root);
    } else {
        renderInstitutional(root, hash);
    }
    checkAndDisplayAds();
}

function renderHome(root) {
    root.innerHTML = `
        <section class="hero-section">
            <span class="hero-badge">Longevidade Ativa & Autonomia</span>
            <h1>Viva a melhor fase da sua vida com clareza</h1>
            <p>Conteúdos práticos, seguros e baseados em evidências sobre finanças, saúde integrativa e transição de carreira.</p>
            <div class="hero-cta">
                <a href="#calculadoras" class="btn-primary">Explorar Ferramentas</a>
                <a href="#quem-somos" class="btn-secondary">Conheça o Portal</a>
            </div>
        </section>

        <div class="search-wrapper">
            <div class="search-box">
                <svg class="search-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input type="text" id="searchInput" placeholder="O que você deseja aprender hoje?" oninput="filterArticles(this.value)" aria-label="Pesquisar artigos">
            </div>
        </div>
        
        <h2 class="section-title">Artigos em Destaque</h2>
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
                        <a href="#artigo/${art.id}" class="read-link">Ler artigo &rarr;</a>
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
                <a href="#artigo/${art.id}" class="read-link">Ler artigo &rarr;</a>
            </div>
        </article>
    `).join('') || '<p style="color: var(--text-secondary);">Nenhum artigo encontrado para sua busca.</p>';
}

function renderArticle(root, id) {
    const art = artigosDB.find(a => a.id === id);
    if (!art) {
        root.innerHTML = `<div class="content-page"><h1>Artigo não encontrado</h1><p><a href="#home">Voltar ao início</a></p></div>`;
        return;
    }
    root.innerHTML = `
        <article class="content-page">
            <span class="card-category">${art.categoria}</span>
            <h1>${art.titulo}</h1>
            <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 30px;">Atualizado em ${art.dataAtualizacao} • ${art.tempoLeitura}</p>
            
            <div>${art.conteudo}</div>

            <div class="author-box">
                <div class="author-avatar">${art.autor.nome.charAt(0)}</div>
                <div>
                    <h4 style="color: var(--text-primary); margin-bottom: 4px; font-weight: 600;">${art.autor.nome}</h4>
                    <p style="font-size: 0.825rem; color: var(--accent); margin-bottom: 4px; font-weight: 500;">${art.autor.cargo}</p>
                    <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0;">${art.autor.bio}</p>
                </div>
            </div>

            <hr style="border: 0; border-top: 1px solid var(--border); margin: 30px 0;">
            <a href="#home" class="btn-secondary">&larr; Voltar para a Página Inicial</a>
        </article>
    `;
}

function renderCalculators(root) {
    root.innerHTML = `
        <div class="content-page">
            <h1>Simulador Financeiro</h1>
            <p>Utilize nossa ferramenta interativa para projetar o crescimento do seu patrimônio com base em juros compostos.</p>
            
            <div class="calculator-card" style="margin-top: 30px;">
                <label>Valor Inicial (R$)</label>
                <input type="number" id="jurosInicial" value="10000">
                <label>Aporte Mensal (R$)</label>
                <input type="number" id="jurosMensal" value="1000">
                <label>Prazo (Anos)</label>
                <input type="number" id="jurosAnos" value="20">
                <label>Taxa de Juros Anual (%)</label>
                <input type="number" id="jurosTaxa" value="10">
                <button class="btn-primary" onclick="calcularJuros()">Calcular Montante</button>
                <p id="resultadoJuros" style="margin-top: 24px; font-weight: 600; font-size: 1.1rem; color: var(--accent);"></p>
            </div>
        </div>
    `;
}

function calcularJuros() {
    const P = parseFloat(document.getElementById('jurosInicial').value) || 0;
    const PMT = parseFloat(document.getElementById('jurosMensal').value) || 0;
    const anos = parseInt(document.getElementById('jurosAnos').value) || 0;
    const i = (parseFloat(document.getElementById('jurosTaxa').value) || 0) / 100 / 12;
    const n = anos * 12;

    let montante = P * Math.pow(1 + i, n);
    for (let t = 1; t <= n; t++) {
        montante += PMT * Math.pow(1 + i, n - t);
    }

    document.getElementById('resultadoJuros').innerText = `Montante Acumulado Estimado: R$ ${montante.toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
}

function renderInstitutional(root, page) {
    const pages = {
        'quem-somos': {
            titulo: 'Quem Somos',
            conteudo: `<p>O <strong>PlenoFuturo</strong> é um portal independente dedicado a orientar adultos na construção de uma maturidade próspera, unindo rigor técnico em finanças e saúde baseada em evidências.</p>`
        },
        'privacidade': {
            titulo: 'Política de Privacidade (LGPD)',
            conteudo: `<p>Em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), garantimos total transparência e segurança sobre o tratamento de dados de navegação.</p>`
        },
        'cookies': {
            titulo: 'Política de Cookies',
            conteudo: `<p>Utilizamos apenas cookies essenciais para o funcionamento técnico e analíticos condicionados ao consentimento explícito.</p>`
        },
        'termos': {
            titulo: 'Termos de Uso',
            conteudo: `<p>O acesso e uso do portal PlenoFuturo implica na concordância com nossas diretrizes de propriedade intelectual e responsabilidade editorial.</p>`
        },
        'aviso-legal': {
            titulo: 'Aviso Legal & Disclaimer',
            conteudo: `<p>As informações aqui publicadas possuem caráter estritamente educacional, não substituindo a consultoria profissional individualizada.</p>`
        },
        'editorial': {
            titulo: 'Política Editorial',
            conteudo: `<p>Nosso conteúdo passa por rigorosa curadoria técnica para assegurar precisão, independência comercial e imparcialidade.</p>`
        },
        'transparencia': {
            titulo: 'Transparência',
            conteudo: `<p>O portal mantém sua sustentabilidade através de anúncios contextuais parceiros, sem interferência na curadoria dos conteúdos.</p>`
        },
        'contato': {
            titulo: 'Contato',
            conteudo: `<p>Entre em contato conosco através do e-mail: <strong>contato@plenofuturo.com.br</strong></p>`
        },
        'faq': {
            titulo: 'FAQ — Perguntas Frequentes',
            conteudo: `<h3>Os conteúdos são gratuitos?</h3><p>Sim, 100% gratuitos e de livre acesso.</p>`
        }
    };

    const current = pages[page] || { titulo: 'Página não encontrada', conteudo: '<p>A página solicitada não existe.</p>' };
    root.innerHTML = `
        <div class="content-page">
            <h1>${current.titulo}</h1>
            ${current.conteudo}
            <hr style="border: 0; border-top: 1px solid var(--border); margin: 30px 0;">
            <a href="#home" class="btn-secondary">&larr; Voltar para a Página Inicial</a>
        </div>
    `;
}

// LGPD Consent Manager
function initCookieBanner() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.innerHTML = `
            <p>Utilizamos cookies para melhorar sua experiência de navegação e exibir anúncios personalizados em conformidade com a LGPD. Você pode gerenciar ou recusar a qualquer momento.</p>
            <div class="cookie-buttons">
                <button class="btn-primary" onclick="acceptCookies()">Aceitar Todos</button>
                <button class="btn-secondary" onclick="rejectCookies()">Recusar</button>
            </div>
        `;
        document.body.appendChild(banner);
    } else if (consent === 'accepted') {
        enableAds();
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'accepted');
    removeCookieBanner();
    enableAds();
}

function rejectCookies() {
    localStorage.setItem('cookieConsent', 'rejected');
    removeCookieBanner();
}

function removeCookieBanner() {
    const banner = document.getElementById('cookie-banner');
    if (banner) banner.remove();
}

function enableAds() {
    const topAd = document.getElementById('adsense-top-container');
    const articleAd = document.getElementById('adsense-article-slot');
    if (topAd) topAd.style.display = 'block';
    if (articleAd) articleAd.style.display = 'block';
}

function checkAndDisplayAds() {
    if (localStorage.getItem('cookieConsent') === 'accepted') {
        enableAds();
    }
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
