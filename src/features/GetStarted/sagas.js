import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import LoginActions from '../../core/Containers/Login/redux'
import _ from 'lodash'
import swal from 'sweetalert2'
import {callToastr,formValidation} from '../../core/Utils/Utils'
import BusinessProfile from 'Pages/settings/BusinessProfile'

export function * doSubmitKycStep2 (api, { data }) {
  let payload = ''
  if(data.merchantCategory ==='perusahaan'){
    const {business_entity,company_name,brand_name, business_category,business_activity, business_media,business_media_application,business_media_website, name_pic_finance,email_pic_finance,phone_pic_finance, name_pic_technical,email_pic_technical,phone_pic_technical, company_address, business_social_media_fb,business_social_media_yt,business_social_media_tiktok,business_social_media_ig,business_social_media_other} = data
    payload = ` kycStep2:{
                            brandName:"${brand_name}",
                            businessCategory,:"${business_category}",
                            businessActivity,:"${business_activity}",
                            businessMedia:"${business_media}",
                            businessMediaWebsite:"${business_media_website}",
                            businessMediaApplication:"${business_media_application}",
                            namePicFinance:"${name_pic_finance}",
                            emailPicFinance:"${email_pic_finance}",
                            phoneNoPicFinance:"${phone_pic_finance}",
                            namePicTechnical:"${name_pic_technical}",
                            emailPicTechnical:"${email_pic_technical}",
                            phoneNoPicTechnical:"${phone_pic_technical}",
                            businessSocialMediafb:"${business_social_media_fb}",
                            businessSocialMediayt:"${business_social_media_yt}",
                            businessSocialMediatiktok:"${business_social_media_tiktok}",
                            businessSocialMediaig:"${business_social_media_ig}",
                            businessSocialMediaother:"${business_social_media_other}",
                            companyAddress:"${company_address}",
                            companyName:"${company_name}",
                            businessEntity:"${business_entity}"
                } `
  }else if(data.merchantCategory ==='individual'){
      const {merchant_name,business_address,merchant_category,business_activity, business_media,business_media_application,business_media_website, pic_finance_name, pic_finance_email, pic_finance_phone, pic_technical_name, pic_technical_email, pic_technical_phone , business_social_media_fb,business_social_media_yt,business_social_media_tiktok,business_social_media_ig,business_social_media_other} = data

      payload = ` kycStep2:{
                            brandName:"${merchant_name}",
                            businessCategory,:"${merchant_category}",
                            businessActivity,:"${business_activity}",
                            businessMedia:"${business_media}",
                            businessMediaWebsite:"${business_media_website}",
                            businessMediaApplication:"${business_media_application}",
                            namePicFinance:"${pic_finance_name}",
                            emailPicFinance:"${pic_finance_email}",
                            phoneNoPicFinance:"${pic_finance_phone}",
                            namePicTechnical:"${pic_technical_name}",
                            emailPicTechnical:"${pic_technical_email}",
                            phoneNoPicTechnical:"${pic_technical_phone}",
                            businessSocialMediafb:"${business_social_media_fb}",
                            businessSocialMediayt:"${business_social_media_yt}",
                            businessSocialMediatiktok:"${business_social_media_tiktok}",
                            businessSocialMediaig:"${business_social_media_ig}",
                            businessSocialMediaother:"${business_social_media_other}",
                            businessAddress:"${business_address}"
                }`
  }
  const response = yield call(api.submitStep2, payload)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'submitKycDatainfo', 'error'], response)
  const message = path(['data', 'data', 'submitKycDatainfo', 'message'], response)
  const progress = path(['data', 'data', 'submitKycDatainfo', 'progress'], response)


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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }
  yield put(Actions.submitKycStep2Done({ errors,message,progress }))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doSubmitKycStep3 (api, { data }) {
 let payload = ''
  if(data.merchantCategory ==='perusahaan'){
      payload = ` kycStep3:{ monthlyPotentialTrxVa:${_.isNil(data.potensi_transaksi_va_bulanan) ? 'null' : data.potensi_transaksi_va_bulanan},companyPresidentName:"${data.nama_pimpinan_perusahaan}", companyPresidentEmail:"${data.email_pimpinan_perusahaan}", companyPresidentPhone:"${data.notelp_pimpinan_perusahaan}" }`
  }else if(data.merchantCategory ==='individual'){
      payload = `kycStep3: { nameBusinessOwner:"${data.name_business_owner}", emailBusinessOwner:"${data.email_business_owner}", phoneNoBusinessOwner:"${data.phone_business_owner}", monthlyPotentialTrxVa:${_.isNil(data.va_potential_business_owner) ? 'null' : data.va_potential_business_owner} }`
  }

  const response = yield call(api.submitStep3, payload)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'submitKycDatainfo', 'error'], response)
  const message = path(['data', 'data', 'submitKycDatainfo', 'message'], response)
  const progress = path(['data', 'data', 'submitKycDatainfo', 'progress'], response)

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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }
  yield put(Actions.submitKycStep3Done({ errors,message,progress }))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doSubmitKycStep4 (api, { data }) {
  let payload = ''
  if(data.merchantCategory ==='perusahaan'){
    payload = `kycStep4: { noKtpDirector:"${data.doc_no_ktp_direktur}", companyBusinessNpwpNo:"${data.doc_no_npwp_usaha}", companyTdpNo:"${data.doc_no_tdp}", companySiupNo:"${data.doc_no_siup}"}`
  }else if(data.merchantCategory ==='individual'){
    payload = `kycStep4: { noKtpOwner:"${data.no_ktp_owner}", noNpwpOwner:"${data.no_npwp_owner}" }`
  }
  const response = yield call(api.submitStep4, payload)
  console.log('response====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'submitKycDatainfo', 'error'], response)
  const message = path(['data', 'data', 'submitKycDatainfo', 'message'], response)
  const progress = path(['data', 'data', 'submitKycDatainfo', 'progress'], response)
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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }
  yield put(Actions.submitKycStep4Done({ errors,message,progress }))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doSubmitKycStep5 (api, { data }) {
  const response = yield call(api.submitStep5, data)
  console.log('response====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'submitKycDatainfo', 'error'], response)
  const message = path(['data', 'data', 'submitKycDatainfo', 'message'], response)
  const progress = path(['data', 'data', 'submitKycDatainfo', 'progress'], response)
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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }
  yield put(Actions.submitKycStep5Done({ errors,message,progress }))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doSubmitKycStep6 (api, { data }) {
  let payload = ''
  if(data.merchantCategory ==='perusahaan'){
      payload = ` kycStep6:{ signatureName:"${data.signature_name}", signaturePosition:"${data.signature_position}", tncAgreeDisagree:"${data.tnc}" }`
  }else if(data.merchantCategory ==='individual'){
      payload = ` kycStep6:{ tncAgreeDisagree:"${data.tnc}" }`
  }
  const response = yield call(api.submitStep6, payload)
  console.log('response====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'submitKycDatainfo', 'error'], response)
  const message = path(['data', 'data', 'submitKycDatainfo', 'message'], response)
  const progress = path(['data', 'data', 'submitKycDatainfo', 'progress'], response)

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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }
  yield put(Actions.submitKycStep6Done({ errors,message,progress }))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doSubmitMerchantCategory (api, { data }) {
  const response = yield call(api.submitSetMerchantCategory, data)
  console.log('response====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'setMerchanCategory', 'error'], response)
  const message = path(['data', 'data', 'setMerchanCategory', 'message'], response)
  const progress = path(['data', 'data', 'setMerchanCategory', 'progress'], response)
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
    swal.fire('Maaf terjadi Kesalahan','','error')
  }else{
    swal.fire('Data berhasil tersimpan','','success')
  }

  yield put(Actions.setMerchantCategoryDone({ errors,message }))

  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

export function * doFetchKycFormDataStep2(api, { data }){
  const response = yield call(api.fetchDataStep2, data)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchKycDataStep2Details', 'error'], response)
  const progress = path(['data', 'data', 'getMerchKycDataStep2Details', 'progress'], response)
  const data_detail = path(['data', 'data', 'getMerchKycDataStep2Details', 'data_detail'], response)

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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
    yield put(Actions.fetchKycDataStep2Done({ errors,progress,data_detail}))
  }
}

export function * doFetchKycFormDataStep3(api, { data }){
  const response = yield call(api.fetchDataStep3, data)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchKycDataStep3Details', 'error'], response)
  const progress = path(['data', 'data', 'getMerchKycDataStep3Details', 'kyc_progress'], response)
  const data_detail = path(['data', 'data', 'getMerchKycDataStep3Details', 'data_detail'], response)


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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
  }

  yield put(Actions.fetchKycDataStep3Done({ errors,progress,data_detail}))
}

export function * doFetchKycFormDataStep4(api, { data }){
  const response = yield call(api.fetchDataStep4, data)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchKycDataStep4Details', 'error'], response)
  const progress = path(['data', 'data', 'getMerchKycDataStep4Details', 'kyc_progress'], response)
  const data_detail = path(['data', 'data', 'getMerchKycDataStep4Details', 'data_detail'], response)
  const docsPreview = path(['data', 'data', 'getMerchKycDataStep4Details', 'docs_preview'], response)

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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
  }

  yield put(Actions.fetchKycDataStep4Done({ errors,progress,data_detail,docsPreview}))
}

export function * doFetchKycFormDataStep5(api, { data }){
  const response = yield call(api.fetchDataStep5, data)
  console.log('response data====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchKycDataStep5Details', 'error'], response)
  const progress = path(['data', 'data', 'getMerchKycDataStep5Details', 'kyc_progress'], response)
  const data_detail = path(['data', 'data', 'getMerchKycDataStep5Details', 'data_detail'], response)

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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
  }

  yield put(Actions.fetchKycDataStep5Done({ errors,progress,data_detail}))
}

