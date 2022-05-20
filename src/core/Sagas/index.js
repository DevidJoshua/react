import { all, takeLatest } from 'redux-saga/effects'
import { sagas as internalSagas } from '../features'
// You'll need to alter this file when you go to connect the api for realsies. Add
// back the lines ending with with a # (and of course, remove the #) :)
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'
import AppConfig from '../Config/AppConfig'

// Types /* ------------- Types ------------- */

import { LoginTypes } from '../Containers/Login/redux'
// Sagas /* ------------- Sagas ------------- */
import { loginDoLogin, doLogout, loginCheckLogin } from '../Containers/Login/sagas'

/* ------------- API ------------- */

const hostBackend = AppConfig.env === 'development' ? AppConfig.hostBackend : '/'

/* ------------- Connect Types To Sagas ------------- */

export default ({ externalApi, externalSagas }) => function * root () {
  const getApi = (requestType) =>{
    return requestType === 'file' ? API.createUpload({ baseURL: hostBackend, externalApi }) : API.create({ baseURL: hostBackend, externalApi })  
  } 
  const apiDashboard = ({requestType})=>DebugConfig.useFixtures ? FixtureAPI : getApi(requestType)

  const x = []

  externalSagas.forEach(v => {
    x.push(v.effects(v.type, v.sagas, apiDashboard({requestType:v.requestType})))
  })

  yield all([
    // login
    takeLatest(LoginTypes.LOGIN_DO_LOGIN, loginDoLogin, apiDashboard({requestType:'json'})),
    // logout
    takeLatest(LoginTypes.LOGIN_DO_LOGOUT, doLogout, apiDashboard({requestType:'json'})),
    // check login
    takeLatest(LoginTypes.LOGIN_CHECK_LOGIN, loginCheckLogin, apiDashboard({requestType:'json'})),
    ...internalSagas.map(v => v.effects(v.type, v.sagas, apiDashboard({requestType:v.requestType}))),
    ...externalSagas.map(v => v.effects(v.type, v.sagas, apiDashboard({requestType:v.requestType})))

    // some sagas receive extra parameters in addition to an action
    // takeLatest(UserTypes.USER_REQUEST, getUserAvatar, api)
  ])
}
