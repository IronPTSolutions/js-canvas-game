document.addEventListener('DOMContentLoaded', () => {
  const panelStart = document.querySelector('.panel-start')
  const panelEnd = document.querySelector('.panel-end');
  const canvasGame = document.querySelector('canvas');

  const game = new Game('main-canvas', () => {
    canvasGame.classList.add('hide');
    panelEnd.classList.remove('hide');
  });

  const btnStart = panelStart.querySelector('.btn');
  btnStart.addEventListener('click', () => {
    panelStart.classList.add('hide');
    canvasGame.classList.remove('hide');
    game.start();
  });

  const btnEnd = panelEnd.querySelector('.btn');
  btnEnd.addEventListener('click', () => location.reload());
});