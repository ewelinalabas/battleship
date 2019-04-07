export const getField = (board, row, col) => {
  return board.filter(field => field.row === row && field.col === col)[0]
}

export const isEmptyBoard = board => {
 return board.filter(field => field.value).length === 0
}

export const isAlreadyMarked = (board, row, col) => (
  getField(board, row, col).value
)

export const findAllEmptyNeighbours = (board, row, col) => {
  let neighbours = []
  for(let i = col - 1; i <= col + 1; i++) {
    for(let j = row - 1; j <= row + 1; j++){
      neighbours.push(getField(board, j, i))
    }
  }
  return neighbours.filter(f => !f.value).filter(f => !(f.row === row && f.col === col))
}