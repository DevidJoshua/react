import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  forgetpasswordSubmitEmail: ['data'],
  forgetpasswordSubmitEmailDone: ['data'],
  forgetpasswordSubmitNewPassword: ['data'],
  forgetpasswordSubmitNewPasswordDone: ['data'],
  forgetpasswordValidateToken: ['data'],
  forgetpasswordValidateTokenDone: ['data'],
  forgetpasswordResetForm: ['data'],
  reset: null
})

export const ForgetpasswordTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  SubmitEmail: { loading: false },
  SubmitNewPassword: { loading: false },
  ValidateToken: { loading: false },
  SubmitToken: { loading: false }
})

export const forgetpasswordSubmitEmailDone = (state, { data }) => state.merge({ SubmitEmail: { ...state.SubmitEmail, loading: false, ...data } })
export const forgetpasswordSubmitEmail = (state, { data }) => state.merge({ SubmitEmail: { ...state.SubmitEmail, loading: true } })
export const forgetpasswordSubmitNewPasswordDone = (state, { data }) => state.merge({ SubmitNewPassword: { ...state.SubmitNewPassword, loading: false, ...data } })
export const forgetpasswordSubmitNewPassword = (state, { data }) => state.merge({ SubmitNewPassword: { ...state.SubmitNewPassword, loading: true } })
export const forgetpasswordValidateTokenDone = (state, { data }) => state.merge({ ValidateToken: { ...state.ValidateToken, loading: false, ...data } })
export const forgetpasswordValidateToken = (state, { data }) => state.merge({ ValidateToken: { ...state.ValidateToken, loading: true } })
export const forgetpasswordResetForm = (state, { data }) => state.merge(INITIAL_STATE)

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FORGETPASSWORD_SUBMIT_EMAIL]: forgetpasswordSubmitEmail,
  [Types.FORGETPASSWORD_SUBMIT_EMAIL_DONE]: forgetpasswordSubmitEmailDone,
  [Types.FORGETPASSWORD_SUBMIT_NEW_PASSWORD]: forgetpasswordSubmitNewPassword,
  [Types.FORGETPASSWORD_SUBMIT_NEW_PASSWORD_DONE]: forgetpasswordSubmitNewPasswordDone,
  [Types.FORGETPASSWORD_VALIDATE_TOKEN]: forgetpasswordValidateToken,
  [Types.FORGETPASSWORD_VALIDATE_TOKEN_DONE]: forgetpasswordValidateTokenDone,
  [Types.FORGETPASSWORD_RESET_FORM]: forgetpasswordResetForm,
  [Types.RESET]: (state) => INITIAL_STATE
})
