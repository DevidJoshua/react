import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import NeedvalidationActions from '../redux'
import { useHistory } from 'react-router-dom'

const TableHeaderCon = ({
  needvalidationCheckboxSubmitValidate,
  needvalidationCheckbox,
  loadingValidate,
  merchantId,
  history
}) => {
  return (
    <>
      <button type='button' style={{ marginLeft: 5 }} className='btn btn-info' onClick={() => needvalidationCheckboxSubmitValidate({ needvalidationCheckbox, merchantId })}><i className='fas fa-plus' /> Validate</button>
    </>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    merchantId: state.myprofile.merchant.id,
    loadingValidate: state.needvalidation.loadingValidate,
    needvalidationCheckbox: state.needvalidation.checkbox
  }
}
const mapDispatchToProps = dispatch => {
  return {
    needvalidationCheckboxSubmitValidate: data => dispatch(NeedvalidationActions.needvalidationCheckboxSubmitValidate(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl((props) => {
  var history = useHistory()
  return <TableHeaderCon history={history} {...props} />
}))
