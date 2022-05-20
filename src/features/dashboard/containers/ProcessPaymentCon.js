import React from 'react'
import { connect } from 'react-redux'
import ProcessPaymentComp from '../components/ProcessPaymentComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).payment_pending }), null)((props) => {
  return <ProcessPaymentComp {...props} />
})
