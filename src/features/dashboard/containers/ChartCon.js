import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ChartComp from '../components/ChartComp'

export default connect((state, ownProps) => ({ count: (state.dashboard.FetchData.payload || {}).newOrderCount }), null)((props) => {
  var history = useHistory()
  return <ChartComp history={history} {...props} />
})
