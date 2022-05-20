import React from 'react'
import { connect } from 'react-redux'
import DirectChatComp from '../components/DirectChatComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).newOrderCount }), null)((props) => {
  return <DirectChatComp {...props} />
})
