/** @format */

const API_BASE_URL = 'http://127.0.0.1:8000/backend/api'; // Substitua pela URL correta
const disciplinaId = new URLSearchParams(window.location.search).get('id'); // Obtém o ID da disciplina pela URL
const tipoMaterial = new URLSearchParams(window.location.search).get('tipo'); // Obtém o tipo de material (Provas, Listas ou Projetos)

const disciplinaNome = document.getElementById('disciplinaNome');
const materiaisTableBody = document.getElementById('materiaisTableBody');
const descricaoMaterial = document.getElementById('descricaoMaterial');

// Função para obter o token de autenticação (supondo que ele esteja armazenado no localStorage)
const token = localStorage.getItem('authToken'); // ou sessionStorage.getItem('authToken')

// Verificação se o token existe
if (!token) {
  console.error('Token de autenticação não encontrado.');
  // Opcional: Redirecionar o usuário para a página de login
  window.location.href = 'login.html'; // Substitua pelo caminho correto da página de login
}

// Função para buscar materiais da API (Provas, Listas ou Projetos)
async function fetchMateriais() {
  try {
    // A requisição é feita apenas se o token for válido
    if (!token) {
      throw new Error('Token de autenticação não encontrado.');
    }

    const response = await fetch(
      `${API_BASE_URL}/disciplinas/${disciplinaId}/${tipoMaterial}/`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Envia o token no cabeçalho
          'Content-Type': 'application/json', // Cabeçalho para indicar o tipo de conteúdo
        },
      }
    );

    if (!response.ok) {
      // Se a resposta não for OK, mostra um erro específico
      throw new Error(`Erro ao carregar materiais: ${response.statusText}`);
    }

    const data = await response.json();
    disciplinaNome.textContent = data.nome;

    // Limpa a tabela antes de adicionar novos itens
    materiaisTableBody.innerHTML = '';

    // Insere os materiais na tabela
    data.materiais.forEach((material) => {
      const row = document.createElement('tr');

      const tdNome = document.createElement('td');
      tdNome.textContent = material.nome;
      row.appendChild(tdNome);

      const tdProfessor = document.createElement('td');
      tdProfessor.textContent = material.professor;
      row.appendChild(tdProfessor);

      const tdSemestre = document.createElement('td');
      tdSemestre.textContent = material.semestre;
      row.appendChild(tdSemestre);

      const tdAcoes = document.createElement('td');
      const btnDescricao = document.createElement('button');
      btnDescricao.classList.add('btn', 'btn-link', 'text-white');
      btnDescricao.setAttribute('data-bs-toggle', 'modal');
      btnDescricao.setAttribute('data-bs-target', '#confirmModal');
      btnDescricao.innerHTML = '<i class="bi bi-info-circle"></i>';
      btnDescricao.addEventListener('click', () => {
        descricaoMaterial.textContent =
          material.descricao || 'Sem descrição disponível.';
      });
      tdAcoes.appendChild(btnDescricao);

      const btnDownload = document.createElement('a');
      btnDownload.classList.add('btn', 'btn-link', 'text-white');
      btnDownload.setAttribute('href', material.link);
      btnDownload.setAttribute('download', '');
      btnDownload.target = '_blank';
      btnDownload.innerHTML = '<i class="bi bi-download"></i>';
      tdAcoes.appendChild(btnDownload);

      const btnDenunciar = document.createElement('button');
      btnDenunciar.classList.add('btn', 'btn-link', 'text-white');
      btnDenunciar.setAttribute('data-bs-toggle', 'modal');
      btnDenunciar.setAttribute('data-bs-target', '#denunciarModal');
      btnDenunciar.innerHTML = '<i class="bi bi-flag"></i>';
      tdAcoes.appendChild(btnDenunciar);

      row.appendChild(tdAcoes);
      materiaisTableBody.appendChild(row);
    });
  } catch (error) {
    console.error(error);
    disciplinaNome.textContent = 'Erro ao carregar disciplina';
  }
}

// Carrega os materiais da API ao abrir a página
fetchMateriais();
