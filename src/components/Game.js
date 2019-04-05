import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Board } from './Board';
import { makeDecision } from '../actions/gameActions';
import { SelectShip } from './SelectShip';

const buildBoard = state => {
  let board = []
  for (let row = 1; row <= 10; row++) {
    board.push(state.filter(el => el.row === row))
  }
  return board
}

class GamePure extends Component {
  handleClick(row, col) {
    this.props.makeDecision(row, col)
  }

  render() {
    return (
      <div>
        <h1>Game</h1>
        <Board board={buildBoard(this.props.board)} handleClick={this.handleClick.bind(this)} />
        <SelectShip counter={this.props.shipsCounter}/>
      </div>
    )
  }
}

export const Game = connect(
  state => ({ board: state.game.board, shipsCounter: state.game.shipsCounter }),
  dispatch => ({
    makeDecision: (row, col) => dispatch(makeDecision(row, col))
  })
)(GamePure)
