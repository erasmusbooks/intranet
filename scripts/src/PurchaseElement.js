import React from 'react'

const PurchaseElement = ({ currency, amount, shipping }) => {

  return Number(amount) ? 
    <span>
      <strong style={{ color: 'purple' }}>
        {currency} {parseFloat((Number(amount) + (Number(shipping) && Number(shipping))).toFixed(2))}
      </strong> 
      {Number(shipping) ? <span> ({currency} {parseFloat(Number(amount).toFixed(2))} + {currency} {parseFloat(Number(shipping).toFixed(2))} shipping)</span> : ' (No shipping cost)'}
    </span>
    : 'Unknown'
  
}

export default PurchaseElement