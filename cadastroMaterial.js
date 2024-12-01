/** @format */

document
  .getElementById('materialForm')
  .addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o envio tradicional do formulário

    const formData = new FormData();
    // Adicionando campos de texto
    formData.append('nome', document.getElementById('nome').value);
    formData.append('disciplina', document.getElementById('disciplina').value);
    formData.append('professor', document.getElementById('professor').value);
    formData.append('semestre', document.getElementById('semestre').value);
    formData.append('descricao', document.getElementById('descricao').value);
    formData.append('link', document.querySelector('input[name="link"]').value);

    // Adicionando checkboxes (tipos e cursos)
    const tipos = document.querySelectorAll('input[name="tipo"]:checked');
    tipos.forEach((tipo) => formData.append('tipo', tipo.value));

    const cursos = document.querySelectorAll('input[name="curso"]:checked');
    cursos.forEach((curso) => formData.append('curso', curso.value));

    // Adicionando o arquivo
    const arquivo = document.getElementById('meuArquivo').files[0];
    if (arquivo) {
      formData.append('arquivo', arquivo);
    }

    // Recupera o token do localStorage (ou sessionStorage)
    const token = localStorage.getItem('authToken'); // Certifique-se de armazenar o token ao fazer login

    if (!token) {
      console.error('Token não encontrado. O usuário precisa estar logado.');
      alert('Você precisa estar logado para realizar o cadastro.');
      return; // Impede o envio se não houver token
    }

    // Enviar os dados para a API
    fetch('http://127.0.0.1:8000/backend/api/materiais/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // Use o prefixo 'Bearer' para o token JWT
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message); // Exibe a mensagem de sucesso
      })
      .catch((error) => {
        console.error('Erro:', error);
        alert('Ocorreu um erro ao cadastrar o material.');
      });
  });
