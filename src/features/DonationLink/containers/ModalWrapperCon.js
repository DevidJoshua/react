import ModalWrapper from '../components/ModalWrapper'
import { connect } from 'react-redux'
import DonationLinkActions from '../redux'

const mapStateToProps = (state, ownProps) => {
  return {
    loadingSubmitForm: state.donationlink.loadingSubmitForm,
    errorSubmitForm: state.donationlink.errorSubmitForm,
    orderCode: state.donationlink.orderCode,
    openModal: state.donationlink.openModal,
    payload: state.donationlink.payload
  }
}
const mapDispatchToProps = dispatch => {
  
  return {
    donationlinkSubmitForm: data => dispatch(DonationLinkActions.donationlinkSubmitForm(data)),
    donationlinkOpenModal: data => dispatch(DonationLinkActions.donationlinkOpenModal(data)),
    donationlinkCloseModal: () => dispatch(DonationLinkActions.donationlinkCloseModal())
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalWrapper)
