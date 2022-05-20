import React from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from './Redux'
import { ThemeProvider } from '@mui/styles'
import theme from './Themes/mui'

export default ({ api, redux, sagas, translations, sidemenu }) => {
  const { store } = createStore({ externalApi: api, externalRedux: redux, externalSagas: sagas })
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RootContainer translations={translations} sidemenu={sidemenu} />
      </ThemeProvider>
    </Provider>
  )
}
