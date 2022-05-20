// a library to wrap and simplify api calls
import apisauce from 'apisauce'
import { merge } from 'ramda'
import { api as internalApi } from '../features'

// our "constructor"
const create = ({ baseURL = 'https://jsonplaceholder.typicode.com/', externalApi}) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      // 'Cache-Control': 'no-cache',
      // 'Accept': '*/*',
      'Content-Type': 'application/json',
      // 'Auth': 'Bearer ' + getAccessToken()
      // 'Content-Type': 'application/x-www-form-urlencoded'
      // 'Access-Control-Allow-Origin': 'http://localhost:3001'
      // 'Access-Control-Allow-Origin': '*'
      // 'tesss': 'ok'
      // 'Access-Control-Request-Method': 'POST'
      // 'Access-Control-Allow-Credentials': 'true',
      // 'content-type': 'application/x-www-form-urlencoded'
      // accept: 'application/vnd.api+json',
      // 'content-type': 'application/vnd.api+json'
      // 'Access-Control-Expose-Headers': 'X-My-Custom-Header, X-Another-Custom-Header'
    },
    xsrfCookieName: 'myCatx',
    // withCredentials: true,
    credentials: 'include',
    // 10 second timeout...
    timeout: 36000
  })
  
  let apiMerged = {}
  apiMerged = merge(apiMerged, require('../Containers/Login/api').create(api))

  internalApi.forEach(v => {
    apiMerged = merge(apiMerged, v.create(api))
  })
  externalApi.forEach(v => {
    apiMerged = merge(apiMerged, v.create(api))
  })

  apiMerged = merge(apiMerged, {})

  return {
    ...apiMerged
  }
}

const createUpload = ({ baseURL = 'https://jsonplaceholder.typicode.com/', externalApi}) => {
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Content-Type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*'
    },
    xsrfCookieName: 'myCatx',
    credentials: 'include',
    // 10 second timeout...
    timeout: 36000
  })
  
  let apiMerged = {}
  apiMerged = merge(apiMerged, require('../Containers/Login/api').create(api))

  internalApi.forEach(v => {
    apiMerged = merge(apiMerged, v.create(api))
  })
  externalApi.forEach(v => {
    apiMerged = merge(apiMerged, v.create(api))
  })

  apiMerged = merge(apiMerged, {})

  return {
    ...apiMerged
  }
}

// let's return back our create method as the default.
export default {
  create,
  createUpload
}
