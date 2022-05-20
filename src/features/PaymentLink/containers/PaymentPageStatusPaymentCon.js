// import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import TransactionActions from '../../transaction/redux'

const mapStateToProps = (state, ownProps) => {
  return {
    errorCheckStatusPayment: state.transaction.errorCheckStatusPayment,
    paymentStatus: state.transaction.paymentStatus,
    loadingCheckStatusPayment: state.transaction.loadingCheckStatusPayment,
    openSnackBarStatusPayment: state.transaction.openSnackBarStatusPayment
  }
}
const mapDispatchToProps = dispatch => {
  return {
    transactionCheckStatusPayment: data => dispatch(TransactionActions.transactionCheckStatusPayment(data)),
    transactionSetOpenSnackBarStatusPayment: data => dispatch(TransactionActions.transactionSetOpenSnackBarStatusPayment(data))
  }
}
export default (page) => connect(
  mapStateToProps,
  mapDispatchToProps
)(page)
