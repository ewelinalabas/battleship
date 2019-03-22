const UPDATE_BOARD = 'UPDATE_BOARD';

export const updateBoard = (row, col) => {
  return {
    type: UPDATE_BOARD,
    row,
    col,
    value: 'X'
  }
}