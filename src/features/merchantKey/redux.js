import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  merchantkeyFetchOne: ['data'],
  merchantkeyFetchOneDone: ['data'],
  merchantkeySubmitForm: ['data'],
  merchantkeySubmitFormDone: ['data'],
  merchantkeyCloseModal: null,
  merchantkeyOpenModal: ['data'],
  merchantkeySubmitOrdercode: ['data'],
  merchantkeySubmitOrdercodeDone: ['data'],
  merchantkeySetOpenSnackBarStatusPayment: ['data'],
  merchantkeyCheckStatusPayment: ['data'],
  merchantkeyCheckStatusPaymentDone: ['data'],
  merchantkeyFetchCurrentMerchantKey: ['data'],
  merchantkeyFetchCurrentMerchantKeyDone: ['data'],
  merchantkeyUpdateCurrentCallbackUrl: ['data'],
  merchantkeyUpdateCurrentCallbackUrlDone: ['data'],
  reset: null
})

export const MerchantkeyTypes = Types
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
  paymentLinkDataDetail: {},
  paymentStatus: '',
  loadingCheckStatusPayment: false,
  loadingFetchCurrentMerchantKey: false,
  loadingUpdateCurrentCallbackUrl: false
})

export const merchantkeyFetchOne = (state, { data }) => state.merge({
  loadingFetchOne: true,
  errorFetchOne: [],
  paymentLinkDataDetail: {}
})
export const merchantkeyFetchOneDone = (state, { data }) => state.merge({
  loadingFetchOne: false,
  errorFetchOne: data.errors,
  paymentLinkDataDetail: data.dataDetail
})
export const merchantkeySubmitOrdercode = (state, { data }) => state.merge({
  loadingSubmitOrdercode: true,
  errorSubmitOrdercode: [],
  paymentPageUrl: ''
})
export const merchantkeySubmitOrdercodeDone = (state, { data }) => state.merge({
  loadingSubmitOrdercode: false,
  errorSubmitOrdercode: data.errors,
  paymentPageUrl: data.paymentPageUrl
})
export const merchantkeySubmitForm = (state, { data }) => state.merge({
  loadingSubmitForm: true,
  errorSubmitForm: []
})
export const merchantkeySubmitFormDone = (state, { data }) => state.merge({
  openModal: data.openModal,
  loadingSubmitForm: false,
  orderCode: data.orderCode,
  errorSubmitForm: data.errors
})
export const merchantkeyCloseModal = (state) => state.merge({
  openModal: false,
  orderCode: ''
})
export const merchantkeyOpenModal = (state, { data }) => state.merge({
  openModal: true,
  orderCode: data.orderCode
})
export const merchantkeySetOpenSnackBarStatusPayment = (state, { data }) => state.merge({
  openSnackBarStatusPayment: data.open
})
export const merchantkeyCheckStatusPayment = (state, { data }) => state.merge({
  loadingCheckStatusPayment: true
})
export const merchantkeyCheckStatusPaymentDone = (state, { data }) => state.merge({
  paymentStatus: data.paymentStatus,
  loadingCheckStatusPayment: false
})
export const merchantkeyFetchCurrentMerchantKey = (state, { data }) => state.merge({
  loadingFetchCurrentMerchantKey: true
})
export const merchantkeyFetchCurrentMerchantKeyDone = (state, { data }) => state.merge({
  loadingFetchCurrentMerchantKey: false
})
export const merchantkeyUpdateCurrentCallbackUrl = (state, { data }) => state.merge({
  loadingUpdateCurrentCallbackUrl: true
})
export const merchantkeyUpdateCurrentCallbackUrlDone = (state, { data }) => state.merge({
  loadingUpdateCurrentCallbackUrl: false
})

export const updateMerchantKey = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MERCHANTKEY_OPEN_MODAL]: merchantkeyOpenModal,
  [Types.MERCHANTKEY_CLOSE_MODAL]: merchantkeyCloseModal,
  [Types.MERCHANTKEY_SUBMIT_FORM]: merchantkeySubmitForm,
  [Types.MERCHANTKEY_SUBMIT_FORM_DONE]: merchantkeySubmitFormDone,
  [Types.MERCHANTKEY_SUBMIT_ORDERCODE]: merchantkeySubmitOrdercode,
  [Types.MERCHANTKEY_SUBMIT_ORDERCODE_DONE]: merchantkeySubmitOrdercodeDone,
  [Types.MERCHANTKEY_CHECK_STATUS_PAYMENT]: merchantkeyCheckStatusPayment,
  [Types.MERCHANTKEY_CHECK_STATUS_PAYMENT_DONE]: merchantkeyCheckStatusPaymentDone,
  [Types.MERCHANTKEY_FETCH_ONE]: merchantkeyFetchOne,
  [Types.MERCHANTKEY_FETCH_ONE_DONE]: merchantkeyFetchOneDone,
  [Types.MERCHANTKEY_SET_OPEN_SNACK_BAR_STATUS_PAYMENT]: merchantkeySetOpenSnackBarStatusPayment,
  [Types.MERCHANTKEY_FETCH_CURRENT_MERCHANT_KEY]: merchantkeyFetchCurrentMerchantKey,
  [Types.MERCHANTKEY_FETCH_CURRENT_MERCHANT_KEY_DONE]: merchantkeyFetchCurrentMerchantKeyDone,
  [Types.MERCHANTKEY_UPDATE_CURRENT_CALLBACK_URL]: merchantkeyUpdateCurrentCallbackUrl,
  [Types.MERCHANTKEY_UPDATE_CURRENT_CALLBACK_URL_DONE]: merchantkeyUpdateCurrentCallbackUrlDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
