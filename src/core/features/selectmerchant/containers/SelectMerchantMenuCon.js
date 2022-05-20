import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import SelectMerchantMenu from '../components/SelectMerchantMenu'
import MyprofileActions from '../../myprofile/redux'

const mapStateToProps = (state, ownProps) => {
  return {
    userMerchants: state.myprofile.user_merchants,
    merchant: state.myprofile.merchant
  }
}
const mapDispatchToProps = dispatch => {
  return {
    myprofileChangeMerchant: data => dispatch(MyprofileActions.myprofileChangeMerchant(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectMerchantMenu))
