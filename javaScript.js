/** @format */

// Botão de buscar arquivos.
const buscarBtn = document.querySelector('.buscar-btn');
const meuArquivo = document.getElementById('meuArquivo');

buscarBtn.addEventListener('click', () => {
  meuArquivo.click();
});

document.getElementById('confirmSave').addEventListener('click', function () {
  // Aqui você pode colocar a ação de salvar os dados
  // Fechar o modal após salvar
  var modal = bootstrap.Modal.getInstance(
    document.getElementById('confirmModal')
  );
  modal.hide();
  alert('Dados salvos com sucesso!');
  location.reload();
});
document.getElementById('downloadBtn').onclick = function () {
  // Criar um link para o arquivo
  const link = document.createElement('a');
  link.href = 'Documentos/IConline/Prova-AB1.txt'; // Substitua pelo caminho real do seu arquivo
  link.download = 'Prova-AB1.txt'; // Nome do arquivo a ser baixado

  // Adicionar o link ao documento e simular o clique
  document.body.appendChild(link);
  link.click();

  // Remover o link do documento
  document.body.removeChild(link);
};
