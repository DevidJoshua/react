import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  needapprovalFetchData: ['data'],
  needapprovalFetchDataDone: ['data'],
  needapprovalCheckboxOnClick: ['data'],
  needapprovalCheckboxSubmitApprove: ['data'],
  needapprovalCheckboxSubmitApproveDone: ['data'],
  needapprovalCheckboxSubmitReject: ['data'],
  needapprovalCheckboxSubmitRejectDone: ['data'],
  needapprovalResetCheckbox: null,
  reset: null
})

export const NeedapprovalTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  FetchData: { loading: false },
  loadingApprove: false,
  loadingReject: false,
  checkbox: {},
  message: '',
  status: 0
})
export const needapprovalCheckboxOnClick = (state, { data }) => state.merge({
  checkbox: { ...state.checkbox, [data.id]: !state.checkbox[data.id] }
})
export const needapprovalCheckboxSubmitApprove = (state, { data }) => state.merge({
  loadingApprove: true
})
export const needapprovalCheckboxSubmitApproveDone = (state, { data }) => state.merge({
  errors: data.errors,
  message: data.message,
  status: data.status,
  loadingApprove: false,
  checkbox: {}
})
export const needapprovalCheckboxSubmitReject = (state, { data }) => state.merge({
  loadingReject: true
})
export const needapprovalCheckboxSubmitRejectDone = (state, { data }) => state.merge({
  errors: data.errors,
  loadingReject: false,
  checkbox: {}
})
export const needapprovalFetchDataDone = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: false, ...data } })
export const needapprovalFetchData = (state, { data }) => state.merge({ FetchData: { ...state.FetchData, loading: true } })
export const needapprovalResetCheckbox = (state, { data }) => state.merge({ checkbox: [] })


export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEEDAPPROVAL_CHECKBOX_SUBMIT_APPROVE]: needapprovalCheckboxSubmitApprove,
  [Types.NEEDAPPROVAL_CHECKBOX_SUBMIT_APPROVE_DONE]: needapprovalCheckboxSubmitApproveDone,
  [Types.NEEDAPPROVAL_CHECKBOX_SUBMIT_REJECT]: needapprovalCheckboxSubmitReject,
  [Types.NEEDAPPROVAL_CHECKBOX_SUBMIT_REJECT_DONE]: needapprovalCheckboxSubmitRejectDone,
  [Types.NEEDAPPROVAL_CHECKBOX_ON_CLICK]: needapprovalCheckboxOnClick,
  [Types.NEEDAPPROVAL_FETCH_DATA]: needapprovalFetchData,
  [Types.NEEDAPPROVAL_FETCH_DATA_DONE]: needapprovalFetchDataDone,
  [Types.NEEDAPPROVAL_RESET_CHECKBOX]: needapprovalResetCheckbox,
  [Types.RESET]: (state) => INITIAL_STATE
})
