import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Board } from './Board';
import { makeDecision, revealBoard, shoot } from '../actions/gameActions';
import { SelectShip } from './SelectShip';
import { Message } from './Message';

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

  handleShoot(row, col) {
    this.props.shoot(row, col)
  }

  render() {
    if(this.props.showBoard === true && this.props.battlePhase === false) {
      return (
        <div>
          <h1>Game</h1>
          <Board board={buildBoard(this.props.board)} handleClick={this.handleClick.bind(this)} />
          <SelectShip counter={this.props.shipsCounter}/>
        </div>
      )
    } else if(this.props.showBoard === true && this.props.battlePhase === true) {
      return (
        <div>
          <h1>Battle</h1>
          <Board board={buildBoard(this.props.shootingBoard)} handleClick={this.handleShoot.bind(this)}/>
          <Message />
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
  state => ({ 
    showBoard: state.showBoard, 
    board: state[state.currentPlayer].board, 
    shootingBoard: state[state.currentPlayer].shootingBoard,
    shipsCounter: state[state.currentPlayer].shipsCounter, 
    battlePhase: state.battlePhase
  }),
  dispatch => ({
    makeDecision: (row, col) => dispatch(makeDecision(row, col)),
    revealBoard: () => dispatch(revealBoard()),
    shoot: (row, col) => dispatch(shoot(row, col))
  })
)(GamePure)