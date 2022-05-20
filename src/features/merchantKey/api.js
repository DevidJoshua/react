import { generateHmac, getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  merchantkeySubmitForm: ({ merchant_id: merchantId }) => {
    const body = { query: `mutation{createMerchantKeyByMerchantId(request:{merchant_id: ${merchantId}}){ error, detail_data{_id} }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  merchantkeyFetchCurrentMerchantKey: () => {
    const body = { query: 'query{getCurrentMerchantKey{ error, encrypted_secret_key, backend_callback_url, key_id, frontend_callback_url, merchant_code }}' }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  merchantkeyUpdateCurrentCallbackUrl: ({ merchantId, backendCallbackUrl, frontendCallbackUrl }) => {
    const body = { query: `mutation{updateCurrentCallbackUrl(request: { merchant_id: ${merchantId}, backend_callback_url: "${backendCallbackUrl}", frontend_callback_url: "${frontendCallbackUrl}" }){ error, status, backend_callback_url, frontend_callback_url }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
