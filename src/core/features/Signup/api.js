import AppConfig from '../../Config/AppConfig'
import { generateHmac } from '../../Utils/Utils'
export const create = api => ({
  signupRequest: ({ email, device_id, full_name, business_name }) => {
    var deviceId = device_id === undefined ?  navigator.userAgent : device_id
    const body = { query: `mutation{signUpV2(email: "${email}", device_id: "${deviceId}", full_name: "${full_name}",business_name:"${business_name}"){ error, status, success }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  },
  signupAdminRequest: ({ email, full_name }) => {
    const body = { query: `mutation{signUpAdmin(email: "${email}", full_name: "${full_name}"){ error, status, success }}` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  }
})
