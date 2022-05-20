import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  paymentlinkFetchOne: ['data'],
  paymentlinkFetchOneDone: ['data'],
  paymentlinkSubmitForm: ['data'],
  paymentlinkSubmitFormDone: ['data'],
  paymentlinkCloseModal: null,
  paymentlinkOpenModal: ['data'],
  paymentlinkSubmitOrdercode: ['data'],
  paymentlinkSubmitOrdercodeDone: ['data'],
  paymentlinkSetOpenSnackBarStatusPayment: ['data'],
  paymentlinkCheckStatusPayment: ['data'],
  paymentlinkCheckStatusPaymentDone: ['data'],
  paymentlinkSubmitFormError:['data'],
  paymentlinkToogleRowData:['data'],
  paymentlinkToogleRowDataDone:['data'],
  closeIdCodeModal:null,
  reset: null
})

export const PaymentlinkTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  payload: {},
  loading: {},
  loadingSubmitForm: false,
  idCode:'',
  loadingFetchOne: false,
  errorFetchOne: [],
  errorSubmitForm: [],
  loadingSubmitOrdercode: false,
  errorSubmitOrdercode: [],
  openIdModal:false,
  openModal: false,
  openSnackBarStatusPayment: false,
  orderCode: '',
  paymentPageUrl: '',
  paymentLinkDataDetail: {},
  paymentStatus: '',
  loadingCheckStatusPayment: false,
  toogleRow:[]
})

export const paymentlinkFetchOne = (state, { data }) => state.merge({
  loadingFetchOne: true,
  errorFetchOne: [],
  paymentLinkDataDetail: {}
})
export const paymentlinkFetchOneDone = (state, { data }) => state.merge({
  loadingFetchOne: false,
  errorFetchOne: data.errors,
  paymentLinkDataDetail: data.dataDetail
})
export const paymentlinkSubmitOrdercode = (state, { data }) => state.merge({
  loadingSubmitOrdercode: true,
  errorSubmitOrdercode: [],
  paymentPageUrl: ''
})
export const paymentlinkSubmitOrdercodeDone = (state, { data }) => state.merge({
  loadingSubmitOrdercode: false,
  errorSubmitOrdercode: data.errors,
  paymentPageUrl: data.paymentPageUrl
})
export const paymentlinkSubmitForm = (state, { data }) => state.merge({
  loadingSubmitForm: true
})
export const paymentlinkSubmitFormDone = (state, { data }) => {
  return state.merge({
    loadingSubmitForm: false,
    openModal: data.openModal ? data.openModal : false,
    openIdModal:data.openIdModal,
    idCode: data.idCode,
    errorSubmitForm: data.errors
  })
}
export const paymentlinkSubmitFormError = (state, { data }) =>state.merge({...data,loadingSubmitForm: false,openModal:true})

export const paymentlinkCloseModal = (state) => state.merge({
  openModal: false,
  orderCode: ''
})
export const paymentlinkOpenModal = (state, { data }) => state.merge({
  openModal: true,
  orderCode: data.orderCode,
  idCode:''
})
export const paymentlinkSetOpenSnackBarStatusPayment = (state, { data }) => state.merge({
  openSnackBarStatusPayment: data.open
})
export const paymentlinkCheckStatusPayment = (state, { data }) => state.merge({
  loadingCheckStatusPayment: true
})
export const paymentlinkCheckStatusPaymentDone = (state, { data }) => state.merge({
  paymentStatus: data.paymentStatus,
  loadingCheckStatusPayment: false
})
export const closeIdCodeModal = (state,{data})=>state.merge({
  openIdModal:false
})

export const paymentlinkToogleRowData = (state, { data }) => {
  const {idPaymentlink} =  data
  let toogleRow = Immutable.asMutable(state.toogleRow)
  toogleRow.push(idPaymentlink)
  return state.merge({ ...state,toogleRow}) 
}

export const paymentlinkToogleRowDataDone = (state, { data }) => {
  const {ids} =  data
  let toogles = Immutable.asMutable(state.toogleRow)
  let toogleRow = []

  ids.filter(r=>{
    return toogles.filter(s=> s !== r.id )
  })

  return state.merge({ ...state,toogleRow})
}

export const reducer = createReducer(INITIAL_STATE, {
  [Types.PAYMENTLINK_SUBMIT_FORM_ERROR]: paymentlinkSubmitFormError,
  [Types.PAYMENTLINK_OPEN_MODAL]: paymentlinkOpenModal,
  [Types.PAYMENTLINK_CLOSE_MODAL]: paymentlinkCloseModal,
  [Types.PAYMENTLINK_SUBMIT_FORM]: paymentlinkSubmitForm,
  [Types.PAYMENTLINK_SUBMIT_FORM_DONE]: paymentlinkSubmitFormDone,
  [Types.PAYMENTLINK_SUBMIT_ORDERCODE]: paymentlinkSubmitOrdercode,
  [Types.PAYMENTLINK_SUBMIT_ORDERCODE_DONE]: paymentlinkSubmitOrdercodeDone,
  [Types.PAYMENTLINK_CHECK_STATUS_PAYMENT]: paymentlinkCheckStatusPayment,
  [Types.PAYMENTLINK_CHECK_STATUS_PAYMENT_DONE]: paymentlinkCheckStatusPaymentDone,
  [Types.PAYMENTLINK_FETCH_ONE]: paymentlinkFetchOne,
  [Types.PAYMENTLINK_FETCH_ONE_DONE]: paymentlinkFetchOneDone,
  [Types.PAYMENTLINK_SET_OPEN_SNACK_BAR_STATUS_PAYMENT]: paymentlinkSetOpenSnackBarStatusPayment,
  [Types.PAYMENTLINK_TOOGLE_ROW_DATA]: paymentlinkToogleRowData,
  [Types.PAYMENTLINK_TOOGLE_ROW_DATA_DONE]: paymentlinkToogleRowDataDone,
  [Types.CLOSE_ID_CODE_MODAL]: closeIdCodeModal,
  [Types.RESET]: (state) => INITIAL_STATE
})
