import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Board } from './Board';
import { makeDecision, revealBoard } from '../actions/gameActions';
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
    console.log(this.props.showBoard)
    if(this.props.showBoard === true) {
      return (
        <div>
          <h1>Game</h1>
          <Board board={buildBoard(this.props.board)} handleClick={this.handleClick.bind(this)} />
          <SelectShip counter={this.props.shipsCounter}/>
        </div>
      )
    } else {
      return (
        <button type="button" onClick={() => {this.props.revealBoard()}}>Show board</button>
      )
    }
  }
}

export const Game = connect(
  state => ({ showBoard: state.showBoard, board: state.game.board, shipsCounter: state.game.shipsCounter }),
  dispatch => ({
    makeDecision: (row, col) => dispatch(makeDecision(row, col)),
    revealBoard: () => dispatch(revealBoard())
  })
)(GamePure)
