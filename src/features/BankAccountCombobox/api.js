// a library to wrap and simplify api calls
import AppConfig from '../../core/Config/AppConfig'
import { generateHmac, getAccessToken } from '../../core/Utils/Utils'

export const create = api => ({
  fetchBankListCombobox: () => {
    // const merchant_id = getSession('merchant_id')
    const at = getAccessToken()
    const body = `query{
                    getAllBankCode{
                      list_data{
                        bank_name
                        bank_code
                      }
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
