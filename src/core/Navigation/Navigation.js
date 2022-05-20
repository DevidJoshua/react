import React, { Component } from 'react'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import _ from 'lodash'
import { pageList, lp } from '../Utils/Pages'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { loadScript } from '../Utils/Utils'
import AppConfig from '../Config/AppConfig'
import { LayoutCon } from '../features/layout'
import { isLoggedIn, getEnvMode } from '../../core/Utils/Utils'
const basePath = AppConfig.basePath
const loginPath = basePath + '/login'
class App extends Component {
  constructor (props) {
    super(props)
    this.unlisten = this.props.history.listen((location, action) => {
      let r = {}
      const pathSplit = (window.location.pathname || '').split('/')
      if ((window.location.pathname).includes('detail') || (window.location.pathname).includes('update') || (window.location.pathname).includes('create')) {
        for (const i in lp) {
          if (i.startsWith(`/${pathSplit[1]}/${pathSplit[2]}`)) { r = lp[i]; break }
        }
      } else r = lp[window.location.pathname] || {}
      const title = r.title
      if (title) this.props.appPatch({ routeActive: window.location.pathname, pageTitle: title })
    })
    if (window.location.pathname === '/') {
      if (isLoggedIn()) window.location.href = '/dashboard-ecomm'
      else window.location.href = '/login'
    }
  }

  componentWillUnmount () {
    this.unlisten()
  }

  componentDidMount () {
    loadScript()
  }

  render () {
    return <>{this.props.children}</>
  }
}
const AppContainer = withRouter(App)

const theme = createTheme({
  palette: {
    mode: 'light',
    menuDrawerIcon: {
      main: 'white'
      // main: 'white',
      // dark: 'yellow',
      // contrastText: '#fff',
    },
    menuDrawerBgColor: {
      main: '#071427'
      // main: 'white',
      // dark: 'yellow',
      // contrastText: '#fff',
    }
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem'
        }
      }
    },
    // ini override style dari menu drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          // background: '#006A71',
          background: getEnvMode() === 'production' ? '#071427' : '#006A71',
          color: 'white'
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        secondary: {
          color: '#eeeeee'
        }
      }
    }
  }
})

const warningPage = () =>{
  return <Alert severity="warning">
            <AlertTitle>Peringatan</AlertTitle>
            Mohon maaf anda belum bisa mengakses fitur ini. Anda belum terasosiasi merchant manapun
        </Alert>
}
class NavigationRouter extends Component {
  render () {
    const { userPrivileges,isMerchantExists,isLoggedIn } = this.props
    const authorizedRoute = _.filter(pageList, v => (userPrivileges || []).includes(v.privName || v.path) || v.isPublic)
    console.log('userPrivileges=====>', userPrivileges)
    console.log('authorizedRoute=====>', authorizedRoute)
    return (
      <Router>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppContainer checkLogedStatus={this.props.checkLogedStatus} appPatch={this.props.appPatch}>
            <LayoutCon sidemenu={this.props.sidemenu} appname='adminlte' is>
              {authorizedRoute.map(r => (
                // <Route key={r.path} nofrets='opetvina' exact path={`${basePath}${r.path}`} component={!_.isNil(isLoggedIn) && isLoggedIn ? (isMerchantExists ?  r.component : warningPage) : r.component} />
                <Route key={r.path} nofrets='opetvina' exact path={`${basePath}${r.path}`} component={r.component} />
              ))}
            </LayoutCon>
          </AppContainer>
        </ThemeProvider>
        {/* </Suspense> */}
      </Router>
    )
  }
}
export default NavigationRouter
