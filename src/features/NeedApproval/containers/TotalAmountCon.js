import React from 'react'
import { connect } from 'react-redux'
import TotalAmountComp from '../components/TotalAmountComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).newOrderCount }), null)((props) => {
  return <TotalAmountComp {...props} />
})
