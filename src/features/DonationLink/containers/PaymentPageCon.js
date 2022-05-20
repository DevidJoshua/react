// import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import DonationlinkActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    errorSubmitOrdercode: state.donationlink.errorSubmitOrdercode,
    loadingSubmitOrdercode: state.donationlink.loadingSubmitOrdercode,
    donationPageUrl: state.donationlink.donationPageUrl
  }
}
const mapDispatchToProps = dispatch => {
  return {
    donationlinkSubmitOrdercode: data => dispatch(DonationlinkActions.donationlinkSubmitOrdercode(data))
  }
}
export default (page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
