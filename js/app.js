// Motor da Single Page Application (SPA) e Gerenciador de Dados

const appRoot = document.getElementById('app-root');
const menuCategorias = document.getElementById('menu-categorias');

// 1. Gerenciamento de Tema (Dark/Light)
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggleBtn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
});

// 2. Camada de Dados (LocalStorage Fallback)
async function fetchData(entity) {
    // Tenta pegar do LocalStorage primeiro (onde o admin salva)
    const localData = localStorage.getItem(`db_${entity}`);
    if (localData) {
        return JSON.parse(localData);
    }
    // Se não tiver, busca os JSONs iniciais (para GitHub Pages inicial)
    try {
        const response = await fetch(`data/${entity}.json`);
        const data = await response.json();
        // Salva no LocalStorage para uso futuro
        localStorage.setItem(`db_${entity}`, JSON.stringify(data));
        return data;
    } catch (error) {
        console.error(`Erro ao carregar ${entity}:`, error);
        return [];
    }
}

// 3. Renderização de UI
async function renderMenu() {
    const categorias = await fetchData('categorias');
    menuCategorias.innerHTML = categorias.map(cat => 
        `<li><a href="#" onclick="router('categoria', '${cat.slug}')">${cat.nome}</a></li>`
    ).join('');
}

async function renderHome() {
    const artigos = await fetchData('artigos');
    let html = `<h1 style="margin-top: 20px;">Últimos Artigos</h1><div class="article-grid">`;
    
    artigos.reverse().forEach(artigo => {
        html += `
            <article class="card">
                <div class="card-tag">${artigo.categoriaId}</div>
                <h2><a href="#" onclick="router('artigo', '${artigo.slug}')">${artigo.titulo}</a></h2>
                <p>${artigo.metaDescription}</p>
            </article>
        `;
    });
    html += `</div>`;
    appRoot.innerHTML = html;
}

async function renderArtigo(slug) {
    const artigos = await fetchData('artigos');
    const artigo = artigos.find(a => a.slug === slug);
    
    if (!artigo) {
        appRoot.innerHTML = `<h1>404 - Artigo não encontrado</h1>`;
        return;
    }

    // Atualiza Meta Tags SEO
    document.title = `${artigo.titulo} | PlenoFuturo`;
    document.querySelector('meta[name="description"]').setAttribute("content", artigo.metaDescription);

    appRoot.innerHTML = `
        <article class="article-single">
            <h1>${artigo.titulo}</h1>
            <div style="margin-bottom: 20px; color: var(--ad-text); font-size: 0.9rem;">
                Por ${artigo.autor} | ${artigo.dataPublicacao}
            </div>
            
            <div class="adsense-placeholder">Espaço Publicitário In-Article (AdSense)</div>
            
            <div class="article-content">
                ${artigo.conteudo}
            </div>
            
            <div class="adsense-placeholder">Espaço Publicitário Bottom (AdSense)</div>
        </article>
    `;
    window.scrollTo(0,0);
}

async function renderCategoria(slug) {
    const artigos = await fetchData('artigos');
    const filtrados = artigos.filter(a => a.categoriaId === slug);
    
    let html = `<h1 style="margin-top: 20px;">Categoria: ${slug.toUpperCase()}</h1><div class="article-grid">`;
    filtrados.forEach(artigo => {
        html += `
            <article class="card">
                <h2><a href="#" onclick="router('artigo', '${artigo.slug}')">${artigo.titulo}</a></h2>
                <p>${artigo.metaDescription}</p>
            </article>
        `;
    });
    html += `</div>`;
    appRoot.innerHTML = html;
}

// 4. Roteador Simples Vanilla
window.router = function(view, param = null) {
    switch(view) {
        case 'home': renderHome(); document.title = "PlenoFuturo - Longevidade e Finanças"; break;
        case 'artigo': renderArtigo(param); break;
        case 'categoria': renderCategoria(param); break;
        default: renderHome();
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    router('home');
});
