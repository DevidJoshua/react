import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// import NeedApprovalActions from '../redux'

const TableHeaderCon = ({
  history,
  id,
  dataDetail,
  merchantId,
  deleteService,
  upsertPageUrl,
  userId
}) => {
  return (
    <>
      {dataDetail && (dataDetail.status === 'NEED_APPROVAL' || dataDetail.status === 'REJECTED') && (dataDetail.created_by || {})._id === userId && deleteService && <button style={{ width: 100 }} type='button' className='btn bg-gradient-danger' data-toggle='modal' data-target='#modal-danger'>Hapus</button>}
      {dataDetail && (dataDetail.status === 'NEED_APPROVAL' || dataDetail.status === 'REJECTED') && (dataDetail.created_by || {})._id === userId && upsertPageUrl(id) && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(upsertPageUrl(id))} type='button' className='btn bg-gradient-primary'>Ubah</button>}
      {(dataDetail && upsertPageUrl()) && <button style={{ width: 100, marginLeft: 5 }} onClick={() => history.push(upsertPageUrl())} type='button' className='btn bg-gradient-info'>Buat</button>}
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    merchantId: state.myprofile.merchant.id,
    userId: state.myprofile.user_id
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // needapprovalCheckboxSubmitReject: data => dispatch(NeedApprovalActions.needapprovalCheckboxSubmitReject(data)),
    // needapprovalCheckboxSubmitApprove: data => dispatch(NeedApprovalActions.needapprovalCheckboxSubmitApprove(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TableHeaderCon))
