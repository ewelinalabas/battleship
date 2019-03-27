import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShip, confirmShipSelection } from '../actions/gameActions';

const SHIPS = {
  "1": "Single-decker",
  "2": "Two-decker",
  "3": "Three-decker",
  "4": "Four-decker"
}

class SelectShipPure extends Component {
  handleChange(event) {
    this.props.selectShipType(event.target.value)
  }

  handleConfirmation() {
    this.props.confirmSelection()
  }
  //handleRejection() {}

  render() {
    return (
      <div>
        <h3>SELECT BATTLESHIP</h3>
        <select onChange={this.handleChange.bind(this)} value={this.props.selectedShip}>
          {Object.entries(SHIPS).map((el, i) =>
            <option value={el[0]} key={i}>{el[1]}</option>
          )}
        </select>
          <p>Current selection: {SHIPS[this.props.selectedShip]}</p>
          <button type="button" onClick={() => {this.handleConfirmation()}}>Confirm</button>
          <button type="button">Correct</button>
      </div>
    )
  }
}

export const SelectShip = connect(
  state => ({ selectedShip: state.game.selectedShip }),
  dispatch => ({
    selectShipType: value => dispatch(selectShip(value)),
    confirmSelection: () => dispatch(confirmShipSelection())
  })
)(SelectShipPure)