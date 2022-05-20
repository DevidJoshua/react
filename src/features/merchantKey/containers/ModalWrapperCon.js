import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import MerchantkeyActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    loadingSubmitForm: state.merchantkey.loadingSubmitForm,
    errorSubmitForm: state.merchantkey.errorSubmitForm,
    orderCode: state.merchantkey.orderCode,
    openModal: state.merchantkey.openModal,
    payload: state.merchantkey.payload
  }
}
const mapDispatchToProps = dispatch => {
  return {
    merchantkeySubmitForm: data => dispatch(MerchantkeyActions.merchantkeySubmitForm(data)),
    merchantkeyOpenModal: data => dispatch(MerchantkeyActions.merchantkeyOpenModal(data)),
    merchantkeyCloseModal: () => dispatch(MerchantkeyActions.merchantkeyCloseModal())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper)
