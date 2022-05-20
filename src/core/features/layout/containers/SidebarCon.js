import React from 'react'
import { connect } from 'react-redux'
import loadable from '@loadable/component'
import LoginActions, { LoginSelectors } from '../../../Containers/Login/redux'
import AppActions, { AppSelectors } from '../../../Redux/AppRedux'
// import Sidebar from '../../Components/Sidebar/Sidebar'

const Sidebar = loadable(() => import('../components/Sidebar'))
const Comp = (props) => <Sidebar homePageUrl={props.homePageUrl} setHomePageUrl={props.setHomePageUrl} sidemenu={props.sidemenu} userMerchantCode={props.userMerchantCode} userRole={props.userRole} appPatch={props.appPatch} routeActive={props.routeActive} sessionToken={props.sessionToken} history={props.history} {...props} />

const mapStateToProps = (state, ownProps) => {
  // console.log('state.myprofile===>', state.myprofile)
  return {
    userPrivileges: state.myprofile.user_privileges || [],
    profile: state.login.user,
    userFullName: LoginSelectors.userFullName(state.login),
    sessionToken: LoginSelectors.sessionToken(state.login),
    userMerchantCode: LoginSelectors.userMerchantCode(state.login),
    routeActive: AppSelectors.routeActive(state.app),
    toggleDrawerFlag: state.login.toggleDrawer,
    homePageUrl: state.app.homePageUrl,
    currentMerchant: state.myprofile.merchant,
    isMerchantExists: (state.myprofile.user_merchants || []).length > 0,
    // userRole: LoginSelectors.userRole(state.login)
  }
}
const mapDispatchToProps = dispatch => {
  return {
    appPatch: data => dispatch(AppActions.appPatch(data)),
    setHomePageUrl: data => dispatch(AppActions.setHomePageUrl(data)),
    setToggleDrawer: data => dispatch(LoginActions.setToggleDrawer(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
