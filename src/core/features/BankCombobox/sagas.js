// import React from 'react'
import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import LoginActions from '../../Containers/Login/redux'
import TablepaginationActions from './redux'
import _ from 'lodash'
import { callErrorToast } from '../../Utils/Utils'

export function * tablepaginationFetchData (api, { data }) {
  console.log('tablepaginationFetchData====', data)
  const { serviceName, listName } = data
  const response = yield call(api.fetchAllService, data)
  console.log('response======>', response)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  const errorBody2 = path(['error'], response)
  const errorBody3 = path(['data','error'], response)
  const listData = path(['data', 'data', serviceName, 'list_data'], response)
  const count = path(['data', 'data', serviceName, 'count'], response)
  const pageCount = path(['data', 'data', serviceName, 'page_count'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  if (!_.isEmpty(errorBody2)) errors.push({ message: errorBody2 })
  if (!_.isEmpty(errorBody3)) errors.push({ message: errorBody3 })
  console.log('errors fetch data====>', errors)

  yield put(TablepaginationActions.tablepaginationFetchDataDone({ listName, listData, errors, serviceName, count, pageCount }))

  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  }
}
export function * tablepaginationFetchDataDetail (api, { data }) {
  // console.log('tablepaginationFetchDataDetail====data', data)
  const { serviceName, additionalFields } = data
  const response = yield call(api.fetchDetailService, data)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'status'], response)
  const dataDetail = path(['data', 'data', serviceName, 'data_detail'], response)
  const status = path(['data', 'status'], response)

  if (additionalFields) {
    additionalFields.forEach((v, i) => {
      dataDetail[v] = path(['data', 'data', serviceName, v], response)
    })
  }
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  

  // console.log('errors====>', errors)
  yield put(TablepaginationActions.tablepaginationFetchDataDetailDone({ dataDetail, errors, serviceName }))

  if (status ==401 || !_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  }
}
export function * tablepaginationSubmitForm (api, { data }) {
  console.log('tablepaginationSubmitForm====data', data)




  const {
    payload,
    serviceName,
    history,
    fileArray,
    redirectAfterUpsert,
    formSchema = {} // formSchema ini kita set saat di dalam page upsert. gunanya untuk menentukan field2 mana aja yang perlu kita validasi beserta error message nya masing2
  } = data
  let errors = []
  let detailData = {}

  // console.log('formSchemaformSchema', formSchema)
  // console.log('payloadpayloadpayload', payload)
  for (const i in formSchema) {
    const fieldSchema = formSchema[i]
    if (fieldSchema) {
      if (fieldSchema.validate) {

        const validate = fieldSchema.validate(payload[i], payload)
        if ((validate || {}).errorMessage) errors.push({ message: validate.errorMessage })
      }
       else if (fieldSchema.mandatory) {

        if (fieldSchema.type === 'number') {
          // create
          if (typeof payload._id === 'undefined') {
            if ((payload[i] || 0) <= 0) {
              errors.push({ message: fieldSchema.errorMessage })
            }
          } else {
            // update
            if (typeof payload[i] !== 'undefined' && (payload[i] || 0) <= 0) {
              errors.push({ message: fieldSchema.errorMessage })
            }
          }
          // if ((typeof payload._id === 'undefined' && (payload[i] || 0) <= 0) || (typeof payload[i] !== 'undefined' && (payload[i] || 0) <= 0)) {
          //   errors.push({ message: fieldSchema.errorMessage })
          // }
        }
        if (fieldSchema.type === 'string') {
          // create
          if (typeof payload._id === 'undefined') {
            if (typeof payload[i] === 'undefined' || payload[i] === '') {
              errors.push({ message: fieldSchema.errorMessage })
            }
          } else {
            // update
            if (typeof payload[i] !== 'undefined' && payload[i] === '') {
              errors.push({ message: fieldSchema.errorMessage })
            }
          }
          // if (typeof payload[i] === 'undefined' || payload[i] === '') {
          //   errors.push({ message: fieldSchema.errorMessage })
          // }
          // if ((typeof payload._id === 'undefined' && (payload[i] || '') === '') || (typeof payload[i] !== 'undefined' && (payload[i] || 0) <= 0)) {
        }
        if (fieldSchema.type === 'array') {
          if (!(typeof payload[i] !== 'undefined' && (payload[i] || []).length > 0)) {
            errors.push({ message: fieldSchema.errorMessage })
          }
        }
      }
    }
  }
  if (errors.length === 0) {
    if (fileArray) {
      // upload file
      for (const i in fileArray) {
        // fileArray
        const fileArr = fileArray[i]
        if (fileArr && errors.length === 0) {
          console.log('tidakadaaaerror')
          // const form = new FormData()
          // form.append('image[image]', {
          //   name: 'omgitsme.jpg',
          //   uri: pathToImageOnFilesystem,
          //   type: 'image/jpg'
          // })
          const uploadFileResp = yield call(api.uploadFileService, { fileArr })
          console.log('uploadFileRespxx===>', uploadFileResp)
          errors = errors.concat(path(['data', 'errors'], uploadFileResp) || [])
          if (!_.isEmpty(uploadFileResp.problem)) errors.push({ message: uploadFileResp.problem })
          else {
            const fileIds = uploadFileResp.data.list_data.map(v => v._id)
            data.payload = { ...data.payload, [i]: [...data.payload[i], ...fileIds] }
          }
          // api.post(AppConfig.graphqlPath, body)
        } else {
          console.log('adatidakadaaaerror', errors)
        }
      }
    }
  }
  // console.log('data.payloaddata.payload2', data.payload)

  if (errors.length === 0) {
    // const { serviceName, history, redirectAfterCreate, isUpdate, updateServiceName, redirectAfterCreateToParent } = data
    let response = null
    // const isUpdate = !!payload._id
    // if (isUpdate) response = yield call(api.updateService, data)

    response = yield call(api.upsertService, data)
    // else response = yield call(api.createService, data)

    console.log('response======>', response)
    errors = errors.concat(path(['data', 'errors'], response) || [])
    if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
    //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
    const errorBody = path(['data', 'data', serviceName, 'error'], response)
    detailData = path(['data', 'data', serviceName, 'detail_data'], response)
    if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
    // console.log('errors========>', errors)
  }
  yield put(TablepaginationActions.tablepaginationSubmitFormDone({ errors, serviceName, detailData }))

  // const history = yield call(useHistory)
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('success', 'success')
    if (formSchema.onSuccess) formSchema.onSuccess({ doc: detailData })
  }
  if (_.isEmpty(errors)) {
    // detailData
    // detailData._id
    if (typeof redirectAfterUpsert !== 'undefined' && redirectAfterUpsert !== '') {
      return history.push(redirectAfterUpsert)
    }
    if (!payload._id) history.push(`${window.location.pathname}/${detailData._id}`)
    // if (!payload._id) history.push(`${window.location.pathname}/${detailData._id}`)
    // if (!_.isEmpty(redirectAfterCreateToParent)) history.push(redirectAfterCreateToParent)
    // else history.push(`${redirectAfterCreate}/${detailData._id}`)
    // yield put(TablepaginationActions.tablepaginationOnChangeForm({ serviceName, fieldName: '_id', fieldValue: '' + detailData._id }))
  }
}
export function * tablepaginationDeleteData (api, { data }) {
  // console.log('tablepaginationDeleteData====data', data)
  const { serviceName, history, historyPush, redirectAfterDelete } = data
  const response = yield call(api.deleteService, data)

  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  //   const statusBody = parseInt(path(['data', 'data', 'tablepaginationFetchData', 'status'], response) || 0)
  const errorBody = path(['data', 'data', serviceName, 'error'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })
  yield put(TablepaginationActions.tablepaginationDeleteDataDone({ errors, serviceName }))
  // const history = yield call(useHistory)
  document.getElementById('buttonCloseModal').click()
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || ((errors[0] || {}).message || '').includes('jwt expired'))) {
    // console.log('do logout karena at exp')
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    errors.forEach(element => {
      callErrorToast(element.message, 'error')
    })
  } else {
    callErrorToast('success', 'success')
    if (historyPush) historyPush(redirectAfterDelete)
    if (history) history.push(redirectAfterDelete)
  }
}
