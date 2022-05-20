import _ from 'lodash'
import Immutable from 'seamless-immutable'
import { jsonToGraphQLQuery, EnumType } from 'json-to-graphql-query'
import AppConfig from '../../Config/AppConfig'
import { generateHmac, getAccessToken, isJsonString } from '../../Utils/Utils'

const doQuery = ({ api, filter, fields, serviceName, pageSize, pageIndex }) => {
  let theFilterString = null
  const arr = []
  for (const prop in filter) {
    arr.push(`${prop}: "${filter[prop]}"`)
  }
  if (!_.isEmpty(arr)) theFilterString = _.join(arr, ',')
  
  console.log('theFilterString===>', theFilterString)

  const body = `query{
                    ${serviceName}${_.isEmpty(theFilterString) ? `(page_size: ${pageSize}, page_index: ${pageIndex})` : `(${theFilterString}, page_size: ${pageSize}, page_index: ${pageIndex})`}
                    {
                        status
                        error
                        count
                        page_count
                        list_data
                            {
                                ${fields}
                            }
                    }
                }`

  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  // console.log('queryhmac===>>>', generateHmac(query))
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry===', query)
  return resp
}

const fetchAllServiceVersion1 = ({ api, filter, fields, serviceName, pageSize, pageIndex, whereCondition, distinct, sortBy }) => {
  let theFilterString = null
  let theWhereConditionString = ''
  const arr = []
  for (const prop in filter) {
    arr.push(`${prop}: "${filter[prop]}"`)
  }
  if (!_.isEmpty(arr)) theFilterString = _.join(arr, ',')
  // console.log('theFilterString===>', theFilterString)
  // console.log('whereCondition===>', whereCondition)

  const arr2 = []
  if (whereCondition !== undefined) whereCondition = _.pickBy(whereCondition, (v) => !(v === undefined || v === '' || v === null))
  for (const prop in whereCondition) {
    const wcValue = whereCondition[prop]
    // console.log('wcValue===>', wcValue)
    // check type
    if (wcValue instanceof Array) arr2.push(`${prop}: ${JSON.stringify(wcValue)}`)
    else arr2.push(`${prop}: "${whereCondition[prop]}"`)
  }
  // console.log('arr2====>', arr2)
  if (!_.isEmpty(arr2)) theWhereConditionString = _.join(arr2, ',') + ','

  let sortByBy = null
  if (!_.isEmpty(sortBy)) sortByBy = JSON.stringify(sortBy).replace(/"/g, '\'')

  const body = `query{${serviceName}${_.isEmpty(theFilterString) ? `(${sortByBy ? 'sort_by:"' + sortByBy + '",' : ''} ${distinct ? 'distinct:"' + distinct + '",' : ''} ${theWhereConditionString} page_size: ${pageSize}, page_index: ${pageIndex})` : `(${sortByBy ? 'sort_by:"' + sortByBy + '",' : ''} ${distinct ? 'distinct:"' + distinct + '",' : ''} ${theWhereConditionString} ${theFilterString}, page_size: ${pageSize}, page_index: ${pageIndex})`}{status,error,count,page_count,list_data{${fields}}}}`

  const query = { query: body }

  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  // console.log('queryhmac===>>>', generateHmac(query))
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry2===', query)
  return resp
}

const fetchAllServiceVersion2 = ({ api, filter, fields, serviceName, pageSize, pageIndex, whereCondition, distinct, sortBy, ignoreFields, additionalRequests }) => {
  const request = {
    page_index: pageIndex,
    page_size: pageSize,
    ...additionalRequests
  }
  if (sortBy !== undefined && sortBy !== '') request.sort_by = sortBy
  if (filter !== undefined) filter = { ...filter, ...(_.pickBy(filter, (v) => !(v === undefined || v === '' || v === null))) }

  if (whereCondition !== undefined) filter = { ...filter, ...(_.pickBy(whereCondition, (v) => !(v === undefined || v === '' || v === null))) }
  request.filter = filter || {}
  const filedsJson = {}
  const q = { [serviceName]: {} }
  q[serviceName].__args = {
    request: request
  }
  q[serviceName].status = true
  q[serviceName].error = true
  q[serviceName].count = true
  q[serviceName].page_count = true
  if (fields !== undefined && fields !== '') {
    if (typeof fields === 'object') {
      q[serviceName].list_data = fields
    } else {
      (fields.split(',') || []).forEach(v => {
        filedsJson[v] = true
      })
      q[serviceName].list_data = filedsJson
    }
  }
  console.log('qry31===', q)

  const body = jsonToGraphQLQuery({
    query: q
  }, { pretty: false, ignoreFields })

  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry3===', body)
  return resp
}

const upsertServiceVersion1 = ({ api, fileArray, payload, serviceName, id }) => {
  api.setHeader('AccessToken', getAccessToken())
  let graphQlFields = null
  const arr = []
  const pLoad = Immutable.asMutable(payload || {}, { deep: true })
  for (const prop in pLoad) {
    let val = pLoad[prop]
    console.log('val=====>>>', val)
    // if (val !== null) {
    // order does metters
    if (val === null) {
      arr.push(`${prop}: null`)
    } else if (typeof val === 'number') {
      arr.push(`${prop}: "${val}"`)
    } else if (Array.isArray(val)) {
      // console.log('arrayVal===>', val)
      arr.push(`${prop}: ${JSON.stringify(val)}`)
    } else if (isJsonString(val)) {
      // console.log('valvalval', val)
      val = val.replace(/"/g, "'")
      arr.push(`${prop}: "${val}"`)
    } else if (prop === 'content1') {
      val = encodeURIComponent(val)
      arr.push(`${prop}: "${val}"`)
    } else {
      arr.push(`${prop}: "${val.replace(/\n/g, '\\n').replace(/"/g, '\\"')}"`)
    }
    // }
  }
  // arr.push(`_id: "${id}"`)
  if (!_.isEmpty(arr)) graphQlFields = _.join(arr, ',')
  const body = { query: `mutation{${serviceName}(${graphQlFields}){ error detail_data{_id} }}` }
  // console.log('body==>', JSON.stringify(body))
  api.setHeader('hmac', generateHmac(JSON.stringify(body)))

  return api.post(AppConfig.graphqlPath, body)
}

const upsertServiceVersion2 = ({ api, fileArray, payload, serviceName, id }) => {
  const request = payload
  const q = { [serviceName]: {} }
  q[serviceName].__args = {
    request: request
  }
  q[serviceName].error = true
  q[serviceName].detail_data = { _id: true }

  const body = jsonToGraphQLQuery({
    mutation: q
  }, { pretty: false })
  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry4===', body)
  return resp
}

const upsertServiceVersion3 = ({ api, fileArray, payload, serviceName, id }) => {
  let request = payload
  const q = { [serviceName]: {} }
  q[serviceName].__args = {
    request: request
  }
  q[serviceName].error = true
  q[serviceName].data_detail = { id: true }

  const body = jsonToGraphQLQuery({
    mutation: q
  }, { pretty: false })
  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry4===', body)
  return resp
}

const fetchDetailService = ({ api, id, serviceName, fields, additionalFields }) => {
  const body = `query{${serviceName}(id: "${id}"){status,error,data_detail{${fields}}${additionalFields ? ',' + additionalFields.join(',') : ''}}}`
  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  // console.log('queryhmac===>>>', generateHmac(query))
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry5===', query)
  return resp
}

const fetchDetailService2 = ({ api, id, serviceName, fields, additionalFields }) => {
  const q = { [serviceName]: {} }
  q[serviceName].__args = {
    id: `${id}`
  }
  q[serviceName].status = true
  q[serviceName].error = true
  q[serviceName].data_detail = true

  const filedsJson = {}
  if (fields !== undefined && fields !== '') {
    if (typeof fields === 'object') {
      q[serviceName].data_detail = fields
    } else {
      (fields.split(',') || []).forEach(v => {
        filedsJson[v] = true
      })
      q[serviceName].data_detail = filedsJson
    }
  }

  const body = jsonToGraphQLQuery({
    query: q
  }, { pretty: false })
  const query = { query: body }

  // const body = `query{${serviceName}(id: "${id}"){status,error,data_detail{${fields}}${additionalFields ? ',' + additionalFields.join(',') : ''}}}`
  // const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  // console.log('queryhmac===>>>', generateHmac(query))
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry5===', query)
  return resp
}

const fetchDetailService3 = ({ api, id, serviceName, fields, additionalFields }) => {
  const body = `query{${serviceName}(request:{id: "${id}",zone:"${Intl.DateTimeFormat().resolvedOptions().timeZone}"}){status,error,data_detail{${fields}}${additionalFields ? ',' + additionalFields.join(',') : ''}}}`
  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  const resp = api.post(AppConfig.graphqlPath, query)
  console.log('qry6===', query)
  return resp
}

const toogleRowData = ({ api,serviceName, fields, returns }) => {
  const body = `mutation{${serviceName}(${fields})){${returns} }`
  const query = { query: body }
  api.setHeader('hmac', generateHmac(JSON.stringify(query)))
  api.setHeader('AccessToken', getAccessToken())
  const resp = api.post(AppConfig.graphqlPath, query)
  return resp
}

export const create = api => ({
  getAllCourses: ({ filter, fields, serviceName, pageSize, pageIndex, distinct }) => {
    return doQuery({ api, filter, fields, serviceName, pageSize, pageIndex })
  },
  fetchAllService: (params) => {
    if (params.apiVersion === 2) return fetchAllServiceVersion2({ api, ...params })
    return fetchAllServiceVersion1({ api, ...params })
  },
  fetchDetailService: (params) => {
    if (params.apiVersion === 2) return fetchDetailService2({ api, ...params })
    else if(params.apiVersion === 3) return fetchDetailService3({ api, ...params })
    return fetchDetailService({ api, ...params })
  },
  deleteService: ({ serviceName, deletePayload }) => {

    let payload = ''
    let i = 0

    for(const key in deletePayload){
      let val = typeof deletePayload[key] === 'string' ?  `"${deletePayload[key]}"` : deletePayload[key] 
      i++
      if(i < Object.keys(deletePayload).length){
        payload+= `${key}:${val},`  
      }else{
        payload+= `${key}:${val}`  
      }
     
    }

    const body = { query: `mutation{${serviceName}(request:{${payload}}){ status message }}` }
    console.log('body delete service==>', body)

    api.setHeader('hmac', generateHmac(JSON.stringify(body)))
    api.setHeader('AccessToken', getAccessToken())
    return api.post(AppConfig.graphqlPath, body)
  },
  uploadFileService: ({ fileArr }) => {
    var formData = new FormData()
    for (let i = 0; i < fileArr.length; i++) {
      formData.append('file', fileArr[i])
    }

    const headers = {
      'Content-Type': 'multipart/form-data',
      AccessToken: getAccessToken()
    }
    return api.post('/api/uploadfileV2', formData, { headers })
    // console.log('uploadFileResp===>', uploadFileResp)
  },
  upsertService: (params) => {
    console.log('upsertService===>', params)
    if (params.apiVersion === 2) return upsertServiceVersion2({ api, ...params })
    else if (params.apiVersion === 3) return upsertServiceVersion3({ api, ...params })
    else return upsertServiceVersion1({ api, ...params })
  },
  toogleRowDataService:(params) =>{
    toogleRowData(params)
  }
})
