import { generateHmac, getAccessToken,htmlEntities } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  paymentlinkSubmitForm: ({ additionalData1,otherBill,userId,merchantId,deviceId,expiredDate,description,amountValue,otherBillValue,maxTransaction,additionalData2}) => {
    const body = { query: `mutation{createPaymentLink(request:{user_id:${userId},merchantId:${merchantId},deviceId:"${deviceId}",expiredDateTime:${expiredDate},amount: ${amountValue},maxTransactions:${maxTransaction},additionalData1: "${additionalData1}",additionalData2: "${additionalData2}",description: ${JSON.stringify(htmlEntities(description))},zone:"${Intl.DateTimeFormat().resolvedOptions().timeZone}",biayaAdm:${otherBillValue}}){ error status paymentLink{id idCode}  }}` }
    // const body = { query: `mutation{createPaymentLink(request:{user_id:${userId},merchantId:${merchantId},device_id:"${deviceId}",expiredDateTime:${expiredDate},additional_data1: "${additionalData1}",description: ${JSON.stringify(htmlEntities(description))},zone:"${Intl.DateTimeFormat().resolvedOptions().timeZone}"}){ error status paymentLink{id idCode}  }}` }
    console.log("body hit=========> ",body)
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  paymentlinkSubmitOrdercode: ({ toko_id: tokoId, order_code: orderCode, email, device_id: deviceId }) => {
    const body = { query: `mutation{payPaymentLink(toko_id: "${tokoId}", device_id: "${deviceId}", order_code: "${orderCode}" ${(email !== undefined && email) ? ',email: "' + email + '"' : ''} ){ error, payment_status, transaction_id, payment_page_url, paymentlink_id }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  paymentlinkFetchOne: ({ id }) => {
    const body = { query: `query{getDetailPaymentLink(id: "${id}"){ error, data_detail{_id,order_code,transaction_id{_id,payment_page_url,status}} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  paymentlinkCheckStatusPayment: ({ id }) => {
    const body = { query: `query{checkStatusTransaction(id: "${id}"){ error, data_detail{_id,payment_page_url,status} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  paymentlinkChangeStatus:({idPaymentlink,paymentlinkStatus})=>{
    const body = { query: `mutation{changePaymentlinkStatus(request:{paymentlink_id:["${idPaymentlink}"],status:${paymentlinkStatus}}){ error, status, data { status id } }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
