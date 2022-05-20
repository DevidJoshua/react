import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import TablepaginationActions from '../../core/features/TablePagination/redux'
import LoginActions from '../../core/Containers/Login/redux'
import ManifestPaymentlink from '../../Pages/PaymentLink/Manifest'
import _ from 'lodash'
import swal from 'sweetalert2'
import {callToastr} from '../../core/Utils/Utils'
export function * paymentlinkSubmitForm (api, { data }) {
  try{
    const {formErrors} = data
    if(formErrors && formErrors.length > 0) throw {message:formErrors.join(', '),type:"Error Validasi"}
    const response = yield call(api.paymentlinkSubmitForm, data)
    const errors = path(['data', 'errors'], response) || []
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    const errorBody = path(['data', 'data', 'createPaymentLink', 'error'], response)
    const idCode = path(['data', 'data', 'createPaymentLink', 'paymentLink', 'idCode'], response)
    const paymentlinkId = path(['data', 'data', 'createPaymentLink', 'paymentLink', 'id'], response)


    if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
      yield put(LoginActions.loginDoLogout({}))
    }

    //parse error
    if(!_.isEmpty(errorBody)||!_.isEmpty(errors)){
      if (!_.isEmpty(errorBody)) errors.push(errorBody)
      yield put(Actions.paymentlinkSubmitFormDone({ errors,openModal:true,openIdModal:false}))
      throw {message:typeof(errors[0]) === 'string'? errors[0] : errors[0]['message'],type:"Terjadi kesalahan"}
    }else {
      // reload table
      yield put(Actions.paymentlinkSubmitFormDone({ errors, idCode,paymentlinkId,openIdModal:true}))
      yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestPaymentlink.listallService]: true,openIdModal:true } }))
    }  
  }catch(err){
    yield put(Actions.paymentlinkSubmitFormError())
    if(typeof err.message === "string"){
      swal.fire('Ada Kesalahan',err.message,'error')
    }else{
      const {message,type} = err.message
      swal.fire(type,message,'error')
    }
  }
}
export function * paymentlinkSubmitOrdercode (api, { data }) {
  console.log('datadatadatadata===>', data)
  const response = yield call(api.paymentlinkSubmitOrdercode, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'payPaymentLink', 'error'], response)
  // const paymentPageUrl = path(['data', 'data', 'payPaymentLink', 'payment_page_url'], response)
  const transactionId = path(['data', 'data', 'payPaymentLink', 'transaction_id'], response)
  // const paymentlinkId = path(['data', 'data', 'payPaymentLink', 'paymentlink_id'], response)
  const paymentStatus = path(['data', 'data', 'payPaymentLink', 'payment_status'], response)
  if (paymentStatus === 'paid') errors.push({ message: 'order code telah berhasil dibayar' })
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
  yield put(Actions.paymentlinkSubmitOrdercodeDone({ errors }))
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    console.log('ada errorss')
    // errors.forEach(element => {
    //   // callErrorToast(element.message, 'error')
    // })
  } else {
    console.log('redirect to step2')
    data.history.push(`/payment-step2/${data.toko_id}/${transactionId}`)
    // callErrorToast('success', 'success')
    // if (formSchema.onSuccess) formSchema.onSuccess({ doc: detailData })
    // reload table
    // yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestPaymentlink.listallService]: true } }))
  }
}
export function * paymentlinkFetchOne (api, { data }) {
  console.log('paymentlinkFetchOne===>', data)
  const response = yield call(api.paymentlinkFetchOne, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'getDetailPaymentLink', 'error'], response)
  const dataDetail = path(['data', 'data', 'getDetailPaymentLink', 'data_detail'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
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
    // yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestPaymentlink.listallService]: true } }))
  }
  yield put(Actions.paymentlinkFetchOneDone({ errors, dataDetail }))
}
export function * paymentlinkCheckStatusPayment (api, { data }) {
  console.log('paymentlinkCheckStatusPayment===>', data)
  const response = yield call(api.paymentlinkCheckStatusPayment, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'checkStatusTransaction', 'error'], response)
  const paymentStatus = path(['data', 'data', 'checkStatusTransaction', 'data_detail', 'status'], response) || 'pending'
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  console.log('errors====>', errors)
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
    // yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestPaymentlink.listallService]: true } }))
  }
  yield put(Actions.paymentlinkSetOpenSnackBarStatusPayment({ open: true }))
  yield put(Actions.paymentlinkCheckStatusPaymentDone({ errors, paymentStatus }))
}
export function * changePaymentlinkStatus (api, { data }) {
  console.log('changePaymentlinkStatus===>', data)
  const response = yield call(api.paymentlinkChangeStatus, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  console.log('response===>', response)
  const errorBody = path(['data', 'data', 'changePaymentlinkStatus', 'error'], response)
  const paymentLinks = path(['data', 'data', 'changePaymentlinkStatus', 'data'], response) || []
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else {
    if(_.isEmpty(errors)){
      callToastr('Sukses mengganti payment link status','success')
    }else{
      callToastr('Ada Kesalahan. '+typeof(errors[0]) === 'string'? errors[0] : errors[0]['message'],'error')
    }
  }
  yield put(TablepaginationActions.tablepaginationFetchDataReload({ needReload: { [ManifestPaymentlink.listallService]: true,openIdModal:true } }))
  yield put(Actions.paymentlinkToogleRowDataDone({ids:paymentLinks}))
}
