import React from 'react'
import { connect } from 'react-redux'
import TotalTrxComp from '../components/TotalTrxComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).newOrderCount }), null)((props) => {
  return <TotalTrxComp {...props} />
})
