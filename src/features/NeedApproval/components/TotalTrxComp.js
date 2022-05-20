import React from 'react'

function TotalTrxComp ({ trx }) {
  return (
    <div className='small-box bg-info'>
      <div className='inner'>
        <p>Total Transaction</p>
        <h3>{trx}</h3>
      </div>
      <div className='icon'>
        <i className='ion ion-bag' />
      </div>
    </div>
  )
}

export default TotalTrxComp
