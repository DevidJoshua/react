import { call, put } from 'redux-saga/effects'
import Actions from './redux'
import { path } from 'ramda'
import { consumeGraphqlResponse } from 'core/Transforms/TransformAttributes'
// import { callErrorToast } from '../../Utils/Utils'
export function * dashboardFetchData (api, { data }) {
  const resp = yield call(api.dashboardFetchData, data)
  const payload = path(['data', 'data', 'getDasbhoardData1'], resp)
  yield put(Actions.dashboardFetchDataDone({ payload }))
}
