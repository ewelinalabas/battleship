import React from 'react';

const Row = props => (
  <tr>
    {props.fields.map((field, i) => 
      <Field 
        key={i} 
        field={field}
        handleClick={props.handleClick}
      />
    )}
  </tr>
)

const Field = props => (
  <td 
    style={{ border: '1px solid black', width: '30px', height: '30px' }}
    onClick={() => {
      props.handleClick(props.field.row, props.field.col)}
    }
  >
    {props.field.value}
  </td>
)

export const Board = props => {
  return (
    <table className="game-preparation bottom">
      <tbody>
        {props.board.map((row, i) =>
          <Row 
            key={i} 
            fields={row}
            handleClick={props.handleClick}
          />
        )}
      </tbody>
    </table>
  )
}