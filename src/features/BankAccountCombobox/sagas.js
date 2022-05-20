import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'
import { callErrorToast } from '../../core/Utils/Utils'
import BaActions from './redux'

export function * fetchBankComboboxData (api, action) {
  const { data } = action

  let err=[]
  const response = yield call(api.fetchBankListCombobox, data)
  console.log('response fetchBankComboboxData>>>>', response)
  const errrobody1 = path(['data', 'errors'], response) || []
  const errorbody2 = path(['data', 'data', 'getAllBankCode', 'error'], response) || []
  const statusBody = parseInt(path(['data', 'data', 'getAllBankCode', 'status'], response) || 0)
  
  if (!_.isEmpty(errrobody1)) err.push({ message: errrobody1 })
  if(errorbody2.lenngth > 0){
    errorbody2.map(r=>{
      err.push({message:r.message})
    })
  }
  if (!_.isEmpty(response.problem)) err.push({ message: response.problem })

  const bank_data = path(['data', 'data', 'getAllBankCode', 'list_data'], response) || []

  if (_.isEmpty(err)) {
    yield put(BaActions.fetchBankData({ bank_data }))
  } else {
    let errors = ''
    if (!isNullOrUndefined(err[0].message)) { errors = err[0].message } else { errors = err[0] }
    yield put(Actions.fetchBankDataDone({ errors:err, status:statusBody }))
    callErrorToast('fetchBankComboboxData error. ' + err, 'error')
  }
}
