import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import _ from 'lodash'
const { Types, Creators } = createActions({
  submitKycStep2:['data'],
  submitKycStep2Done:['data'],
  submitKycStep3:['data'],
  submitKycStep3Done:['data'],
  submitKycStep4:['data'],
  submitKycStep4Done:['data'],
  submitKycStep5:['data'],
  submitKycStep5Done:['data'],
  submitKycStep6:['data'],
  submitKycStep6Done:['data'],
  fetchProgressData:['data'],
  fetchProgressDataDone:['data'],
  fetchKycDataStep2:['data'],
  fetchKycDataStep2Done:['data'],
  fetchKycDataStep3:['data'],
  fetchKycDataStep3Done:['data'],
  fetchKycDataStep4:['data'],
  fetchKycDataStep4Done:['data'],
  fetchKycDataStep5:['data'],
  fetchKycDataStep5Done:['data'],
  fetchKycDataStep6:['data'],
  fetchKycDataStep6Done:['data'],
  uploadKycDocument:['data'],
  uploadKycDocumentDone:['data'],
  setMerchantCategory:['data'],
  setMerchantCategoryDone:['data'],
  reset: null
})

export const GetStartedTypes = Types
export default Creators
export const INITIAL_STATE = Immutable({
    errors:{},
    kycProgress:{
      step2:[],
      step3:[],
      step4:[],
      step5:[],
      step6:[]
    },
    stepTabLoading:{
      step2:false,
      step3:false,
      step4:false,
      step5:false,
      step6:false,
      stepSubmitChangeMerchantCategory:false,
    },
    stepLoading:{
      step2:false,
      step3:false,
      step4:false,
      step5:false,
      step6:false,
      stepSubmitChangeMerchantCategory:false,
      fetchKycProgress:false
    },
    stepSubmitLoadingStep2:false,
    stepSubmitLoadingStep3:false,
    stepSubmitLoadingStep3:false,
    stepSubmitLoadingStep4:false,
    stepSubmitLoadingStep5:false,
    stepSubmitLoadingStep6:false,
    uploadingStates:[],
    step2KycFormData:{},
    step3KycFormData:{},
    step4KycFormData:{},
    step5KycFormData:{},
    step6KycFormData:{},
    merchantCategory:null
})

/**
 * Fetch KYC Progress
 */
export const fetchProgressData = (state, { data }) => state.merge({
  ...state,
  stepTabLoading:{step2:true,step3:true,step4:true,step5:true,step6:true,fetchKycProgress:true}
})

