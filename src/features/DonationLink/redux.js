import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  donationlinkFetchOne: ['data'],
  donationlinkFetchOneDone: ['data'],
  donationlinkSubmitForm: ['data'],
  donationlinkSubmitFormDone: ['data'],
  donationlinkCloseModal: null,
  donationlinkOpenModal: ['data'],
  donationlinkSubmitOrdercode: ['data'],
  donationlinkSubmitOrdercodeDone: ['data'],
  donationlinkSetOpenSnackBarStatusPayment: ['data'],
  donationlinkCheckStatusPayment: ['data'],
  donationlinkCheckStatusPaymentDone: ['data'],
  reset: null
})

export const DonationlinkTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  payload: {},
  loading: {},
  loadingSubmitForm: false,
  loadingFetchOne: false,
  errorFetchOne: [],
  errorSubmitForm: [],
  loadingSubmitOrdercode: false,
  errorSubmitOrdercode: [],
  openModal: false,
  openSnackBarStatusPayment: false,
  orderCode: '',
  paymentPageUrl: '',
  donationLinkDataDetail: {},
  paymentStatus: '',
  loadingCheckStatusPayment: false
})

export const donationlinkFetchOne = (state, { data }) => state.merge({
  loadingFetchOne: true,
  errorFetchOne: [],
  paymentLinkDataDetail: {}
})
export const donationlinkFetchOneDone = (state, { data }) => state.merge({
  loadingFetchOne: false,
  errorFetchOne: data.errors,
  paymentLinkDataDetail: data.dataDetail
})
export const donationlinkSubmitOrdercode = (state, { data }) => state.merge({
  loadingSubmitOrdercode: true,
  errorSubmitOrdercode: [],
  paymentPageUrl: ''
})
export const donationlinkSubmitOrdercodeDone = (state, { data }) => state.merge({
  loadingSubmitOrdercode: false,
  errorSubmitOrdercode: data.errors,
  paymentPageUrl: data.paymentPageUrl
})
export const donationlinkSubmitForm = (state, { data }) => state.merge({
  loadingSubmitForm: true
})
export const donationlinkSubmitFormDone = (state, { data }) => state.merge({
  loadingSubmitForm: false,
  orderCode: data.orderCode,
  errorSubmitForm: data.errors
})
export const donationlinkCloseModal = (state) => state.merge({
  openModal: false,
  orderCode: ''
})
export const donationlinkOpenModal = (state, { data }) => state.merge({
  openModal: true,
  orderCode: data.orderCode
})
export const donationlinkSetOpenSnackBarStatusPayment = (state, { data }) => state.merge({
  openSnackBarStatusPayment: data.open
})
export const donationlinkCheckStatusPayment = (state, { data }) => state.merge({
  loadingCheckStatusPayment: true
})
export const donationlinkCheckStatusPaymentDone = (state, { data }) => state.merge({
  paymentStatus: data.paymentStatus,
  loadingCheckStatusPayment: false
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DONATIONLINK_OPEN_MODAL]: donationlinkOpenModal,
  [Types.DONATIONLINK_CLOSE_MODAL]: donationlinkCloseModal,
  [Types.DONATIONLINK_SUBMIT_FORM]: donationlinkSubmitForm,
  [Types.DONATIONLINK_SUBMIT_FORM_DONE]: donationlinkSubmitFormDone,
  [Types.DONATIONLINK_SUBMIT_ORDERCODE]: donationlinkSubmitOrdercode,
  [Types.DONATIONLINK_SUBMIT_ORDERCODE_DONE]: donationlinkSubmitOrdercodeDone,
  [Types.DONATIONLINK_CHECK_STATUS_PAYMENT]: donationlinkCheckStatusPayment,
  [Types.DONATIONLINK_CHECK_STATUS_PAYMENT_DONE]: donationlinkCheckStatusPaymentDone,
  [Types.DONATIONLINK_FETCH_ONE]: donationlinkFetchOne,
  [Types.DONATIONLINK_FETCH_ONE_DONE]: donationlinkFetchOneDone,
  [Types.DONATIONLINK_SET_OPEN_SNACK_BAR_STATUS_PAYMENT]: donationlinkSetOpenSnackBarStatusPayment,
  [Types.RESET]: (state) => INITIAL_STATE
})
