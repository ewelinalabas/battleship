const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP'; 

export const makeDecision = (row, col) => {
  return updateBoard(row, col)
}

const updateBoard = (row, col) => ({
    type: UPDATE_BOARD,
    row,
    col,
    value: 'X'
  }
)

export const selectShip = value => ({
  type: SELECT_SHIP,
  value
})