import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fetchBankData: ['data'],
  fetchBankDataDone: ['data'],
  reset: null
})

export const BankAccountTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  list_bank:[],
  isRequesting: false,
  errors: null,
  status: 0

})

export const fetchBankData = (state, { data }) => state.merge({ isRequesting: true, ...data })
export const fetchBankDataDone = (state, { data }) => state.merge({ isRequesting: false, ...data })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_BANK_DATA]: fetchBankData,
  [Types.FETCH_BANK_DATA_DONE]: fetchBankDataDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
