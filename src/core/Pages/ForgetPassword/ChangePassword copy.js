import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'
// import { isEmpty, isNil } from 'ramda'
// import { injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import AppConfig from '../../Config/AppConfig'
import { callErrorToast } from '../../Utils/Utils'
import ForgetPasswordAction from '../../features/ForgetPassword/redux'
// import LoginActions, { LoginSelectors } from './redux'
// import ForgetPassword from '../../Containers/ForgetPassword'

const Loading = connect((state, ownProps) => ({ loading: state.forgetpassword.ValidateToken.loading || state.forgetpassword.SubmitNewPassword.loading }))((props) => {
  const { loading } = props
  if (!loading) return null
  return (
    <div className='overlay'>
      <i className='fas fa-2x fa-sync-alt fa-spin' />
    </div>
  )
})

function PageLogin ({
  forgetpasswordValidateToken,
  forgetpasswordSubmitNewPassword,
  errors,
  match,
  history
}) {
  console.log('errorserrorserrors=>', errors)
  const newpasswordEl = React.useRef(null)
  const confnewpasswordEl = React.useRef(null)
  React.useEffect(() => {
    // match.params.token
    // Update the document title using the browser API
    // document.title = `You clicked ${count} times`;
    forgetpasswordValidateToken({ token: match.params.token })
    console.log('tokennnnnnn', match.params.token)
  }, [forgetpasswordValidateToken, match.params.token])
  return (
    <div className='login-box'>
      <Helmet>
        <title>Lupa Kata Sandi</title>
        <body className='hold-transition login-page' />
      </Helmet>
      <div className='login-box'>
        <div className='card card-outline card-primary'>
          <div className='card-header text-center'>
            <Link to='/' class='h1'><b>{AppConfig.appName}</b></Link>
          </div>
          <div className='card-body register-card-body'>
            {/* <p className='login-box-msg' style={{ paddingBottom: 0 }}>Lupa Kata Sandi?.</p> */}
            <p className='login-box-msg'>Validasi Token</p>
            {errors.length > 0 && <div className='alert alert-danger' role='alert'>{errors.map(v => (v || {}).message)}</div>}
            {errors.length === 0 &&
              <form onSubmit={(e) => {
                if (e) e.preventDefault()
                if ((newpasswordEl.current.value || '').length < 5) { return callErrorToast('Gagal mengubah password. Panjang password minimal 5 karakter.', 'error') }
                if (newpasswordEl.current.value !== confnewpasswordEl.current.value) { return callErrorToast('Confirmasi password masih salah.', 'error') }
                forgetpasswordSubmitNewPassword({ history, newpassword: newpasswordEl.current.value, token: match.params.token })
              }}
              >
                <div className='form-group'>
                  <label htmlFor='newpassword'>Password Baru</label>
                  <input type='password' className='form-control' id='newpassword' placeholder='' ref={newpasswordEl} />
                </div>
                <div className='form-group'>
                  <label htmlFor='confnewpassword'>Konfirmasi Password Baru</label>
                  <input type='password' className='form-control' id='confnewpassword' placeholder='' ref={confnewpasswordEl} />
                </div>
                <center>
                  <button style={{ width: '100%' }} type='submit' className='btn btn-primary btn-block btn-flat' required>Submit</button>
                </center>
              </form>}
            <Link to='/login'>Kembali ke halaman Login</Link>
          </div>
          <Loading />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const ValidateTokenErrors = state.forgetpassword.ValidateToken.errors || []
  const SubmitNewPasswordErrors = state.forgetpassword.SubmitNewPassword.errors || []
  return {
    loading: (state.forgetpassword.ValidateToken.loading || state.forgetpassword.SubmitNewPassword.loading),
    errors: (ValidateTokenErrors.concat(SubmitNewPasswordErrors) || []).map(v => v).filter(v => v)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    forgetpasswordValidateToken: data => dispatch(ForgetPasswordAction.forgetpasswordValidateToken(data)),
    forgetpasswordSubmitNewPassword: data => dispatch(ForgetPasswordAction.forgetpasswordSubmitNewPassword(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PageLogin)
