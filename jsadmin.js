// Lógica do Painel Administrativo

const formArtigo = document.getElementById('form-artigo');
const listaArtigos = document.getElementById('lista-artigos');

// Busca artigos do LocalStorage
function getArtigos() {
    return JSON.parse(localStorage.getItem('db_artigos')) || [];
}

// Salva artigos no LocalStorage
function saveArtigos(artigos) {
    localStorage.setItem('db_artigos', JSON.stringify(artigos));
    renderLista();
}

// Renderiza lista de gerenciamento
function renderLista() {
    const artigos = getArtigos();
    let html = '<h2>Artigos Publicados</h2>';
    
    if(artigos.length === 0) {
        html += '<p>Nenhum artigo encontrado.</p>';
    } else {
        artigos.forEach(a => {
            html += `
                <div class="admin-item">
                    <div>
                        <strong>${a.titulo}</strong> <br>
                        <small>${a.slug}</small>
                    </div>
                    <div>
                        <button class="btn-danger" onclick="excluirArtigo('${a.id}')">Excluir</button>
                    </div>
                </div>
            `;
        });
    }
    listaArtigos.innerHTML = html;
}

// Adicionar Artigo
formArtigo.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const artigos = getArtigos();
    
    const novoArtigo = {
        id: Date.now().toString(),
        titulo: document.getElementById('titulo').value,
        slug: document.getElementById('slug').value,
        categoriaId: document.getElementById('categoriaId').value,
        metaDescription: document.getElementById('metaDesc').value,
        dataPublicacao: new Date().toISOString().split('T')[0],
        autor: "Equipe PlenoFuturo",
        conteudo: document.getElementById('conteudo').value,
        tags: []
    };

    artigos.push(novoArtigo);
    saveArtigos(artigos);
    formArtigo.reset();
    alert('Artigo salvo com sucesso! Já está visível na Home.');
});

// Excluir Artigo (disponibilizado no escopo global para o botão inline)
window.excluirArtigo = function(id) {
    if(confirm('Tem certeza que deseja excluir?')) {
        let artigos = getArtigos();
        artigos = artigos.filter(a => a.id !== id);
        saveArtigos(artigos);
    }
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Garante que o DB inicial seja carregado caso o LocalStorage esteja vazio
    if(!localStorage.getItem('db_artigos')) {
        fetch('data/artigos.json')
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('db_artigos', JSON.stringify(data));
                renderLista();
            });
    } else {
        renderLista();
    }
});