import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShip, confirmShipSelection, enterBattlePhase } from '../actions/gameActions';


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

  startBattle() {
    this.props.startBattle()
  }

  render() {
    return Object.entries(availableShips(this.props.counter, SHIPS)).length !== 0 ? 
      <div>
        <h3>SELECT BATTLESHIP</h3>
        <select onChange={this.handleChange.bind(this)} value={this.props.selectedShip}>
          {Object.entries(availableShips(this.props.counter, SHIPS)).map((el, i) => 
            <option value={el[0]} key={i}>{el[1]}</option>
          )}
        </select>
          <p>Current selection: {SHIPS[this.props.selectedShip]}</p>
          <button type="button" onClick={() => {this.handleConfirmation()}}>Confirm</button>
      </div> : 
      <div>
        <p>Your fleet is ready for the battle!</p>
        <button type="button" onClick={() => {this.startBattle()}}>Start battle</button>
      </div>
  }
}

export const SelectShip = connect(
  state => ({ selectedShip: state.game.selectedShip }),
  dispatch => ({
    selectShipType: value => dispatch(selectShip(value)),
    confirmSelection: () => dispatch(confirmShipSelection()),
    startBattle: () => dispatch(enterBattlePhase())
  })
)(SelectShipPure)