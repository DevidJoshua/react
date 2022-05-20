import React from 'react'
import { connect } from 'react-redux'
import { CardWrapper, OverlaySpin, SearchFieldCon } from '../index'

const Loading = connect((state, ownProps) => ({ loading: (state.tablepagination.loading || {})[ownProps.serviceName] }))((props) => {
  const { loading } = props
  if (!loading) return null
  return <OverlaySpin />
})

const CardWrapperCon = (props) => <CardWrapper SearchField={SearchFieldCon} Loading={Loading} {...props} />

export default CardWrapperCon
