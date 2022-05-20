import React from 'react'
import { connect } from 'react-redux'
import BalanceComp from '../components/BalanceComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).newOrderCount }), null)((props) => {
  return <BalanceComp {...props} />
})
