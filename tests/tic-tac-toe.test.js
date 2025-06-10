const { JSDOM } = require('jsdom');

describe('TicTacToe AI', () => {
  let checkWin, minimax, cells;

  beforeEach(() => {
    const dom = new JSDOM(`<!DOCTYPE html><div id="board"></div><div id="message"></div><button id="play-again"></button>`);
    global.document = dom.window.document;
    global.window = dom.window;

    // Load script after DOM is set up
    ({ checkWin, minimax, cells } = require('../script.js'));
  });

  afterEach(() => {
    // Reset module cache
    jest.resetModules();
  });

  test('checkWin detects horizontal win', () => {
    cells[0].innerHTML = 'X';
    cells[1].innerHTML = 'X';
    cells[2].innerHTML = 'X';
    expect(checkWin('X')).toBe(true);
  });

  test('minimax chooses winning move for O', () => {
    // Set up a board where O can win by playing index 2
    cells[0].innerHTML = 'O';
    cells[1].innerHTML = 'O';
    // remaining cells empty

    let bestScore = -Infinity;
    let bestMove;
    for (let i = 0; i < cells.length; i++) {
      if (cells[i].innerHTML === '') {
        cells[i].innerHTML = 'O';
        const score = minimax(cells, 0, false);
        cells[i].innerHTML = '';
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    expect(bestMove).toBe(2);
  });
});
