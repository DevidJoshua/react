import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import NeedapprovalActions from '../redux'

function Comp ({
  needapprovalCheckboxOnClick,
  transactionId,
  checkbox,
  idComparison,
  user_id
}) {
  return (
    user_id != idComparison
    ? (<input key={transactionId} type='checkbox' className='form-check-input' onChange={(e) => { needapprovalCheckboxOnClick({ id: transactionId }) }} value='false' checked={checkbox[transactionId]} />)
    : (<input key={transactionId} type='checkbox' disabled/>)
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    checkbox: state.needapproval.checkbox,
    user_id: state.myprofile.user_id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    needapprovalCheckboxOnClick: data => dispatch(NeedapprovalActions.needapprovalCheckboxOnClick(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
