import { getField } from '../lib/board'

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
  game: {
    board: buildBoard(),
    selectedShip: "4",
    selectedFields: []
  }
}

const updateField = (row, col, value, state) => {
  const newBoard = JSON.parse(JSON.stringify(state.game.board));
  getField(newBoard, row, col).value = value
  let newSelectedFields
  let selectedFields = JSON.parse(JSON.stringify(state.game.selectedFields));
  if(value != "X") {
    newSelectedFields = selectedFields.filter(field => !(field.row == row && field.col == col))
   } else {
    selectedFields.push({row, col})
    newSelectedFields = selectedFields
   }
  console.log(newSelectedFields)

  return {...state, game: {...state.game, board: newBoard, selectedFields: newSelectedFields}}
}

export const gameReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'UPDATE_BOARD':
      return updateField(action.row, action.col, action.value, state);
    case 'SELECT_SHIP':
      return {...state, game: {...state.game, selectedShip: action.value}};
    case 'CONFIRM_SHIP_SELECTION':
      return {...state, game: {...state.game, selectedFields: []}}
    default:
      return state;
  }
}