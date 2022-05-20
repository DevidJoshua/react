import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import _ from 'lodash'
import { path } from 'ramda'
import { isNullOrUndefined } from 'util'
import { saveTableHeaders,deleteTableHeaders,getTableheaders } from '../../core/Utils/Utils'
import Immutable from 'seamless-immutable'

export function * changeCustomColumn (api, action) {
  const { data } = action
  const {userId,merchantId,tableId,tableColumns} = data
  saveTableHeaders({userId,merchantId,tableId,headerKeys:Immutable.asMutable((tableColumns || []).map(r=>r.headerKey))})
  yield put(Actions.toogleDialog({isOpen:false,tableId:data.tableId}))
}

export function * fetchCustomColumns (api, action) {
  const { data } = action
  const {userId,merchantId,tableId,originalCols} = data
  const dataCol = getTableheaders({userId,merchantId,tableId}) || []
  const tableColumns = (dataCol.headerKeys||[]).map(r=>originalCols.find(s=>{
    return s.headerKey === r
  }))
  yield put(Actions.fetchCostomColumnsDone({tableId,tableColumns}))
}

export function * resetCustomColumns (api,action) {
  const { data } = action
  const {userId,merchantId,tableId} = data
  deleteTableHeaders({userId,merchantId,tableId})
  yield put(Actions.removeCustomColumns({tableId}))
}