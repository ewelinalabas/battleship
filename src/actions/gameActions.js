import { getField, validateMove } from '../lib/board'

const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP';
const CONFIRM_SHIP_SELECTION = 'CONFIRM_SHIP_SELECTION';
const REVEAL_BOARD = 'REVEAL_BOARD';
const ENTER_BATTLE_PHASE = 'ENTER_BATTLE_PHASE';
const SHOOT_FIELD = 'SHOOT_FIELD';

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
})

export const selectShip = value => ({
  type: SELECT_SHIP,
  value
})

export const confirmShipSelection = () => ({
  type: CONFIRM_SHIP_SELECTION
})

export const revealBoard = () => ({
  type: REVEAL_BOARD
})

export const enterBattlePhase = () => ({
  type: ENTER_BATTLE_PHASE
})

export const shoot = (row, col) => ({
  type: SHOOT_FIELD,
  row,
  col
})