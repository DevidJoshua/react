import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import { consumeGraphqlResponse } from '../../Transforms/TransformAttributes'
import { callErrorToast } from '../../Utils/Utils'
export function * forgetpasswordSubmitEmail (api, { data }) {
  const resp = consumeGraphqlResponse({ response: yield call(api.forgetpasswordSubmitEmail, data), serviceName: 'forgetpasswordSubmitEmail' })
  let successMessage
  if (resp.errors.length === 0) {
    successMessage = 'Link validasi berhasil dikirim ke email anda. Klik link tersebut untuk merubah password.'
  }else{
    callErrorToast(`Terjadi kesalahan: ${resp.errors[0]['message']}`, 'error')
  }
  yield put(Actions.forgetpasswordSubmitEmailDone({ ...resp, successMessage }))
}
export function * forgetpasswordValidateToken (api, { data }) {
  const resp = consumeGraphqlResponse({ response: yield call(api.forgetpasswordValidateToken, data), serviceName: 'forgetpasswordValidateToken' })
  yield put(Actions.forgetpasswordValidateTokenDone(resp))
}
export function * forgetpasswordSubmitNewPassword (api, { data }) {
  const resp = consumeGraphqlResponse({ response: yield call(api.forgetpasswordSubmitNewPassword, data), serviceName: 'forgetpasswordSubmitNewPassword' })
  if (resp.errors.length === 0) {
    callErrorToast('Password berhasil diganti', 'success')
    yield call(data.history.push, '/login')
  }
  yield put(Actions.forgetpasswordSubmitNewPasswordDone(resp))
}
