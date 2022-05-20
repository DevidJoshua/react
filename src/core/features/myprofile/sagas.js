import { call, put, delay, select } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
// import TablepaginationActions from '../../features/TablePagination/redux'
import LoginActions from '../../Containers/Login/redux'
// import ManifestMerchantkey from '../../Pages/MerchantKey/Manifest'
import _ from 'lodash'

export function * myprofileChangeMerchant (api, { data }) {
  const state = yield select()
  const { merchant } = data
  const response = yield call(api.myprofileChangeMerchant, { merchant_id: merchant.id })
  const errors = path(['data', 'errors'], response) || []
  let userPrivileges = path(['data', 'data', 'myprofileChangeMerchant', 'user_privileges'], response)
  if (_.isEmpty(userPrivileges)) userPrivileges = state.myprofile.user_privileges
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'myprofileChangeMerchant', 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  }
  yield put(Actions.myprofileChangeMerchantDone({ errors, merchant: data.merchant, userPrivileges }))
  yield delay(1000)
  window.location.reload()
}
