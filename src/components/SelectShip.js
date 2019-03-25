import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectShip } from '../actions/gameActions';

const SHIPS = {
  "1": "Single-decker",
  "2": "Two-decker",
  "3": "Three-decker",
  "4": "Four-decker"
}

class SelectShipPure extends Component {
  handleChange(event) {
    this.props.selectShip(event.target.value)
  }

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
      </div>
    )
  }
}

export const SelectShip = connect(
  state => ({ selectedShip: state.game.selectedShip }),
  dispatch => ({
    selectShip: value => dispatch(selectShip(value))
  })
)(SelectShipPure)