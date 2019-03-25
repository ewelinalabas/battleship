const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP'; 

export const updateBoard = (row, col) => {
  return {
    type: UPDATE_BOARD,
    row,
    col,
    value: 'X'
  }
}

export const selectShip = value => ({
  type: SELECT_SHIP,
  value
})