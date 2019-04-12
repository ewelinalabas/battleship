import { getField, findAllEmptyNeighbours } from '../lib/board';
import { board } from './boardFixedValue';

const buildBoard = () => {
  let board = []
  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      board.push({ row, col, value: null })
    }
  }
  return board
}

const initialState = {
  showBoard: false,
  game: {
    board: board,
    shootingBoard: buildBoard(),
    battlePhase: false,
    selectedShip: null,
    selectedFields: [],
    shipsCounter: {
      "4": 0,
      "3": 0,
      "2": 0,
      "1": 0
    }
  }
}

const updateField = (row, col, value, state) => {
  const newBoard = JSON.parse(JSON.stringify(state.game.board));
  getField(newBoard, row, col).value = value
  let newSelectedFields
  let selectedFields = JSON.parse(JSON.stringify(state.game.selectedFields));
  if(value !== "X") {
    newSelectedFields = selectedFields.filter(field => !(field.row === row && field.col === col))
  } else {
    selectedFields.push({row, col})
    newSelectedFields = selectedFields
  }

  return {...state, game: {...state.game, board: newBoard, selectedFields: newSelectedFields}}
}

const updateAvailableShips = state => {
  const newGame = JSON.parse(JSON.stringify(state.game));
  newGame.shipsCounter[newGame.selectedShip] -= 1
  const firtsAvailable = Object.keys(newGame.shipsCounter).filter(key => newGame.shipsCounter[key] > 0)[0]

  const newBoard = JSON.parse(JSON.stringify(newGame.board));
  newGame.selectedFields.forEach(el => {
    findAllEmptyNeighbours(newBoard, el.row, el.col).forEach(n => {
      getField(newBoard, n.row, n.col).value = "#"
    })
  })

  return {...state, game: {...state.game, board: newBoard, selectedShip: firtsAvailable, selectedFields: [], shipsCounter: newGame.shipsCounter}}
}

const shootField = (row, col, state) => {
  const newshootingBoard = JSON.parse(JSON.stringify(state.game.shootingBoard));
  const isHit = getField(state.game.board, row, col).value === 'X' ? 'H' : '.'
  getField(newshootingBoard, row, col).value = isHit

  return {...state, game: {...state.game, shootingBoard: newshootingBoard}}
}

export const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_BOARD':
      return updateField(action.row, action.col, action.value, state);
    case 'SELECT_SHIP':
      return {...state, game: {...state.game, selectedShip: action.value}};
    case 'CONFIRM_SHIP_SELECTION':
      return updateAvailableShips(state);
    case 'REVEAL_BOARD':
        return {...state, showBoard: true};
    case 'ENTER_BATTLE_PHASE':
        return {...state, game: {...state.game, battlePhase: true}};
    case 'SHOOT_FIELD':
        return shootField(action.row, action.col, state)
    default:
      return state;
  }
}