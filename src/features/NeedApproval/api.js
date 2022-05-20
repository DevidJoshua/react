// a library to wrap and simplify api calls
import AppConfig from 'core/Config/AppConfig'
import { generateHmac, getAccessToken } from 'core/Utils/Utils'
import { isNull } from 'lodash';

export const create = api => ({
  needApprovalFetchData: ({ email }) => {
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
  needapprovalCheckboxSubmitApprove: ({ merchantId, needapprovalCheckbox,apiver,approveServiceEntity }) => {
    //load manifest data and get generate query

    console.log('api needapprovalCheckboxSubmitApprove ')
    const disbursementIds = []
    for (const key in needapprovalCheckbox) {
      if (needapprovalCheckbox[key]) disbursementIds.push(key)
    }
    let body = {}
    switch(apiver){
      case 1:
        body = { query: `mutation{${approveServiceEntity}(merchant_id: "${merchantId}", disbursementIds: [${disbursementIds.join(',')}]){ message, status }}` }
        break;
      case 2:
        body = { query: `mutation{${approveServiceEntity}(merchant_id: "${merchantId}", request:{ids: [${disbursementIds.join(',')}]}){ message, status }}` }
        break;
    }

    
    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  },
  needapprovalCheckboxSubmitReject: ({ merchantId, needapprovalCheckbox,apiver,rejectServiceEntity }) => {
    const disbursementIds = []
    for (const key in needapprovalCheckbox) {
      if (needapprovalCheckbox[key]) disbursementIds.push(key)
    }

    console.log("mutation needapprovalCheckboxSubmitApprove>>>>",`mutation{${rejectServiceEntity}(merchant_id: "${merchantId}", disbursementIds: [${disbursementIds.join(',')}]){ error, status }}` )
    let body = {}

    switch(apiver){
      case 1:
        body = { query: `mutation{${rejectServiceEntity}(merchant_id: "${merchantId}", disbursementIds: [${disbursementIds.join(',')}]){ message, status }}` }
        break;
      case 2:
        body = { query: `mutation{${rejectServiceEntity}(merchant_id: "${merchantId}", request:{ids: [${disbursementIds.join(',')}]}){ message, status }}` }
        break;
    }

    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    return api.post(AppConfig.graphqlPath, body)
  }
})
