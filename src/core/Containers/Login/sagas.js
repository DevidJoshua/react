import { call, put, delay } from 'redux-saga/effects'
import LoginActions from './redux'
import MyprofileActions from '../../features/myprofile/redux'
import AppActions from '../../Redux/AppRedux'
import AppConfig from '../../Config/AppConfig'
import { setSession, destroySession, callErrorToast, miliseconds } from '../../Utils/Utils'
import { path } from 'ramda'
import _ from 'lodash'
import { isNullOrUndefined } from 'util'
import { callToastr } from 'core/Utils/Utils'

export function * doLogout (api, action) {
  const { data } = action
  const response = yield call(api.doLogout, data)
  console.log('Response logout>>>', response)
  const errors = []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  // detect error from body
  const status = parseInt(path(['data', 'data', 'logout', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'logout', 'error'], response) || []
  const errorCommon = path(['data', 'error'], response) || ''
  if (path(['data', 'responseMessage'], response) === 'FAILED_SYSTEM') {
    errors.push({ message: path(['data', 'responseDescription'], response) })
  }

  if (errorbody === 'Invalid token' || errorbody === 'Invalid Access Token' || errorCommon === 'Invalid Access Token') {
    destroySession()
    window.location.replace(`${AppConfig.basePath}/login`)
    yield put(LoginActions.loginDoLogoutSuccess({}))
    yield put(AppActions.reset())
    return
  }

  if (errorbody) errors.push({ message: errorbody })
  if (errorCommon) errors.push({ message: errorCommon })

  if (status === 200) {
    yield put(LoginActions.loginDoLogoutSuccess({}))
    yield put(AppActions.reset())
    destroySession()
    window.location.replace(`${AppConfig.basePath}/login`)
  } else {
    let responseMessage = ''
    if (errors.length > 0) {
      responseMessage = errors.map(error => error.message).join(', ') || 'Something went wrong'
    }
    callErrorToast('Logout error: ' + responseMessage)
    return yield put(LoginActions.loginDoLoginFailed({ responseMessage }))
  }
}
export function * loginCheckLogin (api, action) {
  const { data } = action
  const response = yield call(api.loginCheckLogin, data)
  console.log('loginCheckLogin Response>>>>>>>>>>>>', response)
  const errors = []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })

  // detect error from body
  const dataResponse = path(['data', 'data', 'checkLogin'], response) || {}
  console.log('dataResponse===>', dataResponse)
  const status = parseInt(path(['status'], dataResponse) || 0)
  const errorbody = path(['error', 'message'], dataResponse) || []
  const errorbody2 = path(['error'], dataResponse) || []
  const errorBackend = path(['data', 'errors'], response) || []

  // success data
  const token = path(['access_token'], dataResponse)
  const user = path(['user'], dataResponse) || {}
  const userPrivileges = path(['user_privileges'], dataResponse)
  const userMerchants = path(['user_merchants'], dataResponse)
  // find default merchant
  const merchant = _.find(userMerchants, { is_default: 'Y' })
  const merchantIdd = '1588133343427HsZOX'

  const role = path(['role'], dataResponse)
  const myprofile = user

  if (path(['data', 'responseMessage'], response) === 'FAILED_SYSTEM') {
    errors.push({ message: path(['data', 'responseDescription'], response) })
  }
  if (!_.isEmpty(errorbody)) errors.push({ message: errorbody })
  if (!_.isEmpty(errorbody2)) errors.push({ message: errorbody2 })
  if (!_.isEmpty(errorBackend)) { errors.push({ message: 'System error' }) }

  // success?
  if (response.status === null) {
    callErrorToast(response.problem, 'error')
    return yield put(LoginActions.loginDoLoginFailed({ responseMessage: response.problem }))
  }
  if (_.isEmpty(errors)) {
    console.log('errors empty', errors)
    yield put(MyprofileActions.myprofileSetMyprofile({ myprofile, userPrivileges, role, userMerchants, merchant }))
    setSession({ [AppConfig.idleTimeFlag]: parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds)), [AppConfig.loginFlag]: true, merchant_id: merchantIdd, [AppConfig.sessionToken]: token })
    yield delay(2000)

    // process redirect after login success sudah di handle dari dalam LoginContainer.js
    // window.location.replace(`${AppConfig.basePath}${AppConfig.appHomePage}`)

    yield put(
      LoginActions.loginDoLoginSuccess({
        user,
        token,
        merchant_id: merchantIdd,
        contentDetail: response.data,
        formSubmitMessage: 'success login'
      })
    )
  } else {
    console.log('errors exist', errors)
    // let responseMessage = ''
    // if (errors.length > 0) {
    //   responseMessage = errors.map(error => error.message).join(', ') || 'Something went wrong'
    // }
    const responseCode = status
    // if (!isNullOrUndefined(errors[0].message)) { responseMessage = errors[0].message } else { responseMessage = errors[0] }
    // callErrorToast('Login error. ' + responseMessage, 'responseMessage')
    return yield put(LoginActions.loginDoLoginFailed({ responseCode, responseMessage: '' }))
  }
}
export function * loginDoLogin (api, action) {
  console.log('loginDoLogin')
  const { data } = action
  const response = yield call(api.loginDoLogin, data)
  console.log('Response>>>>>>>>>>>>', response)
  const errors = []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })

  // detect error from body
  const status = parseInt(path(['data', 'data', 'login', 'status'], response) || 0)
  const errorbody = path(['data', 'data', 'login', 'error', 'message'], response) || []
  const errorbody2 = path(['data', 'data', 'login', 'error'], response) || []
  const errorBackend = path(['data', 'errors'], response) || []

  // success data
  const token = path(['data', 'data', 'login', 'access_token'], response)
  const user = path(['data', 'data', 'login', 'user'], response) || {}
  const userPrivileges = path(['data', 'data', 'login', 'user_privileges'], response)
  const userMerchants = path(['data', 'data', 'login', 'user_merchants'], response)
  // find default merchant
  const merchant = _.find(userMerchants, { is_default: 'Y' }) || {}
  const merchantIdd = '1588133343427HsZOX'

  const role = path(['data', 'data', 'login', 'role'], response)
  const myprofile = user

  if (path(['data', 'responseMessage'], response) === 'FAILED_SYSTEM') {
    errors.push({ message: path(['data', 'responseDescription'], response) })
  }
  if (!_.isEmpty(errorbody)) errors.push({ message: errorbody })
  if (!_.isEmpty(errorbody2)) errors.push({ message: errorbody2 })
  if (!_.isEmpty(errorBackend)) { errors.push({ message: 'System error' }) }

  // success?
  if (response.status === null) {
    callErrorToast(response.problem, 'error')
    return yield put(LoginActions.loginDoLoginFailed({ responseMessage: response.problem }))
  }
  if (_.isEmpty(errors)) {
    yield put(MyprofileActions.myprofileSetMyprofile({ myprofile, userPrivileges, role, userMerchants, merchant }))
    setSession({ [AppConfig.idleTimeFlag]: parseInt(new Date().getTime() + miliseconds(AppConfig.idleTimeIncHours, AppConfig.idleTimeIncMinutes, AppConfig.idleTimeIncSeconds)), [AppConfig.loginFlag]: true, merchant_id: merchantIdd, [AppConfig.sessionToken]: token })
    yield delay(2000)

    // process redirect after login success sudah di handle dari dalam LoginContainer.js
    // window.location.replace(`${AppConfig.basePath}${AppConfig.appHomePage}`)

    yield put(
      LoginActions.loginDoLoginSuccess({
        user,
        token,
        merchant_id: merchantIdd,
        contentDetail: response.data,
        formSubmitMessage: 'success login'
      })
    )
  } else {
    const responseCode = status
    let responseMessage = ''
    if (!isNullOrUndefined(errors[0].message)) { responseMessage = errors[0].message } else { responseMessage = errors[0] }
    callToastr(`Ada Kesalahan. ${responseMessage}`,'error')
    return yield put(LoginActions.loginDoLoginFailed({ responseCode, responseMessage }))
  }
}
