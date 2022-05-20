import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import LoginActions from '../../core/Containers/Login/redux'
import ManifestDonationlink from '../../Pages/DonationLink/Manifest'
import _ from 'lodash'

export function * donationlinkSubmitForm (api, { data }) {
  const response = yield call(api.donationlinkSubmitForm, data)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []  
  const error2 = error1[0]['locations']['message']
  const error3 = path(['data', 'data', 'upsertDonationLink', 'error'], response)
  const orderCode = path(['data', 'data', 'upsertDonationLink', 'detail_data', 'order_code'], response)
  
  if (!_.isEmpty(error1) && _.isEmpty(error2)) errors.push({ message: error1 })
  if (!_.isEmpty(error2)) errors.push({ message: error2 })
  if (!_.isEmpty(error3)) errors.push({ message: error3 })

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
  } else {
    yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestDonationlink.listallService]: true } }))
  }
  yield put(Actions.donationlinkSubmitFormDone({ errors, orderCode }))

}
export function * donationlinkSubmitOrdercode (api, { data }) {
  console.log('datadatadatadata===>', data)
  const response = yield call(api.donationlinkSubmitOrdercode, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'payDonationLink', 'error'], response)
  const transactionId = path(['data', 'data', 'payDonationLink', 'transaction_id'], response)
  const paymentStatus = path(['data', 'data', 'payDonationLink', 'payment_status'], response)
  if (paymentStatus === 'paid') errors.push({ message: 'order code telah berhasil dibayar' })
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })


  yield put(Actions.donationlinkSubmitOrdercodeDone({ errors }))
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    console.log('ada errorss')
  } else {
    console.log('redirect to step2')
    data.history.push(`/payment-step2/${data.toko_id}/${transactionId}`)
  }
}
export function * donationlinkFetchOne (api, { data }) {
  console.log('donationlinkFetchOne===>', data)
  const response = yield call(api.donationlinkFetchOne, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'getDetailDonationLink', 'error'], response)
  const dataDetail = path(['data', 'data', 'getDetailDonationLink', 'data_detail'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
  } else {
    
  }
  yield put(Actions.donationlinkFetchOneDone({ errors, dataDetail }))
}
export function * donationlinkCheckStatusPayment (api, { data }) {
  console.log('donationlinkCheckStatusPayment===>', data)
  const response = yield call(api.donationlinkCheckStatusPayment, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'checkStatusTransaction', 'error'], response)
  const paymentStatus = path(['data', 'data', 'checkStatusTransaction', 'data_detail', 'status'], response) || 'pending'
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
  } else {
  }
  yield put(Actions.donationlinkSetOpenSnackBarStatusPayment({ open: true }))
  yield put(Actions.donationlinkCheckStatusPaymentDone({ errors, paymentStatus }))
}
