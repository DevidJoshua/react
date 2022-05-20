import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import _ from 'lodash'

const { Types, Creators } = createActions({
  tablepaginationSetloading: ['data'],
  tablepaginationResetForm: ['data'],
  tablepaginationResetFilter: ['data'],
  tablepaginationDeleteDataDone: ['data'],
  tablepaginationDeleteData: ['data'],
  tablepaginationFetchDataDetailDone: ['data'],
  tablepaginationFetchDataDetail: ['data'],
  tablepaginationFetchDataReload: ['data'],
  tablepaginationFetchData: ['data'],
  tablepaginationFetchDataDone: ['data'],
  tablepaginationOnChangeFilter: ['data'],
  tablepaginationOnChangeForm: ['data'],
  tablepaginationSubmitForm: ['data'],
  tablepaginationSubmitFormDone: ['data'],
  reset: null
})

export const TablepaginationTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  payload: {},
  defaultFormValue: {},
  fileArray: {},
  currentFileArray: {},
  filter: {},
  data: {},
  dataDetail: {},
  loading: {},
  reload: {},
  pageSize: {},
  pageIndex: {},
  errors: {},
  count: {},
  pageCount: {},
  needToSave: false,
  activeForm: '',
  activeDetail: '',
  needToRealoadAfterSubmit: []
})

