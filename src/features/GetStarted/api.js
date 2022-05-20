import { getAccessToken,generateHmac } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
import _ from 'lodash'


export const create = api => ({
  /** Fetch Progress */
  fetchGetStartedProgress: async({merchantId}) => {
    const body = { query: `query{ getMerchantKycProgress(merchantId:${merchantId}){ data{step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6} merchantCategory status error } }` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  /** Submit data */
  submitStep2: async(stepPayload) => {

    const body = { query: `mutation{ submitKycDatainfo(request:{ ${stepPayload}}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } } }` }
    console.log(body)
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  submitStep3: async(stepPayload) => {
    const body = { query: `mutation{ submitKycDatainfo(request:{ ${stepPayload} }){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } } }` }
    console.log("data-=====>",body)
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  submitStep4: async(stepPayload) => {
    console.log('stepPayload=======>',stepPayload)
    const body = { query: `mutation{ submitKycDatainfo(request:{ ${stepPayload} }){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } } }` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  submitStep5: async({ bank_account_name,bank_account_branch,bank_account_no,bank_account_bankname}) => {
    const stepPayload = `kycStep5: { bankAccountName:"${bank_account_name}",bankAccountBankBranch:"${bank_account_branch}",bankAccountNo:"${bank_account_no}",bankAccountBankName:"${bank_account_bankname}" }`
    const body = { query: `mutation{ submitKycDatainfo(request:{ ${stepPayload} }){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } } }` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  submitStep6: async(stepPayload) => {
    const body = { query: `mutation{ submitKycDatainfo(request:{ ${stepPayload} }){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } } }` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  submitSetMerchantCategory: async({merchantCategory,merchantId}) => {
    const body = { query: `mutation{ changeMerchantCategory(request:{merchantId:${merchantId},merchantCategory:"${merchantCategory}"}){ status error } }` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  /** Fetch data details */
  fetchDataStep2: async({merchantId}) => {
    const body = { query: `query{ getMerchKycDataStep2Details(merchantId:${merchantId}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } data_detail{    brandName businessCategory businessActivity businessMedia namePicFinance emailPicFinance phoneNoPicFinance namePicTechnical emailPicTechnical phoneNoPicTechnical businessSocialMediafb businessSocialMediayt businessSocialMediatiktok businessSocialMediaig businessSocialMediaother businessAddress businessMediaWebsite businessMediaApplication businessEntity companyName companyAddress  } } } ` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  fetchDataStep3: async({merchantId}) => {
    const body = { query: `query{ getMerchKycDataStep3Details(merchantId:${merchantId}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } data_detail{  nameBusinessOwner emailBusinessOwner phoneNoBusinessOwner monthlyPotentialTrxVa companyPresidentName companyPresidentEmail companyPresidentPhone} } } ` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  fetchDataStep4: async({merchantId}) => {
    const body = { query: `query{ getMerchKycDataStep4Details(merchantId:${merchantId}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } data_detail{ noKtpOwner noNpwpOwner noKtpDirector companyBusinessNpwpNo companyTdpNo companySiupNo fileKtpOwner fileSelfieKtpOwner fileNpwpOwner fileDirectorKTP fileBusinessNpWp fileAktapp fileSkmenkeh fileSkdom filetdp filesiup filespp fileprofile filelogo  } docs_preview{ inputName fileUrl } } } ` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  fetchDataStep5: async({merchantId}) => {

    const body = { query: `query{ getMerchKycDataStep5Details(merchantId:${merchantId}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } data_detail{  bankAccountBankName bankAccountBankBranch bankAccountNo bankAccountName  } } } ` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  fetchDataStep6: async({merchantId}) => {
    const body = { query: `query{ getMerchKycDataStep6Details(merchantId:${merchantId}){ status error progress{ step2 step3 step4 step5 step6 totalStep2 totalStep3 totalStep4 totalStep5 totalStep6 } data_detail{  signatureName signaturePosition signatureData tncAgreeDisagree  } } } ` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  /** Upload documents */
  uploadFileStep4: async({fileInput}) =>{
    //ktp,selfiektp,npwp
    const body = fileInput
    api.setHeader('AccessToken', getAccessToken())
    return api.post(`${process.env.REACT_APP_DEV_HOST_PROXY || AppConfig.hostBackend }${AppConfig.uploadMerchantKycEndpoint}`, body)
  },
})
