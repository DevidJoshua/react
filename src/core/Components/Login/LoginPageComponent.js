import React from 'react'
import { isEmpty, isNil } from 'ramda'
import Loader from '../Loader/Loader'

class LoginPageComponent extends React.Component {
  state = {
    password: '',
    email: '',
    grant_type: 'password',
    username: '',
    client_id: '',
    formSubmitMessage: ''
  }

  constructor (props) {
    super(props)
    this.state = {
      formSubmitMessage: this.props.formSubmitMessage
    }
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  componentWillUnmount () {
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  componentDidMount (prevProps) {
    this.props.loginPatch({ responseMessage: '', responseCode: '', responseDescription: '' })
  }

  handleChange = (e, { name, value }) => {
    var newSt = {}
    newSt[name] = value
    if (name === 'email') {
      newSt.username = value
      newSt.client_id = value
    }
    this.setState(newSt)
  }

  handleSubmit = () => {
    const { username, password } = this.state
    // encrypt password
    const submittedData = {
      grant_type: this.state.grant_type,
      username,
      password,
      client_id: this.state.client_id
    }
    this.setState(submittedData)
    this.props.loginDoLogin(submittedData)
  }

  _formOnSubmit (e) {
    if (e) e.preventDefault()
    const email = this.refs.email.value
    const pass = this.refs.pass.value
    this.props.loginDoLogin({
      userid: email,
      password: pass
    })
    return false
  }

  isEmptyOrNull (str) {
    return isEmpty(str) || isNil(str)
  }

  render () {
    return (
      <form onSubmit={(e) => this._formOnSubmit(e)}>
        {!this.isEmptyOrNull(this.props.responseCode) && this.props.responseCode === 'MBDD00' &&
          (
            <div className='row'>
              <div className='col-md-12'>
                <div className='alert alert-success' role='alert'>
                  {this.props.responseDescription}
                </div>
              </div>
            </div>
          )}
        {!this.isEmptyOrNull(this.props.responseCode) && this.props.responseCode !== 'MBDD00' &&
          (
            <div className='row'>
              <div className='col-md-12'>
                <div className='alert alert-danger' role='alert'>
                  {this.props.responseDescription}
                </div>
              </div>
            </div>
          )}
        <div className='form-group has-feedback'>
          {/* <input type='email' className='form-control' placeholder='Email' ref='email' required /> */}
          <span className='glyphicon glyphicon-envelope form-control-feedback' />
        </div>
        <div className='form-group has-feedback'>
          <input type='password' className='form-control' placeholder='Kata Sandi' ref='pass' required />
          <span className='glyphicon glyphicon-lock form-control-feedback' />
        </div>
        <div className='row'>
          <div className='col-xs-8'>
            <div className='checkbox icheck'>
            </div>
          </div>
          <div className='col-xs-4'>
            {!this.props.isRequesting && <button type='submit' className='btn btn-block btn-primary btn-xs'> In</button>}
            {this.props.isRequesting && <Loader loading />}
          </div>
        </div>
      </form>
    )
  }
}

export default LoginPageComponent
