const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP'; 

export const makeDecision = (row, col) => {
  return (dispatch, getState) => {
    const selectedShipLimit = Number(getState().game.selectedShip)
    const selectedFieldsCount = getState().game.selectedFields.length
    
    if(selectedFieldsCount < selectedShipLimit) {
      dispatch(updateBoard(row, col))
    }
  }
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