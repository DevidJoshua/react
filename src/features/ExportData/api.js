import { getAccessToken } from '../../core/Utils/Utils'
import AppConfig from 'core/Config/AppConfig'

export const create = api => ({
  fetchDataExport: async({ payload,endPoint,fileType }) => {
    api.setHeaders({
      'AccessToken': getAccessToken(),
      'Access-Control-Allow-Origin': '*'
    })
    let resp = null
    switch(fileType){
      case 'xlsx':
          return api.post(`${process.env.REACT_APP_DEV_HOST_PROXY || AppConfig.hostBackend }${endPoint}`, JSON.stringify(payload),{responseType:'blob'})
        break;
      case 'txt':
          resp = await api.post(`${process.env.REACT_APP_DEV_HOST_PROXY || AppConfig.hostBackend }${endPoint}`, JSON.stringify(payload))
          resp.data = new Blob([resp.data || ''])
          return resp
        break;
      case 'csv':
          resp = await api.post(`${process.env.REACT_APP_DEV_HOST_PROXY || AppConfig.hostBackend }${endPoint}`, JSON.stringify(payload))
          resp.data = new Blob([resp.data || '' ])
          return resp
        break
      default:
          return api.post(`${process.env.REACT_APP_DEV_HOST_PROXY || AppConfig.hostBackend }${endPoint}`, JSON.stringify(payload),{responseType:'blob'})
        break;
    }
  }
})
