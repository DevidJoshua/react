// import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import PaymentlinkActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    errorSubmitOrdercode: state.paymentlink.errorSubmitOrdercode,
    loadingSubmitOrdercode: state.paymentlink.loadingSubmitOrdercode,
    paymentPageUrl: state.paymentlink.paymentPageUrl
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentlinkSubmitOrdercode: data => dispatch(PaymentlinkActions.paymentlinkSubmitOrdercode(data))
  }
}
export default (page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
