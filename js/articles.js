// articles.js - Gestão dos artigos, filtro e renderização

const Articles = (() => {
    // Base de dados de artigos (exemplo simplificado)
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
                cargo: 'Planejador Financeiro CFP®',
                bio: 'Atua há mais de 15 anos auxiliando famílias na estruturação de patrimônio e transição segura.'
            },
            conteudo: `...`
        },
        // outros artigos...
    ];

    // Renderiza cards de artigos
    const renderArticleCards = (list) => {
        if (!list.length) return '<p style="color: var(--text-secondary);">Nenhum artigo encontrado.</p>';

        return list.map(art => `
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
        `).join('');
    };

    // Filtra artigos por termo de busca
    const filterArticles = (query) => {
        return artigosDB.filter(art =>
            art.titulo.toLowerCase().includes(query.toLowerCase()) ||
            art.resumo.toLowerCase().includes(query.toLowerCase())
        );
    };

    // Filtra artigos por categoria
    const filterByCategory = (cat) => {
        if (cat === 'Todos') return artigosDB;
        return artigosDB.filter(art => art.categoria === cat);
    };

    return {
        artigosDB,
        renderArticleCards,
        filterArticles,
        filterByCategory
    };
})();
