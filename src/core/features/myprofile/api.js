import { generateHmac, getAccessToken } from '../../Utils/Utils'
import AppConfig from '../../Config/AppConfig'
export const create = api => ({
  myprofileChangeMerchant: ({ merchant_id: merchantId }) => {
    const body = { query: `mutation{myprofileChangeMerchant(merchant_id: ${merchantId}){ error, status, user_privileges }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
