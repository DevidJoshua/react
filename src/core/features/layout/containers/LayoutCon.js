import { connect } from 'react-redux'
import LoginActions, { LoginSelectors } from '../../../Containers/Login/redux'
import LayoutComp from '../components/LayoutComp'
import AppActions, { AppSelectors } from 'core/Redux/AppRedux'
import { isLoggedIn, getSession, checkIfPublicUrl } from '../../../Utils/Utils'

const renderUnLoggedIn = (children) => {
  if (
    !checkIfPublicUrl()
  ) {
    window.location.href = '/login'
    return null
  }

  return (
    <>
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >{children}
      </div>
    </>
  )
}

const Comp = (props) => {
  const { isLogIn, children } = props
  if ((isLoggedIn(isLogIn) === true)) return <LayoutComp {...props} />
  else return renderUnLoggedIn(children)
}


const mapStateToProps = (state, ownProps) => {
  return {
    isLogIn: LoginSelectors.isLoggedIn(state.login),
    userRole: LoginSelectors.userRole(state.login),
    isRequesting: LoginSelectors.isRequesting(state.login),
    profile: state.myprofile,
    toggleDrawerFlag: state.login.toggleDrawer,
    routeActive: AppSelectors.routeActive(state.app),
    plan: (state.myprofile.merchant || {}).plan,
    userPrivileges: state.myprofile.user_privileges || []
    // isLoading: state.splash.isLoading
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
//   resetfetchProfile: data => dispatch(ProfileAction.profileReset(data)),
//   fetchProfile: data => dispatch(ProfileAction.fetchProfileData(data)),
  doLogout: data => dispatch(LoginActions.loginDoLogout(data)),
  setToggleDrawer: data => dispatch(LoginActions.setToggleDrawer(data))
//   getRelated: data => dispatch(RmAction.fetchRelatedInstitution(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comp)
