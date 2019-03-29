import React from 'react'

const AntiquarianTable = ({ purchase, lastUpdated, antiqList }) => {

  const isActive = (min, max, pur) => {
    return pur >= 100 & min >= 100 ? 'active' : pur >= min && pur <= max ? 'active' : ''
  }

  return (
    <table id="antiq-table" className="bordered dense">
      <thead>
        <tr>
          <th width="25%">Purchase</th>
          <th>Sale</th>
          <th width="25%">Purchase</th>
          <th>Sale</th>
        </tr>
      </thead>

      <tbody>

        {antiqList.map(({ min, max, price }, i, arr) => {
          if (i < (arr.length / 2)) {

            const { min: min2, max: max2, price: price2 } = arr[i + (arr.length / 2)]

            return (
              <tr>
                <td className={isActive(min, max, purchase)}>
                  {min} - {max}
                </td>
                <td className={isActive(min, max, purchase)}>
                  {price}
                </td>
                <td className={isActive(min2, max2, purchase)}>
                  {min2} - {min2 > 99 ? "100+" : max2}
                </td>
                <td className={isActive(min2, max2, purchase)}>
                  {price2}
                </td>
              </tr>
            )
          }
        })}

        <tr>
        <td colspan="4" style={{ textAlign: "right" }}>
          <small>Prices in <strong>EUR</strong>. Conversion rates by <a href="https://fixer.io/">Fixer</a> <span className="last-updated">(updated <strong>{lastUpdated}</strong>)</span></small>
        </td>
      </tr>

      </tbody>
    </table>

  )
}

export default AntiquarianTable