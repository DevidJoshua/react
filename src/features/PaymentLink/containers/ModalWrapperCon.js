import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import PaymentlinkActions from '../redux'
import { data } from 'core/Redux/HomeRedux'

const mapStateToProps = (state, ownProps) => {
  return {
    loadingSubmitForm: state.paymentlink.loadingSubmitForm,
    errorSubmitForm: state.paymentlink.errorSubmitForm,
    orderCode: state.paymentlink.orderCode,
    openModal:state.paymentlink.openModal,
    payload: state.paymentlink.payload,
    idCode: state.paymentlink.idCode,
    deviceId: navigator.userAgent,
    userId: state.myprofile.user_id,
    merchantId: state.myprofile.merchant.id,
    openIdModal:state.paymentlink.openIdModal,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    closeIdCodeModal: ()=> dispatch(PaymentlinkActions.closeIdCodeModal()),
    paymentlinkSubmitForm: data => dispatch(PaymentlinkActions.paymentlinkSubmitForm(data)),
    paymentlinkOpenModal: data => dispatch(PaymentlinkActions.paymentlinkOpenModal(data)),
    paymentlinkCloseModal: () => dispatch(PaymentlinkActions.paymentlinkCloseModal()),
    setPayload: data => dispatch(PaymentlinkActions.setNewPlPayload(data)),
    resetPayload: () => dispatch(PaymentlinkActions.resetNewPlPayload())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper)
