import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import { path } from 'ramda'
import _ from 'lodash'
import LoginActions from 'core/Containers/Login/redux'
import { callErrorToast } from 'core/Utils/Utils'
import { consumeApiResponse } from 'core/Transforms/TransformAttributes'
import TablepaginationActions from 'core/features/TablePagination/redux'
import ManifestNeedValidation from 'Pages/BoNeedValidation/Manifest'
// import { callErrorToast } from '../../Utils/Utils'
export function * needValidationFetchData (api, { data }) {
  const resp = consumeApiResponse({ response: yield call(api.needValidationFetchData, data) })
  yield put(Actions.needValidationFetchDataDone({ ...resp }))
}
export function * needvalidationCheckboxSubmitValidate (api, { data }) {
  console.log('needvalidationCheckboxSubmitValidate data', data)
  const response = yield call(api.needvalidationCheckboxSubmitValidate, data)
  const status = path(['data', 'data', 'needvalidationCheckboxSubmitValidate', 'status'], response) || 500
  let message = path(['data', 'data', 'needvalidationCheckboxSubmitValidate', 'message'], response) || ''
  if (status === 200) {
    callErrorToast(message, 'success')
    yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestNeedValidation.listallService]: true } }))
  } else {
    const errors = path(['data', 'errors'], response) || []
    const errorBody2 = path(['data', 'error'], response)
    if (!_.isEmpty(message)) errors.push({ message: message })
    if (!_.isEmpty(errorBody2)) errors.push({ message: errorBody2 })
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    const errorBody = path(['data', 'data', 'needvalidationCheckboxSubmitValidate', 'error'], response)
    if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
    console.log('errors====>', errors)
    if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
      console.log('do logout karena at exp')
      yield put(LoginActions.loginDoLogout({}))
    } else {
      message = errors.map(i => i.message).join(',')
      callErrorToast(message || 'unknown error from backend', 'error')
    }
  }
  yield put(Actions.needvalidationCheckboxSubmitValidateDone({ message, status }))
}
