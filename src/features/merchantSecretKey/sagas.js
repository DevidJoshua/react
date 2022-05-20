import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import TablepaginationActions from 'core/features/TablePagination/redux'
import MyProfileActions from 'core/features/myprofile/redux'
import LoginActions from '../../core/Containers/Login/redux'
import ManifestMerchantkey from '../../Pages/MerchantKey/Manifest'
import { callErrorToast } from 'core/Utils/Utils'
import _ from 'lodash'
import { callToastr } from 'core/Utils/Utils'
import MerchantKeyActions from '../merchantKey/redux'



export function * dofetchMerchantSecretKey (api, { data }) {

  const serviceName = data.merchantId === undefined ? 'fetchMerchantSecretKey' : 'fetchMerchantSecretKeyById'
  const responseName = data.merchantId === undefined ? 'generateMerchantKey' : 'generateMerchantKeyById'

  const response = yield call(api[serviceName], data)

  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })  
  console.log('response===>', response)
  const errorBody = path(['data', 'data', responseName, 'error'], response)
  const scrt = path(['data', 'data', responseName, 'secret_key'], response)
  const key_id = path(['data', 'data', responseName, 'key_id'], response)

  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    yield put(Actions.fetchMerchantSecretKeyDone({openModal:false}))
    console.log("data error=======",errors)
    callToastr(`Ada Kesalahan. ${typeof(errors[0]) === 'string'? errors[0] : errors[0]['message']}`,'error')
  } else {
    callToastr('Success Generating Secret Key','success')
    yield put(TablepaginationActions.setReloadDetail({serviceName:data.serviceReference}))
    yield put(Actions.fetchMerchantSecretKeyDone({openModal:true,scrt,key_id}))
  }
  
}