export function * doFetchKycFormDataStep6(api, { data }){
  const response = yield call(api.fetchDataStep6, data)
  console.log('response va====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchKycDataStep6Details', 'error'], response)
  const progress = path(['data', 'data', 'getMerchKycDataStep6Details', 'kyc_progress'], response)
  const data_detail = path(['data', 'data', 'getMerchKycDataStep6Details', 'data_detail'], response)

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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
  }

  yield put(Actions.fetchKycDataStep6Done({ errors,progress,data_detail}))
}

export function * dofetchKycProgress(api, { data }){
  const response = yield call(api.fetchGetStartedProgress, data)
  console.log('response fetch progress====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'data', 'getMerchantKycProgress', 'error'], response)
  const message = path(['data', 'data', 'getMerchantKycProgress', 'message'], response)
  const dataProgress = path(['data', 'data', 'getMerchantKycProgress', 'data'], response)
  const merchantCategory = path(['data', 'data', 'getMerchantKycProgress', 'merchantCategory'], response)

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
    swal.fire('Ada Kesalahan',errors[0]['message'],'error')
  }else{
    
  }
  yield put(Actions.fetchProgressDataDone({ errors,message, progress: dataProgress, merchantCategory}))
}

export function * doUploadKycDocs (api, { data }) {
  const {fileInput,options,label} = data
  if(options != undefined){
    const file =  fileInput.get(options.params)
    if(formValidation(label,file.size,options.rules,'file').error){
      callToastr(formValidation(label,file.size,options.rules,'file').msg,'error')
      return null
    }
  }
  const response = yield call(api.uploadFileStep4, data)
  console.log('response====>',response)
  let errors = [];
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const error1 = path(['data', 'errors'], response) || []
  const error3 = path(['data', 'error'], response)
  const status = path(['data','status'], response)
  const message= path(['data','message'], response) || ''
  const progress = path(['data','progress'], response)
  const inputName = path(['data','inputName'], response)
  const fileName = path(['data','fileName'], response)
  const formName = path(['data','formName'], response)
  const imageUrl = path(['data','urlImage'], response)
  const docsPreview = path(['data','docs_preview'], response)

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
    callToastr(`Dokumen gagal diupload`,'error')
  }else{
    callToastr(`Sukses mengupload dokumen`,'success')
  }
  yield put(Actions.uploadKycDocumentDone({ errors,message, progress: progress,stateUpload:data.stateUpload,fileName,inputName,formName,imageUrl,docsPreview}))
  if(!_.isNil(data?.reloadStep)){
    data.reloadStep()
  }
}

