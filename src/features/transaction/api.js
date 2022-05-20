import { generateHmac, getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  transactionFetchOne: ({ id }) => {
    const body = { query: `query{getDetailTransaction(id: "${id}"){ error, data_detail{_id,invoice_number,payment_page_url,status} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  transactionCheckStatusPayment: ({ id }) => {
    const body = { query: `query{checkStatusTransaction(id: "${id}"){ error, data_detail{_id,invoice_number,payment_page_url,status} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  transactionPaymentStep1: ({ id }) => {
    const body = { query: `query{paymentStep1Transaction(id: "${id}"){ error, paymentPageUrl, paymentStatus, invoiceNumber }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
