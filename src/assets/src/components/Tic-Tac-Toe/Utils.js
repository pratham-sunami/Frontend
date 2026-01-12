export const isWinner = (board) => {
  //checking for rows
  for (let i = 0; i < board.length; i++) {
    let symbol = board[i][0];

    if (symbol) {
      let isWinner = true;
      for (let j = 1; j < board.length; j++) {
        if (board[i][j] !== symbol) {
          isWinner = false;
          break;
        }
      }
      if (isWinner) {
        return symbol;
      }
    }
  }

  // Top-left to bottom-right
  let diagonal1 = board[0][0];
  let win1 = true;
  if (diagonal1) {
    for (let i = 1; i < board.length; i++) {
      if (board[i][i] !== diagonal1) {
        win1 = false;
        break;
      }
    }
    if (win1) return diagonal1;
  }

  // Top-right to bottom-left
  let diagonal2 = board[0][board.length - 1];
  let win2 = true;
  if (diagonal2) {
    for (let i = 1; i < board.length; i++) {
      if (board[i][board.length - i - 1] !== diagonal2) {
        win2 = false;
        break;
      }
    }
    if (win2) return diagonal2;
  }

  //checking for columns
  for (let i = 0; i < board.length; i++) {
    let symbol = board[0][i];

    if (symbol) {
      let isWinner = true;
      for (let j = 1; j < board.length; j++) {
        if (board[j][i] !== symbol) {
          isWinner = false;
          break;
        }
      }
      if (isWinner) return symbol;
    }
  }
};
