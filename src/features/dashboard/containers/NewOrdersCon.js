import React from 'react'
import { connect } from 'react-redux'
import NewOrdersComp from '../components/NewOrdersComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).payment_amount }), null)((props) => {
  return <NewOrdersComp {...props} />
})
