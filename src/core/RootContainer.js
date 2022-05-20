import React, { PureComponent } from 'react'
import Navigation from './Navigation/Navigation'
import { connect } from 'react-redux'
import StartupActions from './Redux/StartupRedux'
import AppActions, { AppSelectors } from './Redux/AppRedux'
import ReduxPersist from './Config/ReduxPersist'
import LoginActions, { LoginSelectors } from './Containers/Login/redux'
import { IntlProvider } from 'react-intl'
import { registerLocale } from 'react-datepicker'
import localeId from 'date-fns/locale/id'
import enTranslationMessages from './Translations/en.json'
import idTranslationMessages from './Translations/id.json'
import { listenToUserIdle, getSession, isLoggedIn, callToastr } from './Utils/Utils'
import AppConfig from './Config/AppConfig'
import moment from 'moment'

registerLocale('id', localeId)

export const appLocales = ['en', 'id']

export const DEFAULT_LOCALE = 'en'

export const formatTranslationMessages = (locale, messages) => {
  const defaultFormattedMessages = locale !== DEFAULT_LOCALE ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages) : {}
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key]
    return Object.assign(formattedMessages, { [key]: formattedMessage })
  }, {})
}
export const translationMessages = {
  en: enTranslationMessages,
  id: idTranslationMessages
}
class RootContainer extends PureComponent {
  componentDidMount () {
    var i = 200
    var interval = null
    // Listen to idle time change
    if (isLoggedIn()) {
      interval = setInterval(() => {
        i += 1
        var idleTime = getSession(AppConfig.idleTimeFlag)
        var now = moment()
        // check time diffrence in localstorage
        var duration = (moment.duration((moment(idleTime)).diff(now))).minutes()

        setTimeout(() => {
          if (duration < 2) {
            callToastr('Logging out...', 'warning')
            this.props.logout({})
            clearInterval(interval)
          } else if (duration === 10) {
            callToastr('Aplikasi akan terlogout otomatis dalam 10 menit.', 'warning')
          } else if (duration === 5) {
            callToastr('Aplikasi akan terlogout otomatis dalam 5 menit.', 'warning')
          }
        }, 1000)
      }, i)
    } else {
      interval = null
    }

    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  render () {
    console.log('rootContainer render userPrivileges====>', this.props.userPrivileges)
    const translations = this.props.translations || translationMessages
    const lang = this.props.lang || 'id'
    let messages = {}

    listenToUserIdle()

    if (translations.hasOwnProperty(lang)) {
      messages = translations[lang]
    }

    return (
      <IntlProvider locale={lang} messages={messages}>
        <Navigation isLoggedIn={isLoggedIn()} isMerchantExists={this.props.isMerchantExists} userPrivileges={this.props.userPrivileges} appPatch={this.props.appPatch} checkLogedStatus={this.props.getLoginStatus} sidemenu={this.props.sidemenu} />
      </IntlProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

    loginToken: LoginSelectors.sessionToken(state.login),
    lang: AppSelectors.lang(state.app),
    userPrivileges: state.myprofile.user_privileges,
    isMerchantExists: (state.myprofile.user_merchants || []).length > 0,
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  appPatch: data => dispatch(AppActions.appPatch(data)),
  startup: () => dispatch(StartupActions.startup()),
  logout: data => dispatch(LoginActions.loginDoLogout(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootContainer)
