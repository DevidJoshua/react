import ReduxPersist from '../Config/ReduxPersist'
import LocalForage from 'localforage'
import { persistStore } from 'redux-persist'
import StartupActions from '../Redux/StartupRedux'
import DebugConfig from '../Config/DebugConfig'

const updateReducers = store => {
  const reducerVersion = ReduxPersist.reducerVersion
  const startup = () => store.dispatch(StartupActions.startup())

  // Check to ensure latest reducer version
  const setPersistStore = () =>
    new Promise(resolve => {
      LocalForage.getItem('reducerVersion')
        .then(localVersion => {
          if (localVersion !== reducerVersion) {
            if (DebugConfig.useReactotron) {
              console.tron.display({
                name: 'PURGE',
                value: {
                  'Old Version:': localVersion,
                  'New Version:': reducerVersion
                },
                preview: 'Reducer Version Change Detected',
                important: true
              })
            } else {
            }
            // Purge store
            resolve(persistStore(store, null, startup).purge())
            LocalForage.setItem('reducerVersion', reducerVersion)
          } else {
            resolve(persistStore(store, null, startup))
          }
        })
        .catch(() => {
          resolve(persistStore(store, null, startup))
          LocalForage.setItem('reducerVersion', reducerVersion)
        })
    })
  setPersistStore().then(r => r)
}

export default { updateReducers }
