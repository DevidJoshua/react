import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import LoginActions from '../../core/Containers/Login/redux'
import _ from 'lodash'
import swal from 'sweetalert2'

import { callToastr } from 'core/Utils/Utils'

export function * doPayVirtualAccount (api, { data }) {
  const response = yield call(api.payVa, data)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []  
  // const error2 = error1[0]['locations']['message']
  const error3 = path(['data', 'data', 'payVaTransactionSimulator', 'error'], response)
  const message = path(['data', 'data', 'payVaTransactionSimulator', 'message'], response)

  if (!_.isEmpty(error1) ){
    if(typeof error1 === 'string'){
      errors.push({ message: error1 })
    }else{
      errors.push({ message: error1[0]['message'] })
    }
  }
  
  if (!_.isEmpty(error3)) errors.push({ message: error3 })

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    swal.fire('Pembayaran Gagal',errors[0]['message'],'error')
  }else{
    swal.fire('Pembayaran Sukses','','success')
  }
  yield put(Actions.doPayVirtualAccountDone({ errors,message }))
}

export function * doPayQris (api, { data }) {
  const response = yield call(api.payQris, data)
  console.log('response qris====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []  
  // const error2 = error1[0]['locations']['message']
  const error3 = path(['data', 'data', 'payQrTransactionSimulator', 'error'], response)
  const message = path(['data', 'data', 'payQrTransactionSimulator', 'message'], response)
  
  if (!_.isEmpty(error1) ){
    if(typeof error1 === 'string'){
      errors.push({ message: error1 })
    }else{
      errors.push({ message: error1[0]['message'] })
    }
  }
  if (!_.isEmpty(error3)) errors.push({ message: error3 })

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    swal.fire('Pembayaran Gagal',errors[0]['message'],'error')
  }else{
    swal.fire('Pembayaran Sukses','','success')
  }
  yield put(Actions.doPayQrisDone({ errors,message }))
}
