import { getField, isEmptyBoard, isAlreadyMarked } from '../lib/board'

const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP';
const CONFIRM_SHIP_SELECTION = 'CONFIRM_SHIP_SELECTION';

const validateIfNeighbour = (row, col, selectedFields) => {
  const ifNeighbours = selectedFields.map(f => {
    return (row === f.row + 1) || (row === f.row - 1) || (col === f.col + 1) || (col === f.col - 1)
  })
  return ifNeighbours.filter(el => el === true).length > 0
}

const validateIfInline = (row, col, selectedFields) => {
  const rows = selectedFields.filter(f => f.row === row).length === selectedFields.length
  const cols = selectedFields.filter(f => f.col === col).length === selectedFields.length
  return (rows && !cols) || (!rows && cols) || (rows && cols)
}

const validateNumberOfSelectedFields = (game) => {
  const selectedShipLimit = Number(game.selectedShip)
  const selectedFieldsCount = game.selectedFields.length

  return (selectedFieldsCount < selectedShipLimit)
}

const validateUnchecking = (row, col, game) => {
  return game.selectedFields.some(el => (el.row === row && el.col === col))
}

const validateChecking = (row, col, game) => {
  if (game.selectedShip && game.selectedFields.length === 0) return true

  const validate =  validateNumberOfSelectedFields(game)
    && validateIfNeighbour(row, col, game.selectedFields)
    && validateIfInline(row, col, game.selectedFields)
    return validate;
}

const isCheckingAction = (row, col, game) => {
  if(isAlreadyMarked(game.board, row, col)) return false
 return !game.selectedFields.some(el => (el.row === row && el.col === col))
}

const validateMove = (row, col, game) => {
  if (game.selectedShip && isEmptyBoard(game.board)) return true
  const checking_action = isCheckingAction(row, col, game)
  return checking_action ? validateChecking(row, col, game) : validateUnchecking(row, col, game)
}

export const makeDecision = (row, col) => {
  return (dispatch, getState) => {
    const { game } = getState();

    if (validateMove(row, col, game)) {
      const value = getField(game.board, row, col).value ? null : "X"
      dispatch(updateBoard(row, col, value))
    }
  }
}

const updateBoard = (row, col, value) => ({
  type: UPDATE_BOARD,
  row,
  col,
  value
}
)

export const selectShip = value => ({
  type: SELECT_SHIP,
  value
})

export const confirmShipSelection = () => ({
  type: CONFIRM_SHIP_SELECTION
})