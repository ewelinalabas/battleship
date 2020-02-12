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
      let field = getField(board, j, i)
      if(field) {neighbours.push(field)}
    }
  }
  return neighbours.filter(f => !f.value).filter(f => !(f.row === row && f.col === col))
}

export const validateIfShipSunk = ships => {
  let destroyedShip
  ships.forEach(ship => {
    if(ship.isDestroyed === false && 
      ship.fields.filter(el => el.isHit === false).length === 0) {
      destroyedShip = ship
    }
  })
  return destroyedShip
}

export const findDestroyedShipNeighbours = (ships, shootingBoard) => {
  let neighbours = []
  ships.forEach(ship => {
    if(ship.isDestroyed === true) {
      ship.fields.forEach(el => {
        neighbours.push(findAllEmptyNeighbours(shootingBoard, el.row, el.col))
      })
    }
  })
  return neighbours.flat()
}

export const validateGameEnd = ships => {
  if(ships.filter(ship => ship.isDestroyed === false).length === 0) {
    return true
  }
}

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

export const validateMove = (row, col, game) => {
  if (game.selectedShip && isEmptyBoard(game.board)) return true
  const checking_action = isCheckingAction(row, col, game)
  return checking_action ? validateChecking(row, col, game) : validateUnchecking(row, col, game)
}

export const validateShipConfirmation = (selectedShip, selectedFields) => (
  parseInt(selectedShip, 10) === selectedFields.length
);