import React from 'react'
import { connect } from 'react-redux'
import SuccessPaymentComp from '../components/SuccessPaymentComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).payment_success }), null)((props) => {
  return <SuccessPaymentComp {...props} />
})
