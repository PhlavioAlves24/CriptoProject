let valoresAnteriores = {
  aave: 'Carregando...',
  solana: 'Carregando...',
  ethereum: 'Carregando...',
  bitcoin: 'Carregando...',
  ripple: 'Carregando...', // Nova criptomoeda
  cardano: 'Carregando...', // Nova criptomoeda
  dogecoin: 'Carregando...', // Nova criptomoeda
  litecoin: 'Carregando...', // Nova criptomoeda
};

function obterCotacao(criptomoeda, elementoId) {
  fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${criptomoeda}&vs_currencies=brl`)
    .then(response => response.json())
    .then(data => {
      const preco = data[criptomoeda] ? data[criptomoeda].brl : undefined;
      const elemento = document.getElementById(elementoId);

      if (preco !== undefined) {
        elemento.innerText = `${criptomoeda.charAt(0).toUpperCase() + criptomoeda.slice(1)}: R$${preco.toFixed(2)}`;
        valoresAnteriores[criptomoeda] = elemento.innerText;
      } else {
        elemento.innerText = valoresAnteriores[criptomoeda];
      }

      // Adiciona ou remove classe para borda vermelha
      if (preco < 300) { // Você pode ajustar este valor conforme necessário para cada criptomoeda
        elemento.classList.add('low-price');
      } else {
        elemento.classList.remove('low-price');
      }
    })
    .catch(error => {
      console.error(`Erro ao obter dados para ${criptomoeda}: ${error}`);
      document.getElementById(elementoId).innerText = valoresAnteriores[criptomoeda];
    });
}

function atualizarValores() {
  obterCotacao('aave', 'aave');
  obterCotacao('solana', 'solana');
  obterCotacao('ethereum', 'ethereum');
  obterCotacao('bitcoin', 'bitcoin');
  obterCotacao('ripple', 'ripple'); // Nova criptomoeda
  obterCotacao('cardano', 'cardano'); // Nova criptomoeda
  obterCotacao('dogecoin', 'dogecoin'); // Nova criptomoeda
  obterCotacao('litecoin', 'litecoin'); // Nova criptomoeda
}

// Chama a função uma vez para exibir os valores iniciais
atualizarValores();

// Atualiza a cada 7 segundos
setInterval(atualizarValores, 7000);

// Adiciona evento de clique às divs (usando delegação de eventos)
document.querySelector('.crypto-cards').addEventListener('click', (event) => {
  const targetId = event.target.id;
  // Verifica se o ID do elemento clicado é uma das criptomoedas que estamos monitorando
  if (targetId && valoresAnteriores.hasOwnProperty(targetId)) {
    obterCotacao(targetId, targetId);
  }
});

// Lógica para alternar o modo claro/escuro
const modeSwitch = document.getElementById('modeSwitch');
const body = document.body;

modeSwitch.addEventListener('change', () => {
  body.classList.toggle('light-mode', modeSwitch.checked);
});