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
});
