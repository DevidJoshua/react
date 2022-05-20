// a library to wrap and simplify api calls
// import AppConfig from 'core/Config/AppConfig'
import AppConfig from 'core/Config/AppConfig'
import { generateHmac, getAccessToken } from 'core/Utils/Utils'

export const create = api => ({
  needValidationFetchData: ({ email }) => {
    const body = 'query{getAllDisbursementNeedValidation(request: {page_index: 0, page_size: 10, filter: {}}){status,error,count,page_count,list_data{_id,merchant_name,total_amount,status,account_number,bank_code,created_at,updated_at}}}';
    const query = { query: body }
    api.setHeader('hmac', generateHmac(JSON.stringify(query)))
    api.setHeader('AccessToken', getAccessToken())
    const resp = api.post(AppConfig.graphqlPath, query)
    console.log('API', AppConfig.graphqlPath)
    console.log('qry', query)
    // const resp = api.get('/api/v1/dashboard')
    // const resp = api.get(AppConfig.baseUrl + '/api/v1/dashboard')
    return resp
  },
  needvalidationCheckboxSubmitValidate: ({ merchantId, needvalidationCheckbox }) => {
    console.log('api needvalidationCheckboxSubmitValidate')
    const disbursementIds = []
    for (const key in needvalidationCheckbox) {
      if (needvalidationCheckbox[key]) disbursementIds.push(key)
    }
    console.log("mutation needvalidationCheckboxSubmitValidate>>>>  ",`mutation{needvalidationCheckboxSubmitValidate(merchant_id: "${merchantId}", disbursementIds: [${disbursementIds.join(',')}]){ message, status }}`)
    const body = { query: `mutation{needvalidationCheckboxSubmitValidate(merchant_id: "${merchantId}", disbursementIds: [${disbursementIds.join(',')}]){ message, status }}` }
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  }
})
