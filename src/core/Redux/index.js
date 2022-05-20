import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import CreateStore from './CreateStore'
import rootSaga from '../Sagas/'
import ReduxPersist from '../Config/ReduxPersist'
import { reducers as internalRedux } from '../features'

export default ({ externalRedux, externalApi, externalSagas }) => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    ...internalRedux,
    app: require('./AppRedux').reducer,
    login: require('../Containers/Login/redux').reducer,
    modal: require('../Containers/Modal/redux').reducer,
    theme: require('../Styles/redux').reducer,
    ...externalRedux
  })
  let finalReducers = rootReducer

  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, rootReducer)
  }
  const store = CreateStore(finalReducers, rootSaga({ externalApi, externalSagas }))
  return { store }

  // return configureStore(finalReducers, rootSaga)
}
