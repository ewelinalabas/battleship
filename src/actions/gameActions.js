import { getField, validateMove, validateShipConfirmation } from '../lib/board'

const UPDATE_BOARD = 'UPDATE_BOARD';
const SELECT_SHIP = 'SELECT_SHIP';
const CONFIRM_SHIP_SELECTION = 'CONFIRM_SHIP_SELECTION';
const REVEAL_BOARD = 'REVEAL_BOARD';
const END_TURN = 'END_TURN';
const ENTER_BATTLE_PHASE = 'ENTER_BATTLE_PHASE';
const SHOOT_FIELD = 'SHOOT_FIELD';

export const makeDecision = (row, col) => {
  return (dispatch, getState) => {
    const state = getState();
    const game = state[state.currentPlayer]

    if (validateMove(row, col, game)) {
      const value = getField(game.board, row, col).value ? null : "X"
      dispatch(updateBoard(row, col, value))
    }
  }
}

export const confirmShipSelection = () => {
  return (dispatch, getState) => {
    const state = getState();
    const game = state[state.currentPlayer]

    if (validateShipConfirmation(game.selectedShip, game.selectedFields)) {
      dispatch(confirmSelection())
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

const confirmSelection = () => ({
  type: CONFIRM_SHIP_SELECTION
})

export const revealBoard = () => ({
  type: REVEAL_BOARD
})

export const endCurrentPlayerTurn = () => ({
  type: END_TURN
})

export const enterBattlePhase = () => ({
  type: ENTER_BATTLE_PHASE
})

export const shoot = (row, col) => ({
  type: SHOOT_FIELD,
  row,
  col
})