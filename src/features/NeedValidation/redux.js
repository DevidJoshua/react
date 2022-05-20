import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  needvalidationFetchData: ['data'],
  needvalidationFetchDataDone: ['data'],
  needvalidationCheckboxOnClick: ['data'],
  needvalidationCheckboxSubmitValidate: ['data'],
  needvalidationCheckboxSubmitValidateDone: ['data'],
  needvalidationCheckboxReset:null,
  reset: null
})

export const NeedvalidationTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  FetchData: { loading: false },
  loadingValidate: false,
  checkbox: {},
  message: '',
  status: 0
})
export const needvalidationCheckboxOnClick = (state, { data }) => state.merge({
  checkbox: { ...state.checkbox, [data.id]: !state.checkbox[data.id] }
})
export const needvalidationCheckboxSubmitValidate = (state, { data }) => state.merge({
  loadingValidate: true
})
export const needvalidationCheckboxSubmitValidateDone = (state, { data }) => state.merge({
  errors: data.errors,
  loadingValidate: false,
  message: data.message,
  status: data.status,
  checkbox: {}
})
export const needValidationFetchDataDone = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: false, ...data } })
export const needValidationFetchData = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: true } })
export const needvalidationCheckboxReset = (state, { data }) => state.merge({ checkbox:[]})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEEDVALIDATION_CHECKBOX_ON_CLICK]: needvalidationCheckboxOnClick,
  [Types.NEEDVALIDATION_CHECKBOX_SUBMIT_VALIDATE]: needvalidationCheckboxSubmitValidate,
  [Types.NEEDVALIDATION_CHECKBOX_SUBMIT_VALIDATE_DONE]: needvalidationCheckboxSubmitValidateDone,
  [Types.NEEDVALIDATION_FETCH_DATA]: needValidationFetchData,
  [Types.NEEDVALIDATION_FETCH_DATA_DONE]: needValidationFetchDataDone,
  [Types.NEEDVALIDATION_CHECKBOX_RESET] : needvalidationCheckboxReset,
  [Types.RESET]: (state) => INITIAL_STATE
})
