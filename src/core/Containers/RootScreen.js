import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { Redirect } from 'react-router-dom'
import PointofsaleLayout from '../Components/PointofsaleLayout'
import { LoginSelectors } from './Login/redux'
import UserActions from './User/redux'
import { isLoggedIn } from '../Utils/Utils'

export class RootScreen extends React.Component {
  render () {
    return (
      <div style={{ flex: 1 }}>
        <div>Hello There.</div>
      </div>
    )
  }
}

const TheComponent = props =>
  isLoggedIn(this.props.isLoggedIn) === true ? (
    <PointofsaleLayout {...props} />
  ) : (
    <Redirect to='/login' />
  )

const mapStateToProps = state => {
  return {
    isLoggedIn: LoginSelectors.isLoggedIn(state.login),
    username: LoginSelectors.sessionToken(state.login)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserProfile: query => dispatch(UserActions.userRequestProfile(query))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(TheComponent))
