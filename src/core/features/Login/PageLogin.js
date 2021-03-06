
import React from 'react'
import Helmet from 'react-helmet'
import _ from 'lodash'
import AppConfig from '../../Config/AppConfig'
import Loader from '../../Components/Loader/Loader'
// import LoginPageComponent from './LoginComponent'

class LoginPage extends React.Component {
  render () {
    const {
      formOnSubmit,
      responseMessage,
      isRequesting,
      valueOnChange,
      history
    } = this.props
    return (
      <div className='login-box'>
        <Helmet>
          <title>Masuk</title>
          <body className='hold-transition login-page' />
        </Helmet>
        <div className='card'>
          <div className='card-body login-card-body'>
            <p className='login-box-msg'><b>{AppConfig.appName}</b></p>
            <form onSubmit={(e) => formOnSubmit({ e })}>
              {!_.isEmpty(responseMessage) &&
                <div className='row'>
                  <div className='col-12'>
                    <div className='alert alert-danger' role='alert'><center>{responseMessage}</center></div>
                  </div>
                </div>}
              <div className='input-group mb-3'>
                <input type='email' className='form-control' placeholder='Email' onChange={(e) => valueOnChange({ name: 'email', value: e.target.value })} required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-envelope' />
                  </div>
                </div>
              </div>
              <div className='input-group mb-3'>
                <input type='password' className='form-control' placeholder='Password' onChange={(e) => valueOnChange({ name: 'password', value: e.target.value })} required />
                <div className='input-group-append'>
                  <div className='input-group-text'>
                    <span className='fas fa-lock' />
                  </div>
                </div>
              </div>
              <div className='col-12'>
                {!isRequesting && <button type='submit' className='btn btn-block btn-primary btn-sm'>Sign In</button>}
                {isRequesting && (<center><Loader loading type='rpmerah' /></center>)}
              </div>
              <br />
              <center><a href='javascript:;' onClick={() => history.push('/forget-password')}>Forgot your password?</a></center>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginPage
