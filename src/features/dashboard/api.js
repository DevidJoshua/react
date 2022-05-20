// a library to wrap and simplify api calls
// import AppConfig from 'core/Config/AppConfig'
import { getAccessToken, generateHmac } from 'core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'

export const create = api => ({
  dashboardFetchData: () => {
    const body = { query: 'query{getDasbhoardData1{ team_member{ _id full_name email } payment_success payment_pending payment_failed payment_amount }}' }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
