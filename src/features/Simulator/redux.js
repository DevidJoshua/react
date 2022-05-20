import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  doPayVirtualAccount: ['data'],
  doPayVirtualAccountDone: ['data'],
  doPayQris:['data'],
  doPayQrisDone:['data'],
  setOpenQrModal:['data'],
  setCloseQrModal:['data'],
  reset: null
})

export const SimulatorTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  payload: {},
  isloadingVa: false,
  isloadingQr: false,
  isOpenModalQr:false,
  statusVa:null,
  statusQr:null,
  onPayQris:false,
  reload:true
})

export const doPayVirtualAccount = (state, { data }) => state.merge({
  isloadingVa:true,
})

export const doPayVirtualAccountDone = (state, { data }) => state.merge({
  isloadingVa:false,
  reload:!state.reload,
  ...data
})

export const doPayQris = (state, { data }) => state.merge({
  ...state,
  isloadingQr:true,
  isOpenModalQr : false
})

export const doPayQrisDone = (state, { data }) => state.merge({
  ...state,
  isloadingQr:false,
  reload:!state.reload,
  ...data,
})

export const setOpenQrModal = (state, {data}) => state.merge({
  ...state,
  isOpenModalQr : true
})

export const setCloseQrModal = (state, {data}) => state.merge({
  ...state,
  isOpenModalQr : false
})


export const reducer = createReducer(INITIAL_STATE, {
  [Types.DO_PAY_VIRTUAL_ACCOUNT]: doPayVirtualAccount,
  [Types.DO_PAY_VIRTUAL_ACCOUNT_DONE]: doPayVirtualAccountDone,
  [Types.DO_PAY_QRIS]: doPayQris,
  [Types.DO_PAY_QRIS_DONE]: doPayQrisDone,
  [Types.SET_OPEN_QR_MODAL]: setOpenQrModal,
  [Types.SET_CLOSE_QR_MODAL]: setCloseQrModal,
  [Types.RESET]: (state) => INITIAL_STATE
})
