import { generateHmac, getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  donationlinkSubmitForm: ({ payment_amount: paymentAmount, additional_data1: additionalData1 }) => {
    const body = { query: `mutation{upsertPaymentLink(payment_amount: ${paymentAmount}, additional_data1: "${additionalData1}"){ error, detail_data{_id,order_code} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  donationlinkSubmitOrdercode: ({ toko_id: tokoId, order_code: orderCode, email, device_id: deviceId }) => {
    const body = { query: `mutation{payPaymentLink(toko_id: "${tokoId}", device_id: "${deviceId}", order_code: "${orderCode}" ${(email !== undefined && email) ? ',email: "' + email + '"' : ''} ){ error, payment_status, transaction_id, payment_page_url, paymentlink_id }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  donationlinkFetchOne: ({ id }) => {
    const body = { query: `query{getDetailPaymentLink(id: "${id}"){ error, data_detail{_id,order_code,transaction_id{_id,payment_page_url,status}} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  donationlinkCheckStatusPayment: ({ id }) => {
    const body = { query: `query{checkStatusTransaction(id: "${id}"){ error, data_detail{_id,payment_page_url,status} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
