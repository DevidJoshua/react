import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import MerchantSecretKeyActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    isOpenModal: state.merchantsecretkey.openModal,
    loading: state.merchantsecretkey.loading,
    scrt: state.merchantsecretkey.scrt
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetch: data => dispatch(MerchantSecretKeyActions.fetchMerchantSecretKey(data)),
    closeModal: data => dispatch(MerchantSecretKeyActions.closeMerchantSecretKeyModal(data)),
    openModal: data => dispatch(MerchantSecretKeyActions.openMerchantSecretKeyModal(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper)