export const tablepaginationFetchData = (state, { data }) => {
  return state.merge({
    filter: { ...state.filter, [data.listName || data.serviceName]: data.filter },
    loading: { ...state.loading, [data.listName || data.serviceName]: true },
    pageSize: { ...state.pageSize, [data.listName || data.serviceName]: data.pageSize },
    pageIndex: { ...state.pageIndex, [data.listName || data.serviceName]: data.pageIndex }
  })
}
export const tablepaginationSubmitForm = (state, { data }) => {
  console.log("data reduzx>>>>>>",data)
  return state.merge({
    loading: { ...state.loading, [data.serviceName]: true }
  })
}
export const tablepaginationFetchDataDone = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.listName || data.serviceName]: false },
  reload: { ...state.reload, [data.listName || data.serviceName]: false },
  data: { ...state.data, [data.listName || data.serviceName]: data.listData },
  count: { ...state.data, [data.listName || data.serviceName]: data.count },
  pageCount: { ...state.data, [data.listName || data.serviceName]: data.pageCount },
  errors: { ...state.errors, [data.listName || data.serviceName]: data.errors }
})
export const tablepaginationOnChangeFilter = (state, { data }) => state.merge({
  filter: { ...state.filter, [data.serviceName]: { ...state.filter[data.serviceName], [data.fieldName]: data.fieldValue } }
})
export const tablepaginationResetFilter = (state, { data }) => {
  const x1 = document.getElementById('filter_start_date') || {}
  const x2 = document.getElementById('filter_end_date') || {}
  x1.value = ''
  x2.value = ''
  return state.merge({
    filter: { ...state.filter, [data.serviceName]: {} }
  })
}
export const tablepaginationOnChangeForm = (state, { data }) => {
  const d = {}
  console.log('dataaaaaa====>', data)
  d.activeForm = data.serviceName
  if (data.type === 'file') {
    console.log('data.fieldValuedata.fieldValuedata.fieldValue=>', data.fieldValue)
    d.needToSave = true
    d.fileArray = { ...state.fileArray, [data.serviceName]: { ...(state.fileArray[data.serviceName] || {}), [data.fieldName]: data.fieldValue } }
  } else {
    if (data.batchData) {
      d.payload = { ...state.payload, [data.serviceName]: { ...state.payload[data.serviceName], ...data.batchData } }
      // console.log('')
    } else d.payload = { ...state.payload, [data.serviceName]: { ...state.payload[data.serviceName], [data.fieldName]: data.fieldValue } }
    if (typeof data.resetValue !== 'undefined') {
      d.defaultFormValue = { ...state.defaultFormValue, [data.serviceName]: { ...state.defaultFormValue[data.serviceName], [data.fieldName]: data.resetValue } }
    } else {
      d.needToSave = true
    }
  }
  // if (data.fieldName !== '_id') d.needToSave = true
  // console.log('puisssssd', d)
  return state.merge(d)
}
export const tablepaginationFetchDataReload = (state, { data }) => {
  const d = {}
  d.reload = { ...state.reload, ...data.needReload }
  return state.merge(d)
}
export const tablepaginationSubmitFormDone = (state, { data }) => {
  const d = {}
  console.log('data.errorsdata.errorsdata.errorsdata.errors', data.errors)
  if ((data.errors || []).length === 0) d.needToSave = false
  d.loading = { ...state.loading, [data.serviceName]: false }
  d.errors = { ...state.errors, [data.serviceName]: data.errors }

  const needReload = {}
  for (let i = 0; i < (state.needToRealoadAfterSubmit || []).length; i++) {
    needReload[state.needToRealoadAfterSubmit] = true
  }
  d.reload = { ...state.reload, ...needReload }
  // if (_.isEmpty(data.errors)) d.payload = { ...state.payload, [data.serviceName]: {} }
  return state.merge(d)
}
export const tablepaginationResetForm = (state, { data }) => {
  console.log('defaultFormValue====>', data.defaultFormValue)
  // const currentId = (state.payload[data.serviceName] || {})._id
  if (!data.serviceName) return state
  // let newPL = {}
  const r = {}
  // if (data.exceptDefaultFormValue) {
  //   // newPL = state.defaultFormValue[data.serviceName]
  //   r.payload = { ...state.payload, [data.serviceName]: state.defaultFormValue[data.serviceName] }
  //   // r.defaultFormValue = { ...state.defaultFormValue, [data.serviceName]: newPL }
  // } else {
  //   r.dataDetail = { ...state.dataDetail, [state.activeDetail]: {} }
  //   r.defaultFormValue = { ...state.defaultFormValue, [data.serviceName]: {} }
  //   r.activeForm = ''
  //   r.activeDetail = ''
  //   r.payload = { ...state.payload, [data.serviceName]: {} }
  // }

  if (data.isInitialReset) {
    if (typeof data.defaultFormValue._id === 'undefined') r.dataDetail = { ...state.dataDetail, [state.activeDetail]: {} }
    r.defaultFormValue = { ...state.defaultFormValue, [data.serviceName]: data.defaultFormValue }
    r.payload = { ...state.payload, [data.serviceName]: data.defaultFormValue }
    r.formSchema = { ...state.formSchema, [data.serviceName]: data.formSchema }
    r.activeForm = data.serviceName
    r.needToRealoadAfterSubmit = data.needToRealoadAfterSubmit
  } else {
    if (data.exceptDefaultFormValue) {
      r.payload = { ...state.payload, [data.serviceName]: state.defaultFormValue[data.serviceName] }
    } else {
      r.dataDetail = { ...state.dataDetail, [state.activeDetail]: {} }
      r.defaultFormValue = { ...state.defaultFormValue, [data.serviceName]: {} }
      r.activeForm = ''
      r.activeDetail = ''
      r.needToRealoadAfterSubmit = []
      r.payload = { ...state.payload, [data.serviceName]: {} }
      r.formSchema = { ...state.formSchema, [data.serviceName]: {} }
      r.redirectAfterUpsert = { ...state.redirectAfterUpsert, [data.serviceName]: '' }
    }
  }

  r.apiVersion = { ...state.apiVersion, [data.serviceName]: data.apiVersion || 1 }

  r.fileArray = { ...state.fileArray, [data.serviceName]: {} }
  if (data.redirectAfterUpsert) r.redirectAfterUpsert = { ...state.redirectAfterUpsert, [data.serviceName]: data.redirectAfterUpsert }
  r.needToSave = false
  return state.merge(r)
}
export const tablepaginationDeleteData = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: true }
})
export const tablepaginationSetloading = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: data.isLoading }
})
export const tablepaginationDeleteDataDone = (state, { data }) => state.merge({
  loading: { ...state.loading, [data.serviceName]: false },
  errors: { ...state.errors, [data.serviceName]: data.errors }
})
export const tablepaginationFetchDataDetail = (state, { data }) => state.merge({
  activeDetail: data.serviceName,
  loading: { ...state.loading, [data.serviceName]: true }
})
export const tablepaginationFetchDataDetailDone = (state, { data }) => state.merge({
  errors: { ...state.errors, [data.serviceName]: data.errors },
  loading: { ...state.loading, [data.serviceName]: false },
  dataDetail: { ...state.dataDetail, [data.serviceName]: data.dataDetail }
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TABLEPAGINATION_RESET_FORM]: tablepaginationResetForm,
  [Types.TABLEPAGINATION_RESET_FILTER]: tablepaginationResetFilter,
  [Types.TABLEPAGINATION_DELETE_DATA_DONE]: tablepaginationDeleteDataDone,
  [Types.TABLEPAGINATION_DELETE_DATA]: tablepaginationDeleteData,
  [Types.TABLEPAGINATION_FETCH_DATA_DETAIL_DONE]: tablepaginationFetchDataDetailDone,
  [Types.TABLEPAGINATION_FETCH_DATA_DETAIL]: tablepaginationFetchDataDetail,
  [Types.TABLEPAGINATION_SUBMIT_FORM_DONE]: tablepaginationSubmitFormDone,
  [Types.TABLEPAGINATION_SUBMIT_FORM]: tablepaginationSubmitForm,
  [Types.TABLEPAGINATION_SETLOADING]: tablepaginationSetloading,
  [Types.TABLEPAGINATION_ON_CHANGE_FORM]: tablepaginationOnChangeForm,
  [Types.TABLEPAGINATION_ON_CHANGE_FILTER]: tablepaginationOnChangeFilter,
  [Types.TABLEPAGINATION_FETCH_DATA_RELOAD]: tablepaginationFetchDataReload,
  [Types.TABLEPAGINATION_FETCH_DATA]: tablepaginationFetchData,
  [Types.TABLEPAGINATION_FETCH_DATA_DONE]: tablepaginationFetchDataDone,
  [Types.RESET]: (state) => INITIAL_STATE
})
