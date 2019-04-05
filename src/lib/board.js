export const getField = (board, row, col) => {
  return board.filter(field => field.row === row && field.col === col)[0]
}

export const isEmptyBoard = board => {
 return board.filter(field => field.value).length === 0
}

export const isAlreadyMarked = (board, row, col) => (
  getField(board, row, col).value
)