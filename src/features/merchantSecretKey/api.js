import { generateHmac, getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  fetchMerchantSecretKey: () => {
    const body = { query: `mutation{ generateMerchantKey{ secret_key key_id} }` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  fetchMerchantSecretKeyById: ({merchantId}) => {
    const body = { query: `mutation{ generateMerchantKeyById(merchantId:"${merchantId}"){ secret_key key_id} }` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
