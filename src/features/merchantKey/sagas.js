import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import TablepaginationActions from 'core/features/TablePagination/redux'
import MyProfileActions from 'core/features/myprofile/redux'
import LoginActions from '../../core/Containers/Login/redux'
import ManifestMerchantkey from '../../Pages/MerchantKey/Manifest'
import { callErrorToast } from 'core/Utils/Utils'
import _ from 'lodash'

export function * merchantkeySubmitForm (api, { data }) {
  const response = yield call(api.merchantkeySubmitForm, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'createMerchantKeyByMerchantId', 'error'], response)
  const orderCode = path(['data', 'data', 'createMerchantKeyByMerchantId', 'detail_data', 'order_code'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  let openModal = true
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    // errors.forEach(element => {
    //   // callErrorToast(element.message, 'error')
    // })
  } else {
    // callErrorToast('success', 'success')
    // if (formSchema.onSuccess) formSchema.onSuccess({ doc: detailData })
    // reload table
    openModal = false
    yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestMerchantkey.listallService]: true } }))
  }
  yield put(Actions.merchantkeySubmitFormDone({ errors, orderCode, openModal }))
}
export function * merchantkeyFetchCurrentMerchantKey (api, { data }) {
  console.log('merchantkeyFetchCurrentMerchantKeymerchantkeyFetchCurrentMerchantKey')
  const response = yield call(api.merchantkeyFetchCurrentMerchantKey, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'merchantkeyFetchCurrentMerchantKey', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    // errors.forEach(element => {
    // callErrorToast(element.message, 'error')
    // })
  } else {
    // callErrorToast('success', 'success')
    // if (formSchema.onSuccess) formSchema.onSuccess({ doc: detailData })
    // reload table
    // openModal = false
    const integrationParams = {
      backend_callback_url: path(['data', 'data', 'getCurrentMerchantKey', 'backend_callback_url'], response) || '',
      frontend_callback_url: path(['data', 'data', 'getCurrentMerchantKey', 'frontend_callback_url'], response) || '',
      merchant_code: path(['data', 'data', 'getCurrentMerchantKey', 'merchant_code'], response) || '',
      encrypted_secret_key: path(['data', 'data', 'getCurrentMerchantKey', 'encrypted_secret_key'], response) || '',
      key_id: path(['data', 'data', 'getCurrentMerchantKey', 'key_id'], response) || ''
    }
    console.log('integrationParams===>', integrationParams)
    yield put(MyProfileActions.myprofileSetIntegrationParams({ integrationParams }))
  }
  yield put(Actions.merchantkeyFetchCurrentMerchantKeyDone({ errors }))
}
export function * merchantkeyUpdateCurrentCallbackUrl (api, { data }) {
  console.log('merchantkeyUpdateCurrentCallbackUrl')
  const response = yield call(api.merchantkeyUpdateCurrentCallbackUrl, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'updateCurrentCallbackUrl', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    const integrationParams = {
      backend_callback_url: path(['data', 'data', 'updateCurrentCallbackUrl', 'backend_callback_url'], response) || '',
      frontend_callback_url: path(['data', 'data', 'updateCurrentCallbackUrl', 'frontend_callback_url'], response) || ''
    }
    yield put(MyProfileActions.myprofileSetIntegrationParams({ integrationParams }))
  }
  yield put(Actions.merchantkeyUpdateCurrentCallbackUrlDone({ errors }))
}
