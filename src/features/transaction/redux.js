import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  transactionPaymentStep1: ['data'],
  transactionPaymentStep1Done: ['data'],
  transactionSetOpenSnackBarStatusPayment: ['data'],
  transactionCheckStatusPayment: ['data'],
  transactionCheckStatusPaymentDone: ['data'],
  reset: null
})

export const TransactionTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  loadingFetchOne: false,
  errorFetchOne: [],
  openSnackBarStatusPayment: false,
  dataDetail: {},
  paymentStatus: '',
  paymentPageUrl: '',
  invoiceNumber: '',
  loadingCheckStatusPayment: false,
  errorCheckStatusPayment: []
})

export const transactionPaymentStep1 = (state, { data }) => state.merge({
  loadingFetchOne: true,
  errorFetchOne: []
})
export const transactionPaymentStep1Done = (state, { data }) => state.merge({
  loadingFetchOne: false,
  errorFetchOne: data.errors,
  paymentPageUrl: data.paymentPageUrl,
  invoiceNumber: data.invoiceNumber,
  paymentStatus: data.paymentStatus
})
export const transactionSetOpenSnackBarStatusPayment = (state, { data }) => state.merge({
  openSnackBarStatusPayment: data.open
})
export const transactionCheckStatusPayment = (state, { data }) => state.merge({
  loadingCheckStatusPayment: true,
  errorCheckStatusPayment: []
})
export const transactionCheckStatusPaymentDone = (state, { data }) => state.merge({
  paymentStatus: data.paymentStatus,
  loadingCheckStatusPayment: false,
  errorCheckStatusPayment: data.errors
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TRANSACTION_CHECK_STATUS_PAYMENT]: transactionCheckStatusPayment,
  [Types.TRANSACTION_CHECK_STATUS_PAYMENT_DONE]: transactionCheckStatusPaymentDone,
  [Types.TRANSACTION_PAYMENT_STEP1]: transactionPaymentStep1,
  [Types.TRANSACTION_PAYMENT_STEP1_DONE]: transactionPaymentStep1Done,
  [Types.TRANSACTION_SET_OPEN_SNACK_BAR_STATUS_PAYMENT]: transactionSetOpenSnackBarStatusPayment,
  [Types.RESET]: (state) => INITIAL_STATE
})
