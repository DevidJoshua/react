import React from 'react'
import { connect } from 'react-redux'
import NeedvalidationActions from '../redux'

function Comp ({
  needvalidationCheckboxOnClick,
  transactionId,
  checkbox
}) {
  return (<input key={transactionId} type='checkbox' className='form-check-input' onChange={(e) => { needvalidationCheckboxOnClick({ id: transactionId }) }} value='false' checked={checkbox[transactionId]} />)
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkbox: state.needvalidation.checkbox
  }
}
const mapDispatchToProps = dispatch => {
  return {
    needvalidationCheckboxOnClick: data => dispatch(NeedvalidationActions.needvalidationCheckboxOnClick(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
