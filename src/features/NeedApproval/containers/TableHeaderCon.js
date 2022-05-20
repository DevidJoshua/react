import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import NeedApprovalActions from '../redux'
import { useHistory } from 'react-router-dom'


const TableHeaderCon = ({
  needapprovalCheckboxSubmitApprove,
  needapprovalCheckboxSubmitReject,
  needapprovalCheckbox,
  loadingApprove,
  merchantId,
  apiver,
  history,
  rejectServiceEntity,
  approveServiceEntity
}) => {
  return (
    <>
      <button type='button' className='btn btn-info' onClick={() => needapprovalCheckboxSubmitApprove({ needapprovalCheckbox, merchantId,apiver,approveServiceEntity,history })}><i className='fas fa-plus' /> Approve</button>
      <button type='button' style={{ marginLeft: 5 }} className='btn btn-warning' onClick={() => needapprovalCheckboxSubmitReject({ needapprovalCheckbox, merchantId,apiver,rejectServiceEntity,history })}><i className='fas fa-plus' /> Reject </button>
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    merchantId: state.myprofile.merchant.id,
    loadingApprove: state.needapproval.loadingApprove,
    needapprovalCheckbox: state.needapproval.checkbox
  }
}
const mapDispatchToProps = dispatch => {
  return {
    needapprovalCheckboxSubmitReject: data => dispatch(NeedApprovalActions.needapprovalCheckboxSubmitReject(data)),
    needapprovalCheckboxSubmitApprove: data => dispatch(NeedApprovalActions.needapprovalCheckboxSubmitApprove(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl((props)=>{
  var history = useHistory()
  return (<TableHeaderCon history={history} {...props}/>) 
}))
