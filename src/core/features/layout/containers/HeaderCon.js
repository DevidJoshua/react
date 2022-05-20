import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import LoginActions, { LoginSelectors } from '../../../Containers/Login/redux'
import HeaderComponent from '../../../Components/Header/HeaderComponent'
import HeaderFormComponent from '../../../Components/Header/HeaderFormComponent'
import TablepaginationActions from '../../TablePagination/redux'
import AppActions, { AppSelectors } from '../../../Redux/AppRedux'

const Comp = (props) => {
  const { needToSave } = props
  if (needToSave) {
    return (
      <HeaderFormComponent
        {...props}
      />
    )
  }
  return (
    <HeaderComponent
      {...props}
    />
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: state.myprofile.email,
    fullName: state.myprofile.full_name,
    merchantName: (state.myprofile.merchant || {}).merchant_name,
    sessionToken: LoginSelectors.sessionToken(state.login),
    userFullName: LoginSelectors.userFullName(state.login),
    userRole: LoginSelectors.userRole(state.login),
    routeActive: AppSelectors.routeActive(state.app),
    pageTitle: AppSelectors.pageTitle(state.app),
    plan: (state.myprofile.merchant?.plan || null),
    // relates: state.merchantrelatedinstitution.related_institutions,
    // payload: (state.tablepagination.payload || {})[serviceName],
    needToSave: state.tablepagination.needToSave,
    toggleDrawerFlag: state.login.toggleDrawer
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: data => dispatch(LoginActions.loginDoLogout(data)),
    tablepaginationResetForm: data => dispatch(TablepaginationActions.tablepaginationResetForm(data)),
    setToggleDrawer: data => dispatch(LoginActions.setToggleDrawer(data))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(Comp))
