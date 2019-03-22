import React, { Component } from 'react';
import { buildInitialState } from '../reducers/gameReducer';
import { Board } from './Board';

const initialState = buildInitialState()

const buildBoard = state => {
  let board = []
  for (let row = 1; row <= 10; row++) {
    board.push(state.filter(el => el.row === row))
  }
  return board
}

export class Game extends Component {
  render() {
    return (
      <div>
        <h1>Game</h1>
        <Board board={buildBoard(initialState)} />
      </div>
    )
  }
}
