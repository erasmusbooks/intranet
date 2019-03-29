import React from 'react'

const PricingHelpTable = ({ amount, currencyList, rates, currency, lastUpdated }) => (
  <table className="pricing-help-table bordered dense">
    <thead>
      <tr>
        <th style={{width: "1%"}}></th>
        <th>Rate</th>
        <th>Converted</th>
        <th colspan="2">+20%</th>
        <th colspan="2">+30%</th>
        <th colspan="2">+40%</th>
      </tr>
    </thead>
    <tbody>
      {currencyList.map((curr, i) => {
        const base = rates[curr] / rates[currency],
          calc = amount > 0 && amount * base,
          calc20 = calc / .8,
          calc30 = calc / .7,
          calc40 = calc / .6

        return (
          <tr key={i} id={curr} className={curr == currency && 'active'}>
            <td>{curr}</td>
            <td>{parseFloat(base.toFixed(5))}</td>
            <td>{amount > 0 && calc.toFixed(2)}</td>
            <td>{amount > 0 && calc20.toFixed(2)}</td>
            <td class="vague">{amount > 0 && `+${(calc20 - amount).toFixed(2)}`}</td>
            <td>{amount > 0 && calc30.toFixed(2)}</td>
            <td class="vague">{amount > 0 && `+${(calc30 - amount).toFixed(2)}`}</td>
            <td>{amount > 0 && calc40.toFixed(2)}</td>
            <td class="vague">{amount > 0 && `+${(calc40 - amount).toFixed(2)}`}</td>
          </tr>
        )
      })}

      <tr>
        <td colspan="10" style={{ textAlign: "right" }}>
          <small>Conversion rates by <a href="https://fixer.io/">Fixer</a> <span className="last-updated">(updated <strong>{lastUpdated}</strong>)</span></small>
        </td>
      </tr>
    </tbody>
  </table>  
)

export default PricingHelpTable