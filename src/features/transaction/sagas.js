import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
// import TablepaginationActions from '../../core/features/TablePagination/redux'
// import LoginActions from '../../core/Containers/Login/redux'
// import ManifestPaymentlink from '../../Pages/PaymentLink/Manifest'
import _ from 'lodash'

export function * transactionPaymentStep1 (api, { data }) {
  console.log('transactionPaymentStep1===>', data)
  const response = yield call(api.transactionPaymentStep1, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'paymentStep1Transaction', 'error'], response)
  const paymentPageUrl = path(['data', 'data', 'paymentStep1Transaction', 'paymentPageUrl'], response)
  const paymentStatus = path(['data', 'data', 'paymentStep1Transaction', 'paymentStatus'], response)
  const invoiceNumber = path(['data', 'data', 'paymentStep1Transaction', 'invoiceNumber'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(Actions.transactionPaymentStep1Done({ errors, paymentPageUrl, paymentStatus, invoiceNumber }))
}
export function * transactionCheckStatusPayment (api, { data }) {
  console.log('transactionCheckStatusPayment===>', data)
  const response = yield call(api.transactionCheckStatusPayment, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'checkStatusTransaction', 'error'], response)
  const paymentStatus = path(['data', 'data', 'checkStatusTransaction', 'data_detail', 'status'], response) || 'pending'
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(Actions.transactionSetOpenSnackBarStatusPayment({ open: true }))
  yield put(Actions.transactionCheckStatusPaymentDone({ errors, paymentStatus }))
}
