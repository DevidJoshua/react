import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import Actions from './redux'
import {callToastr} from '../../core/Utils/Utils'
import LoginActions from '../../core/Containers/Login/redux'
import {base64toBlob} from '../../core/Utils/Utils'
import _ from 'lodash'

function str2ab(str) {
  var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export function * fetchDataExport (api, { data }) {
  const response = yield call(api.fetchDataExport, data)
  console.log("response=====>",response)
  const errors = path(['data', 'errors'], response) || []
  if (!_.isEmpty(response.problem)) errors.push({ message: response.problem })
  const errorBody = path(['data', 'data', 'createMerchantKeyByMerchantId', 'error'], response)
  const exportData = path(['data', 'data', 'createMerchantKeyByMerchantId', 'detail_data', 'order_code'], response)
  if (!_.isEmpty(errorBody)) errors.push({ message: errorBody })  
  
  if (!_.isEmpty(errors) && (_.isEqual((errors[0] || {}).message, 'Invalid Access Token') || _.isEqual((errors[0] || {}).message, 'jwt expired'))) {
    yield put(LoginActions.loginDoLogout({}))
  } else if (!_.isEmpty(errors)) {
    console.log("error=====>",errors[0])
    callToastr(`Ada kesalahan. ${errors[0]}`,'error')
    yield put(Actions.fetchExportDataDone({serviceName:data.serviceName,error:errors[0]}))
  } else {
    const fileName = response.headers['content-disposition'].split('filename= ')[1]
    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    callToastr(`Sukses mengekspor data`,'success')
    yield put(Actions.fetchExportDataDone({serviceName:data.serviceName,exportData}))
  }
}
