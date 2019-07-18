import { 
  getField, 
  findAllEmptyNeighbours, 
  validateIfShipSunk,
  findDestroyedShipNeighbours,
  validateGameEnd } from '../lib/board';
import { fixedState } from './boardFixedValue';

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
  showBoard: true,
  currentPlayer: "player1",
  battlePhase: false,
  player1: {
    board: buildBoard(),
    shootingBoard: buildBoard(),
    selectedShip: "1",
    ships: [],
    selectedFields: [],
    shootedFields: [],
    message: "",
    shipsCounter: {
      "4": 1,
      "3": 2,
      "2": 3,
      "1": 4
    }
  },
  player2: {
    board: buildBoard(),
    shootingBoard: buildBoard(),
    selectedShip: "1",
    ships: [],
    selectedFields: [],
    shootedFields: [],
    message: "",
    shipsCounter: {
      "4": 1,
      "3": 2,
      "2": 3,
      "1": 4
    }
  }
}

//const initialState = fixedState

const updateField = (row, col, value, state) => {
  const newBoard = JSON.parse(JSON.stringify(state[state.currentPlayer].board));
  getField(newBoard, row, col).value = value
  let newSelectedFields
  let selectedFields = JSON.parse(JSON.stringify(state[state.currentPlayer].selectedFields));
  if (value !== "X") {
    newSelectedFields = selectedFields.filter(field => !(field.row === row && field.col === col))
  } else {
    selectedFields.push({ row, col })
    newSelectedFields = selectedFields
  }

  return { ...state, [state.currentPlayer]: { ...state[state.currentPlayer], board: newBoard, selectedFields: newSelectedFields } }
}

const updateAvailableShips = state => {
  const newGame = JSON.parse(JSON.stringify(state[state.currentPlayer]));
  newGame.shipsCounter[newGame.selectedShip] -= 1
  const firtsAvailable = Object.keys(newGame.shipsCounter).filter(key => newGame.shipsCounter[key] > 0)[0]

  const newBoard = JSON.parse(JSON.stringify(newGame.board));
  newGame.selectedFields.forEach(el => {
    findAllEmptyNeighbours(newBoard, el.row, el.col).forEach(n => {
      getField(newBoard, n.row, n.col).value = "#"
    })
  })

  newGame.ships.push({ 
    type: newGame.selectedShip, 
    isDestroyed: false, 
    fields: newGame.selectedFields.map(el => ({...el, isHit: false}))
  })

  return {
    ...state,
    [state.currentPlayer]: {
      ...state[state.currentPlayer],
      board: newBoard,
      selectedShip: firtsAvailable,
      ships: newGame.ships,
      selectedFields: [],
      shipsCounter: newGame.shipsCounter
    }
  }
}

const changePlayer = state => {
  return state.currentPlayer === "player1" ? { ...state, currentPlayer: "player2" } : { ...state, currentPlayer: "player1" }
}

const shootField = (row, col, state) => {
  const newshootingBoard = JSON.parse(JSON.stringify(state.game.shootingBoard));
  const isHit = getField(state.game.board, row, col).value === 'X' ? 'H' : '.'
  getField(newshootingBoard, row, col).value = isHit

  let shootedFields = JSON.parse(JSON.stringify(state.game.shootedFields));
  let ships = JSON.parse(JSON.stringify(state.game.ships));
  let newMessage = "You missed."

  if (isHit === 'H') {
    shootedFields.push({ row, col })
    const field = ships.map(ship => ship.fields).flat().find(el => (el.row === row && el.col === col))
    field.isHit = true
    newMessage = "You hit a battleship! Take next shot."
    let validatedShip = validateIfShipSunk(ships)
    if(validatedShip) {
      validatedShip.isDestroyed = true
      newMessage = "You sank the battleship! Take next shot."
    }
    findDestroyedShipNeighbours(ships, newshootingBoard).forEach(el => {
      newshootingBoard.find(f => f.row === el.row && f.col === el.col).value = "."
    })
    validateGameEnd(ships)
  }

  return { ...state, game: { ...state.game, message: newMessage, shootingBoard: newshootingBoard, ships, shootedFields }}
}

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_BOARD':
        return updateField(action.row, action.col, action.value, state);
    case 'SELECT_SHIP':
      return { ...state, game: { ...state.game, selectedShip: action.value } };
    case 'CONFIRM_SHIP_SELECTION':
      return updateAvailableShips(state);
    case 'REVEAL_BOARD':
      return { ...state, showBoard: true };
    case 'END_TURN':
        return changePlayer(state)
    case 'ENTER_BATTLE_PHASE':
      return { ...state, battlePhase: true };
    case 'SHOOT_FIELD':
      return shootField(action.row, action.col, state)
    default:
      return state;
  }
}