// import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import PaymentlinkActions from '../redux'
import TransactionActions from '../../transaction/redux'

const mapStateToProps = (state, ownProps) => {
  return {
    paymentStatus: state.transaction.paymentStatus,
    paymentPageUrl: state.transaction.paymentPageUrl,
    invoiceNumber: state.transaction.invoiceNumber,
    // errorSubmitOrdercode: state.paymentlink.errorSubmitOrdercode,
    // errorFetchOne: state.paymentlink.errorFetchOne,
    // paymentLinkDataDetail: state.paymentlink.paymentLinkDataDetail,
    openSnackBarStatusPayment: state.paymentlink.openSnackBarStatusPayment
  }
}
const mapDispatchToProps = dispatch => {
  return {
    transactionPaymentStep1: data => dispatch(TransactionActions.transactionPaymentStep1(data)),
    paymentlinkSetOpenSnackBarStatusPayment: data => dispatch(PaymentlinkActions.paymentlinkSetOpenSnackBarStatusPayment(data))
  }
}
export default (page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
