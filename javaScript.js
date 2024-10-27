/** @format */

document.addEventListener("DOMContentLoaded", () => {
    // Botão de buscar arquivos.
    const buscarBtn = document.querySelector('.buscar-btn');
    const meuArquivo = document.getElementById('meuArquivo');

    if (buscarBtn && meuArquivo) {
      buscarBtn.addEventListener('click', () => {
        meuArquivo.click();
      });
    }

    const confirmSave = document.getElementById('confirmSave');
    if (confirmSave) {
      confirmSave.addEventListener('click', function () {
        // Aqui você pode colocar a ação de salvar os dados
        const modal = bootstrap.Modal.getInstance(
          document.getElementById('confirmModal')
        );
        modal.hide();
        alert('Dados salvos com sucesso!');
        location.reload();
      });
    }

    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
      downloadBtn.onclick = function () {
        const link = document.createElement('a');
        link.href = 'Documentos/IConline/Prova-AB1.txt'; // Caminho real do arquivo
        link.download = 'Prova-AB1.txt'; // Nome do arquivo a ser baixado
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };
    }

    // Função para excluir arquivo da lista
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function () {
        const row = this.closest('tr'); // Identifica a linha correspondente
        if (row) row.remove(); // Remove a linha
      });
    });
  });
