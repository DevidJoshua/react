import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import { path } from 'ramda'
import _ from 'lodash'
import { consumeApiResponse } from 'core/Transforms/TransformAttributes'
import LoginActions from '../../core/Containers/Login/redux'
import { callErrorToast } from '../../core/Utils/Utils'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import ManifestBoNeedApproval from '../../Pages/BoNeedApproval/Manifest'
import NeedApprovalActions from './redux'
export function * needApprovalFetchData (api, { data }) {
  const resp = consumeApiResponse({ response: yield call(api.needApprovalFetchData, data) })
  yield put(Actions.needApprovalFetchDataDone({ ...resp }))
}
export function * needapprovalCheckboxSubmitApprove (api, { data }) {
  console.log('needapprovalCheckboxSubmitApprove data', data)
  const checkboxData = data.needapprovalCheckbox
  if(Object.keys(checkboxData).length < 1 ) return callErrorToast("Please make sure to select data before submit", 'error')

  const response = yield call(api.needapprovalCheckboxSubmitApprove, data)
  console.log('response======>', response)
  const status = path(['data', 'data', data.approveServiceEntity, 'status'], response) || 500
  let message = path(['data', 'data', data.approveServiceEntity, 'message'], response) || ''
  
  if (status === 200) {
    yield put(NeedApprovalActions.needapprovalResetCheckbox())
    // need reload
    yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestBoNeedApproval.listallService]: true } }))
    // bisnis process success
    callErrorToast(message, 'success')
  } else {
    // error from springboot filter
    const errors = path(['data', 'errors'], response) || []
    const errorBody2 = path(['data', 'error'], response)
    if (!_.isEmpty(message)) errors.push({ message: message })
    if (!_.isEmpty(errorBody2)) errors.push({ message: errorBody2 })
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    
    // error from bisnis process if any
    const errorBody = path(['data', 'data',data.approveServiceEntity, 'error'], response)
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
  yield put(Actions.needapprovalCheckboxSubmitApproveDone({ message, status }))
}
export function * needapprovalCheckboxSubmitReject (api, { data }) {
  
  const checkboxData = data.needapprovalCheckbox
  if(Object.keys(checkboxData).length < 1 ) return callErrorToast("Please make sure to select data before submit", 'error')
  
  const response = yield call(api.needapprovalCheckboxSubmitReject, data)
  console.log('response reject====>', response)
  const status = path(['data', 'data', data.rejectServiceEntity, 'status'], response) || 500
  let message = path(['data', 'data', data.rejectServiceEntity, 'message'], response) || ''
  if (status === 200) {
    yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestBoNeedApproval.listallService]: true } }))
    // bisnis process success
    callErrorToast(message, 'success')
  } else {
    const errors = path(['data', 'errors'], response) || []
    const errorBody2 = path(['data', 'error'], response)
    if (!_.isEmpty(message)) errors.push({ message: message })
    if (!_.isEmpty(errorBody2)) errors.push({ message: errorBody2 })
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    // error from bisnis process if any
    const errorBody = path(['data', 'data', data.rejectServiceEntity, 'error'], response)
    if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
    console.log('errors====>', errors)
    if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
      console.log('do logout karena at exp')
      yield put(LoginActions.loginDoLogout({}))
    } else if (!_.isEmpty(errors)) {
      errors.forEach(element => {
        callErrorToast(element.message, 'error')
      })
      yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestBoNeedApproval.listallService]: true } }))
    } else {
      message = errors.map(i => i.message).join(',')
      // need reload
      yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestBoNeedApproval.listallService]: true } }))
      callErrorToast('Reject Succed', 'success')
    }
    yield put(Actions.needapprovalCheckboxSubmitRejectDone({ message, status }))
  }
}
