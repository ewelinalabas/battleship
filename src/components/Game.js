import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Board } from './Board';
import { updateBoard } from '../actions/gameActions';

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
      </div>
    )
  }
}

export const Game = connect(
  state => ({ board: state.game.board }),
  dispatch => ({
    makeDecision: (row, col) => dispatch(updateBoard(row, col))
  })
)(GamePure)
