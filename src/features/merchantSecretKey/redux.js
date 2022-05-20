import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

const { Types, Creators } = createActions({
  fetchMerchantSecretKey:['data'],
  fetchMerchantSecretKeyDone:['data'],
  closeMerchantSecretKeyModal:['data'],
  openMerchantSecretKeyModal:['data'],
  resetMerchantSecretKey:['data'],
  reset: null
})

export const MerchantSecretKeyTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
  loading: false,
  openModal: false,
  scrt:null,
  key_id:null,
  error:''
})

export const fetchMerchantSecretKey = (state, { data }) => state.merge({...state,loading: true})

export const fetchMerchantSecretKeyDone = (state, { data }) => state.merge({...state,loading: false,scrt:data.scrt, key_id: data.key_id})

export const closeMerchantSecretKeyModal = (state, { data }) => state.merge({...state, scrt:'',openModal:false})

export const openMerchantSecretKeyModal = (state, { data }) => state.merge({...state,openModal:true,scrt:''})
export const resetMerchantSecretKey = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_MERCHANT_SECRET_KEY]: resetMerchantSecretKey,
  [Types.FETCH_MERCHANT_SECRET_KEY]: fetchMerchantSecretKey,
  [Types.FETCH_MERCHANT_SECRET_KEY_DONE]: fetchMerchantSecretKeyDone,
  [Types.CLOSE_MERCHANT_SECRET_KEY_MODAL]: closeMerchantSecretKeyModal,
  [Types.OPEN_MERCHANT_SECRET_KEY_MODAL]: openMerchantSecretKeyModal,
  [Types.RESET]: (state) => INITIAL_STATE
})
