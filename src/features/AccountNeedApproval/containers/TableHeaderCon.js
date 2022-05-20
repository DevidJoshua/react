import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { useHistory } from 'react-router-dom'
import NeedApprovalActions from '../../NeedApproval/redux'

const TableHeaderCon = ({
  needapprovalCheckboxSubmitApprove,
  needapprovalCheckboxSubmitReject,
  needapprovalCheckbox,
  loadingApprove,
  merchantId,
  history,
  entity,
  apiver,
  rejectServiceEntity,
  approveServiceEntity
}) => {

return (
    <>
      {/* <button type='button' className='btn btn-warning' onClick={() => history.push('/form-account-number')}><i className='fas fa-plus' /> Create New </button> */}
      <button type='button' style={{ marginLeft: 5 }} className='btn btn-success' onClick={() =>  { needapprovalCheckboxSubmitApprove({ apiver,approveServiceEntity,needapprovalCheckbox, merchantId,entity,history }) } }><i className='fas fa-check-circle' /> Approve</button>
      <button type='button' style={{ marginLeft: 5 }} className='btn btn-danger' onClick={() => { needapprovalCheckboxSubmitReject({ apiver,rejectServiceEntity,needapprovalCheckbox, merchantId,entity,history }) }}><i className='fas fa-window-close' /> Reject </button>
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
// )(injectIntl(TableHeaderCon))
)(injectIntl((props) => {
  var history = useHistory()
  return <TableHeaderCon history={history} {...props} />
}))
