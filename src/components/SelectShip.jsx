import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShip, confirmShipSelection, endCurrentPlayerTurn, enterBattlePhase } from '../actions/gameActions';


const SHIPS = {
  "1": "Single-decker",
  "2": "Two-decker",
  "3": "Three-decker",
  "4": "Four-decker"
}
const availableShips = (counter, ships) => {
  return Object
    .keys(counter)
    .filter(key => counter[key] > 0)
    .reduce((prevValue, el) => {
      prevValue[el] = ships[el]
      return prevValue;
    }, {});
}

class SelectShipPure extends Component {
  handleChange(event) {
    this.props.selectShipType(event.target.value)
  }

  handleConfirmation() {
    this.props.confirmSelection()
  }

  endTurn() {
    this.props.endTurn()
  }

  startBattle() {
    this.props.startBattle()
  }

  render() {
    if(Object.entries(availableShips(this.props.counter, SHIPS)).length !== 0) { 
      return (
        <div className="game-preparation top">
          <h3>Select battleship</h3>
          <select 
            className="ship-selector"
            onChange={this.handleChange.bind(this)} 
            value={this.props.selectedShip}
          >
            {Object.entries(availableShips(this.props.counter, SHIPS)).map((el, i) => 
              <option value={el[0]} key={i}>{el[1]}</option>
            )}
          </select>
            <p>Place {SHIPS[this.props.selectedShip]} on the board</p>
            <button 
              className="confirmation-button" 
              type="button" 
              onClick={() => {this.handleConfirmation()}}>
                Confirm placement
            </button>
        </div> 
      )
    } else {
      if(this.props.currentPlayer === 'player1') {
        return (
          <div>
            <p>Your fleet is ready for the battle!</p>
            <button type="button" onClick={() => {this.endTurn()}}>Next player</button>
          </div>
        )
      } else {
        return (
          <div>
            <p>Your fleet is ready for the battle!</p>
            <button type="button" onClick={() => {this.startBattle()}}>Start battle</button>
          </div>
        )
     }
    }
  }
}

export const SelectShip = connect(
  state => ({ 
    currentPlayer: state.currentPlayer, 
    selectedShip: state[state.currentPlayer].selectedShip 
  }),
  dispatch => ({
    selectShipType: value => dispatch(selectShip(value)),
    confirmSelection: () => dispatch(confirmShipSelection()),
    endTurn: () => dispatch(endCurrentPlayerTurn()),
    startBattle: () => dispatch(enterBattlePhase())
  })
)(SelectShipPure)