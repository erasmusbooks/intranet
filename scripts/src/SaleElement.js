import React from 'react'

const SaleElement = ({ sale, discount }) => {

  return Number(sale) ? 
    Number(sale) == 999 ?
      <span>
        <strong style={{ color: '#009900' }}>
          EUR XXXX
        </strong> (<strong>HIGH RISK/CUSTOM PRICE</strong>, including margin & shipping, {discount ? <em>{discount}% customer discount</em>: 'no customer discount'})
      </span>
    :
      <span>
        <strong style={{ color: '#009900' }}>
          EUR {sale}
        </strong> (including margin & shipping, {discount ? <em>{discount}% customer discount</em>: 'no customer discount'}) 
      </span>
  : 'Unknown'
  
}

export default SaleElement