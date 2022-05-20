import { generateHmac, getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'
export const create = api => ({
  payVa: ({ vaNumber }) => {
    const body = { query: ` mutation{ payVaTransactionSimulator(request:{vaNumber:"${vaNumber}"}){ status error message } }` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  payQris: ({ qrisData }) => {
    const body = { query: ` mutation{ payQrTransactionSimulator(request:{qrisData:"${qrisData}"}){ status error } }` }
    console.log('body==>', JSON.stringify(body))
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
