import React from 'react';

const Row = props => (
  <tr>
    {props.fields.map((field, i) => 
      <Field key={i} field={field} />
    )}
  </tr>
)

const Field = props => (
  <td style={{ border: '1px solid black', width: '30px', height: '30px' }}>
    {props.field.value}
  </td>
)


export const Board = props => {

  return (
    <table style={{ borderCollapse: 'collapse' }}>
      <tbody>
        {props.board.map((row, i) =>
          <Row key={i} fields={row} />
        )}
      </tbody>
    </table>
  )
}