export const fetchProgressDataDone = (state, { data }) => {
  var st = { ...state,merchantCategory:data.merchantCategory,stepTabLoading:{step2:false,step3:false,step4:false,step5:false,step6:false,fetchKycProgress:false} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  console.log('st====>',st)
  return state.merge(st)
}
//Data form
export const fetchKycDataStep2 = (state, { data }) => state.merge({
  ...state,
  stepLoading:{ ...state.stepLoading,step2:true},
})

export const fetchKycDataStep2Done = (state, { data }) => {
  var st = { ...state, stepLoading:{ ...state.stepLoading,step2:false} }
  if(!_.isNil(data.progress)){ st.kycProgress = data.progress }
  if(!_.isNil(data?.data_detail)){ st.step2KycFormData = data?.data_detail }
  return state.merge(st)
}

export const fetchKycDataStep3 = (state, { data }) => state.merge({
  ...state,
  stepLoading:{ ...state.stepLoading,step3:true},
})

export const fetchKycDataStep3Done = (state, { data }) => {
  var st = { ...state, stepLoading:{ ...state.stepLoading,step3:false}}
  if(!_.isNil(data.progress)){ st.kycProgress = data.progress }
  if(!_.isNil(data?.data_detail)){ st.step3KycFormData = data?.data_detail }
  return state.merge(st)
}

export const fetchKycDataStep4 = (state, { data }) => state.merge({
  ...state,
  stepLoading:{ ...state.stepLoading,step4:true},
})

export const fetchKycDataStep4Done = (state, { data }) => {
  var st = { ...state, stepLoading:{ ...state.stepLoading,step4:false}, }
  if(!_.isNil(data.progress)){ st.kycProgress = data.progress }
  if(!_.isNil(data?.data_detail)){ st.step4KycFormData = data?.data_detail }
  st.step4KycFormData['docsPreview'] = (data.docsPreview || [])
  return state.merge(st)
}

export const fetchKycDataStep5 = (state, { data }) => state.merge({
  ...state,
  stepLoading:{ ...state.stepLoading,step5:true},
})

export const fetchKycDataStep5Done = (state, { data }) => {
  var st = { ...state, stepLoading:{ ...state.stepLoading,step5:false}, }
  if(!_.isNil(data.progress)){ st.kycProgress = data.progress }
  if(!_.isNil(data?.data_detail)){ st.step5KycFormData = data?.data_detail }
  return state.merge(st)
}

export const fetchKycDataStep6 = (state, { data }) => state.merge({
  ...state,
  stepLoading:{ ...state.stepLoading,step6:true},
})

export const fetchKycDataStep6Done = (state, { data }) => {
  var st = { ...state, stepLoading:{ ...state.stepLoading,step6:false}, }
  if(!_.isNil(data.progress)){ st.kycProgress = data.progress }
  if(!_.isNil(data?.data_detail)){ st.step6KycFormData = data?.data_detail }
  return state.merge(st)
}

/**
 * Submit Data
*/
export const submitKycStep2 = (state, { data }) => state.merge({
  ...state,
  stepSubmitLoadingStep2:true,
  stepTabLoading:{step2:true,...state.stepTabLoading}
})

export const submitKycStep2Done = (state, { data }) => {
  var st = { ...state, stepSubmitLoadingStep2:false, stepTabLoading:{step2:false,...state.stepTabLoading} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  return state.merge(st)
}

export const submitKycStep3 = (state, { data }) => state.merge({
  ...state,
  stepSubmitLoadingStep3:true,
  stepTabLoading:{step3:true,...state.stepTabLoading}
})

export const submitKycStep3Done = (state, { data }) => {
  var st = { ...state, stepSubmitLoadingStep3:false, stepTabLoading:{step3:false,...state.stepTabLoading} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  return state.merge(st)
}

export const submitKycStep4 = (state, { data }) => state.merge({
  ...state,
  stepSubmitLoadingStep4:true,
  stepTabLoading:{step4:true,...state.stepTabLoading}
})

export const submitKycStep4Done = (state, { data }) => {
  var st = { ...state, stepSubmitLoadingStep4:false, stepTabLoading:{step4:false,...state.stepTabLoading} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  return state.merge(st)
}

export const submitKycStep5 = (state, { data }) => state.merge({
  ...state,
  stepSubmitLoadingStep5:true,
  stepTabLoading:{step5:true,...state.stepTabLoading}
})

export const submitKycStep5Done = (state, { data }) => {
  var st = { ...state, stepSubmitLoadingStep5:false, stepTabLoading:{step5:false,...state.stepTabLoading} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  return state.merge(st)
}

export const submitKycStep6 = (state, { data }) => state.merge({
  ...state,
  stepSubmitLoadingStep6:true,
  stepTabLoading:{step6:true,...state.stepTabLoading}
})

export const submitKycStep6Done = (state, { data }) => {
  var st = { ...state, stepSubmitLoadingStep6:false, stepTabLoading:{step6:false,...state.stepTabLoading} }
  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }
  return state.merge(st)
}

/**
 * Upload kyc documents file
 */
export const uploadKycDocument = (state, { data }) => state.merge({
  ...state,
  uploadingStates:[...Immutable.asMutable(state.uploadingStates),data.stateUpload]
})

export const uploadKycDocumentDone = (state, { data }) => {
  const {stateUpload} =  data
  const uploads = Immutable.asMutable(state.uploadingStates)
  const uploadingStates = uploads.filter(r=>r!=stateUpload)
  var st = { ...state, uploadingStates }

  if(!_.isNil(data.progress)){
    st.kycProgress = data.progress
  }

  if(!_.isNil(data.fileName) && !_.isNil(data.inputName) && !_.isNil(data.formName)){
    if(data.formName === 'formKycStep4'){

      var step4KycFormData = Immutable.asMutable(state.step4KycFormData)
      step4KycFormData[data.inputName] = data.imageUrl
      step4KycFormData['docsPreview'] = (data.docsPreview || [])
      console.log("daattaa==========>",step4KycFormData,"=======>",data)
      st = {...st, step4KycFormData}
    }
  }

  return state.merge(st)
}

/**
 * set merchant type
 */
export const setMerchantCategory = (state, { data }) => state.merge({
  ...state,
  stepLoading:{...state.stepLoading,stepSubmitChangeMerchantCategory:true}
})

export const setMerchantCategoryDone = (state, { data }) => state.merge({
  ...state,
  stepLoading:{...state.stepLoading,stepSubmitChangeMerchantCategory:false}
})

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FETCH_PROGRESS_DATA]: fetchProgressData,
  [Types.FETCH_PROGRESS_DATA_DONE]: fetchProgressDataDone,

  [Types.FETCH_KYC_DATA_STEP2]: fetchKycDataStep2,
  [Types.FETCH_KYC_DATA_STEP2_DONE]: fetchKycDataStep2Done,
  [Types.FETCH_KYC_DATA_STEP3]: fetchKycDataStep3,
  [Types.FETCH_KYC_DATA_STEP3_DONE]: fetchKycDataStep3Done,
  [Types.FETCH_KYC_DATA_STEP4]: fetchKycDataStep4,
  [Types.FETCH_KYC_DATA_STEP4_DONE]: fetchKycDataStep4Done,
  [Types.FETCH_KYC_DATA_STEP5]:fetchKycDataStep5,
  [Types.FETCH_KYC_DATA_STEP5_DONE]:fetchKycDataStep5Done,
  [Types.FETCH_KYC_DATA_STEP6]:fetchKycDataStep6,
  [Types.FETCH_KYC_DATA_STEP6_DONE]:fetchKycDataStep6Done,

  [Types.SET_MERCHANT_CATEGORY]:setMerchantCategory,
  [Types.SET_MERCHANT_CATEGORY_DONE]:setMerchantCategoryDone,

  [Types.UPLOAD_KYC_DOCUMENT]:uploadKycDocument,
  [Types.UPLOAD_KYC_DOCUMENT_DONE]:uploadKycDocumentDone,
  [Types.SUBMIT_KYC_STEP2]: submitKycStep2,
  [Types.SUBMIT_KYC_STEP2_DONE]: submitKycStep2Done,
  [Types.SUBMIT_KYC_STEP3]: submitKycStep3,
  [Types.SUBMIT_KYC_STEP3_DONE]: submitKycStep3Done,
  [Types.SUBMIT_KYC_STEP4]: submitKycStep4,
  [Types.SUBMIT_KYC_STEP4_DONE]: submitKycStep4Done,

  [Types.SUBMIT_KYC_STEP5]: submitKycStep5,
  [Types.SUBMIT_KYC_STEP5_DONE]: submitKycStep5Done,
  [Types.SUBMIT_KYC_STEP6]: submitKycStep6,
  [Types.SUBMIT_KYC_STEP6_DONE]: submitKycStep6Done,

  [Types.RESET]: (state) => INITIAL_STATE
})
