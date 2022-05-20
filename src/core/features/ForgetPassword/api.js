// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import { generateHmac, getAccessToken } from '../../Utils/Utils'

export const create = api => ({
  forgetpasswordSubmitEmail: ({ email }) => {
    // const merchant_id = getSession('merchant_id')
    const at = getAccessToken()
    const body = `mutation{
      forgetpasswordSubmitEmail(email:"${email}") {
          status
          error
        }
      }`
    // console.log('body change password====>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', at)
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  forgetpasswordValidateToken: ({ token }) => {
    // const merchant_id = getSession('merchant_id')
    const at = getAccessToken()
    const body = `mutation{
      forgetpasswordValidateToken(token:"${token}") {
          status
          error
        }
      }`
    // console.log('body change password====>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', at)
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  forgetpasswordSubmitNewPassword: ({ newpassword, token }) => {
    // const merchant_id = getSession('merchant_id')
    const at = getAccessToken()
    const body = `mutation{
      forgetpasswordSubmitNewPassword(newpassword:"${newpassword}", token: "${token}") {
          status
          error
        }
      }`
    // console.log('body change password====>', body)
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', at)
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  }
})
