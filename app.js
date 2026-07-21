// Elementos de navegação
const menuItems = document.querySelectorAll('.sidebar-nav li[data-section]');
const breadcrumb = document.getElementById('breadcrumb-current');
const pageContent = document.getElementById('page-content');

// Conteúdos simples para iniciar (você pode evoluir com conteúdo real)
const pages = {
  dashboard: `
    <h2>Dashboard</h2>
    <div class="card">
      <p>Total de artigos: 12</p>
      <p>Artigos publicados: 8</p>
      <p>Rascunhos: 4</p>
    </div>
    <div class="card">
      <h3>Últimos artigos</h3>
      <ul>
        <li>Como investir aos 40 anos</li>
        <li>Entendendo a renda variável</li>
        <li>Planejamento financeiro simples</li>
      </ul>
    </div>
  `,
  artigos: `
    <h2>Gerenciar Artigos</h2>
    <div class="card">
      <p>Editar, criar, filtrar e publicar seus artigos.</p>
      <!-- Futuro: carregar editor rico e lista com filtros aqui -->
    </div>
  `,
  categorias: `
    <h2>Gerenciar Categorias</h2>
    <div class="card">
      <p>Organize as categorias do seu site.</p>
    </div>
  `,
  autores: `
    <h2>Gerenciar Autores</h2>
    <div class="card">
      <p>Gerencie quem escreve para o portal.</p>
    </div>
  `,
  newsletter: `
    <h2>Newsletter</h2>
    <div class="card">
      <p>Gerencie assinantes e campanhas.</p>
    </div>
  `,
  comentarios: `
    <h2>Comentários</h2>
    <div class="card">
      <p>Modere comentários do site.</p>
    </div>
  `,
  seo: `
    <h2>SEO</h2>
    <div class="card">
      <p>Otimize seu conteúdo para mecanismos de busca.</p>
    </div>
  `,
  ferramentas: `
    <h2>Ferramentas</h2>
    <div class="card">
      <p>Utilitários e integrações.</p>
    </div>
  `,
  midia: `
    <h2>Mídia</h2>
    <div class="card">
      <p>Gerenciador de arquivos e imagens.</p>
    </div>
  `,
  configuracoes: `
    <h2>Configurações</h2>
    <div class="card">
      <p>Personalize o funcionamento do portal.</p>
    </div>
  `,
  backup: `
    <h2>Backup</h2>
    <div class="card">
      <p>Faça cópias de segurança dos dados.</p>
    </div>
  `,
  sair: `
    <h2>Sair</h2>
    <div class="card">
      <p>Você realizou logout com sucesso.</p>
    </div>
  `
};

// Função para atualizar a seção principal
function loadPage(section) {
  if (!pages[section]) return;
  // Atualiza conteúdo
  pageContent.innerHTML = pages[section];
  // Atualiza breadcrumb
  breadcrumb.textContent = 
    section.charAt(0).toUpperCase() + section.slice(1);
  // Atualiza active no menu
  menuItems.forEach(item => {
    item.classList.toggle('active', item.dataset.section === section);
  });
}

// Eventos para navegação
menuItems.forEach(item => {
  item.addEventListener('click', () => {
    loadPage(item.dataset.section);
  });
});

// Carrega dashboard inicial
loadPage('dashboard');
