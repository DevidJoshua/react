import React from 'react'
import { connect } from 'react-redux'
import PaymentFailedComp from '../components/PaymentFailedComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).payment_failed }), null)((props) => {
  return <PaymentFailedComp {...props} />
})
