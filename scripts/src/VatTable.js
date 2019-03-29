import React from 'react'

const VatList = ({ amount, vatList }) => (
  <table className="vat-table bordered dense">
    <thead>
      <tr>
        <th style={{width: "1%"}}>%</th>
        <th colspan="2">Incl.</th>
        <th colspan="2">Excl.</th>
      </tr>
    </thead>
    <tbody>
      {vatList.map((vat, i) => {
        const base = (vat / 100) + 1

        return (
          <tr key={i}>
            <td>{vat}</td>
            <td>{amount > 0 && (amount / base).toFixed(2)}</td>
            <td className="vague">{amount > 0 && `+${(amount - (amount / base)).toFixed(2)}`}</td>
            <td>{amount > 0 && (amount * base).toFixed(2)}</td>
            <td className="vague">{amount > 0 && `-${((amount * base) - amount).toFixed(2)}`}</td>
          </tr>
        )
      })}
    </tbody>
  </table> 
)

export default VatList