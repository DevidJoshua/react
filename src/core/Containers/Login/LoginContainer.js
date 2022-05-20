import React from 'react'
import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from './redux'
import { isLoggedIn } from '../../Utils/Utils'
import LoginComponent from './LoginComponent'
import { injectIntl } from 'react-intl'
import AppConfig from '../../Config/AppConfig'
const basePath = AppConfig.basePath

class TheComponent extends React.PureComponent {
  componentDidMount () {
    this.props.resetForm()
    // check login on server
    this.props.loginCheckLogin({})
  }

  render () {
    if (isLoggedIn(this.props.isLoggedIn) === true && this.props.userPrivileges.length > 0) return window.open(`${basePath}${AppConfig.appHomePage}`, '_self', true)
    else return (<LoginComponent {...this.props} />)
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    homePageUrl: state.app.homePageUrl,
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login),
    sessionToken: LoginSelectors.sessionToken(state.login),
    formSubmitMessage: LoginSelectors.getFormSubmitMessage(state.login),
    responseMessage: LoginSelectors.responseMessage(state.login),
    responseDescription: LoginSelectors.responseDescription(state.login),
    responseCode: LoginSelectors.responseCode(state.login),
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetForm: data => dispatch(LoginActions.loginReset(data)), 
    loginDoLogin: data => dispatch(LoginActions.loginDoLogin(data)),
    loginCheckLogin: data => dispatch(LoginActions.loginCheckLogin(data)),
    loginPatch: data => dispatch(LoginActions.loginPatch(data)),
    logout: data => dispatch(LoginActions.logout())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
