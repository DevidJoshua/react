// a library to wrap and simplify api calls
import AppConfig from '../../Config/AppConfig'
import { getSession, generateHmac, getAccessToken } from '../../Utils/Utils'

export const create = api => ({
  loginDoLogin: ({ email, password }) => {
    const body = `query{login(username:"${email}", password:"${password}"){ access_token status error user{full_name, username, email, user_id} user_privileges role user_merchants{id, merchant_name, merchant_code, is_default, plan} } }`
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('Content-Type', 'application/json')
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  loginCheckLogin: () => {
    const body = 'query{checkLogin{ access_token status error user{full_name, username, email, user_id} user_privileges role user_merchants{id, merchant_name, merchant_code, is_default, plan} } }'
    const query = { query: body }
    api.setHeader('AccessToken', getAccessToken())
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('Content-Type', 'application/json')
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  },
  doLogout: () => {
    const accessToken = getSession(AppConfig.sessionToken)
    const body = `mutation{logout(access_token:"${accessToken}"){ status error } }`
    console.log('query logoou>>>', body)
    const query = { query: body }
    api.setHeader('hmac', JSON.stringify(generateHmac(query)))
    const resp = api.post(AppConfig.graphqlPath, { query: body })
    return resp
  },
  getLoginStatus: (data, opt) => {
    const token = getSession('access_token')
    const body = `query{loginMerchant(access_token:"${token}"){ status error } }`
    const query = { query: body }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('mac', generateHmac(JSON.stringify(query)))
    const resp = api.post(AppConfig.graphqlPath, query)
    return resp
  }
})
