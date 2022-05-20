import React from 'react'

function TotalAmountComp ({ amount }) {
  return (
    <div className='small-box bg-info'>
      <div className='inner'>
        <p>Total Amount</p>
        <h3>{amount}</h3>
      </div>
      <div className='icon'>
        <i className='ion ion-bag' />
      </div>
    </div>
  )
}

export default TotalAmountComp
