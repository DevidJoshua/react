// import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import PaymentlinkActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    errorSubmitOrdercode: state.paymentlink.errorSubmitOrdercode,
    // errorFetchOne: state.paymentlink.errorFetchOne,
    paymentLinkDataDetail: state.paymentlink.paymentLinkDataDetail,
    openSnackBarStatusPayment: state.paymentlink.openSnackBarStatusPayment
  }
}
const mapDispatchToProps = dispatch => {
  return {
    paymentlinkFetchOne: data => dispatch(PaymentlinkActions.paymentlinkFetchOne(data)),
    paymentlinkSetOpenSnackBarStatusPayment: data => dispatch(PaymentlinkActions.paymentlinkSetOpenSnackBarStatusPayment(data))
  }
}
export default (page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
