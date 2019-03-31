export const getField = (board, row, col) => {
  return board.filter(field => field.row === row && field.col === col)[0]
}