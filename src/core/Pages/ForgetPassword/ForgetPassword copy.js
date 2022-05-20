import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
// import { isEmpty, isNil } from 'ramda'
// import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
import ForgetPasswordAction from '../../features/ForgetPassword/redux'
import LoginActions from 'core/Containers/Login/redux'
import { isLoggedIn } from 'core/Utils/Utils'
// import LoginActions, { LoginSelectors } from './redux'
// import ForgetPassword from '../../Containers/ForgetPassword'

const Loading = connect((state, ownProps) => ({ loading: state.forgetpassword.SubmitEmail.loading }))((props) => {
  const { loading } = props
  if (!loading) return null
  return (
    <div className='overlay'>
      <i className='fas fa-2x fa-sync-alt fa-spin' />
    </div>
  )
})

function PageLogin ({
  errors,
  forgetpasswordSubmitEmail,
  successMessage,
  userPrivileges,
  loginCheckLogin
}) {
  // componentDidMount
  React.useEffect(() => {
    loginCheckLogin({})
  }, [])
  const emailEl = React.useRef(null)
  if (isLoggedIn() === true && userPrivileges.length > 0) return window.open(`${AppConfig.basePath}${AppConfig.appHomePage}`, '_self', true)
  else console.log('return component')
  return (
    <div className='login-box'>
      <Helmet>
        <title>Lupa Kata Sandi</title>
        <body className='hold-transition login-page' />
      </Helmet>
      <div className='login-box'>
        <div className='card card-outline card-primary'>
          <div className='card-header text-center'>
            <Link to='/' className='h1'><b>{AppConfig.appName}</b></Link>
          </div>
          <div className='card-body register-card-body'>
            <p className='login-box-msg' style={{ paddingBottom: 0 }}>Lupa Kata Sandi?.</p>
            <p className='login-box-msg'>Masukan Email anda</p>
            {errors.length > 0 && <div className='alert alert-danger' role='alert'>{errors.map(v => (v || {}).message)}</div>}
            {errors.length === 0 && successMessage && <div className='alert alert-success' role='alert'>{successMessage}</div>}
            <form onSubmit={(e) => { if (e) e.preventDefault(); forgetpasswordSubmitEmail({ email: emailEl.current.value }) }}>
              <div className='input-group mb-3'>
                <input type='email' className='form-control' placeholder='Email' required style={{ textalign: 'center' }} ref={emailEl} />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope' />
                  </div>
                </div>
              </div>
              <center>
                <button style={{ width: '100%' }} type='submit' className='btn btn-primary btn-block btn-flat' required>Submit</button>
                {/* {isRequest && <Loader loading />} */}
              </center>
            </form>
          </div>
          <Loading />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.forgetpassword.SubmitEmail.errors || [],
    successMessage: state.forgetpassword.SubmitEmail.successMessage,
    userPrivileges: state.myprofile.user_privileges
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetpasswordSubmitEmail: data => dispatch(ForgetPasswordAction.forgetpasswordSubmitEmail(data)),
    loginCheckLogin: data => dispatch(LoginActions.loginCheckLogin(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageLogin)
