import React from 'react'

function BalanceComp ({ balance }) {
  return (
    <div className='small-box bg-info'>
      <div className='inner'>
        <p>Balance</p>
        <h3>{balance}</h3>
      </div>
      <div className='icon'>
        <i className='ion ion-bag' />
      </div>
    </div>
  )
}

export default BalanceComp
