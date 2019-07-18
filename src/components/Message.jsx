import React, { Component } from 'react';
import { connect } from 'react-redux';
import { endCurrentPlayerTurn } from '../actions/gameActions';

class MessagePure extends Component {
  render() {
    if(this.props.message === 'You missed.') {
      return(
        <div>
          <p>{this.props.message}</p>
          <button type="button" onClick={() => {this.props.endTurn()}}>Next player</button>
        </div>
      )
    } else {
      return(
        <div>
          <p>{this.props.message}</p>
        </div>
      )
    }
  }
}

export const Message = connect(
  state => ({
    message: state.message
  }),
  dispatch => ({
    endTurn: () => dispatch(endCurrentPlayerTurn())
  })
)(MessagePure)
