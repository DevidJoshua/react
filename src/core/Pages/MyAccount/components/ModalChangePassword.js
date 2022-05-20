import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import ChangePasswordActions from '../../../features/ChangePassword/redux'
import { callErrorToast } from '../../../Utils/Utils'

class ModalChangePassword extends Component {
    state={
      err: '',
      pass: '',
      pass_new: '',
      pass_new_conf: '',
      seePass: false,
      seePassConf: false,
      seePassClass: 'fas fa-eye',
      seePassConfClass: 'fas fa-eye'
    }

    constructor (props) {
      super(props)
      this._handleSubmit = this._handleSubmit.bind(this)
    //   this._form = this._form.bind(this)
    //   this._result = this._result.bind(this)
    }

    componentDidMount () {
      this.props.reset()
    }

    _handleSubmit () {
      const { pass, pass_new, pass_new_conf } = this.state
      const { userId, doResult } = this.props
      console.log('handle submit')
      if (pass_new !== pass_new_conf) {
        callErrorToast('Password konfirmasi tidak sama', 'error')
        // this.setState({ err: 'Password doesn\'t match' })
      } else if (pass_new.length <= 5) {
        callErrorToast('Gagal mengubah password. Panjang password minimal 5 karakter', 'error')
      } else {
        doResult({ password: pass, new_password: pass_new, userId })
      }
      this._clearAllInputs()
    }
    _clearAllInputs(){
      document.querySelectorAll('[id=input]').forEach(element=>{
            element.value = ''
      })
    }
    
    


    render () {
      const { error } = this.props
      return (
        <div className='modal fade' id='modal-change-password'>
          <div className='z modal-dialog'>
            <div className='modal-content bg-info'>
              <form>
                <div className='modal-header'>
                  <h4 className='modal-title'>Ganti Kata Sandi</h4>
                  <button type='button' className='close' data-dismiss='modal' aria-label='Close' onClick={()=>this._clearAllInputs()}>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  {!_.isEmpty(error) &&
                    <div className='row'>
                      <div className='col-12'>
                        <div className='alert alert-danger' role='alert'><center>{error}</center></div>
                      </div>
                    </div>}
                  {!_.isEmpty(this.state.err) &&
                    <div className='row'>
                      <div className='col-12'>
                        <div className='alert alert-danger' role='alert'><center>{this.state.err}</center></div>
                      </div>
                    </div>}
                  <div className='form-group'>
                    <label>Kata Sandi Lama</label>
                    <input type='password' className='form-control' id="input"  placeholder='Kata Sandi Lama' onChange={(e) => this.setState({ pass: e.target.value })} required />
                  </div>
                  <div className='form-group'>
                    <label>Kata Sandi Baru</label>
                    <div className='input-group'>
                      <input type={this.state.seePass ? 'text' : 'password'} id="input" className='form-control' placeholder='Kata Sandi Baru' onChange={(e) => this.setState({ pass_new: e.target.value })} required />
                      <div className='input-group-append'>
                        <span className='input-group-text'>
                          <i
                            className={this.state.seePassClass} onClick={() => {
                              if (this.state.seePass === false) { this.setState({ seePass: true, seePassClass: 'fas fa-eye-slash' }) } else { this.setState({ seePass: false, seePassClass: 'fas fa-eye' }) }
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className='form-group'>
                    <label>Konfirmasi Kata sandi baru</label>
                    <div className='input-group'>
                      <input type={this.state.seePassConf ? 'text' : 'password'} id="input" className='form-control' placeholder='Konfirmasi Password Baru' onChange={(e) => this.setState({ pass_new_conf: e.target.value })} required />
                      <div className='input-group-append'>
                        <span className='input-group-text'>
                          <i
                            className={this.state.seePassConfClass} onClick={() => {
                              if (this.state.seePassConf === false) { this.setState({ seePassConf: true, seePassConfClass: 'fas fa-eye-slash' }) } else { this.setState({ seePassConf: false, seePassConfClass: 'fas fa-eye' }) }
                            }}
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='modal-footer justify-content-between'>
                  <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal' onClick={()=>this._clearAllInputs()}>Batal</button>
                  <button type='button' className='btn btn-outline-light' onClick={(e) => this._handleSubmit()}>Kirim</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    error: state.changepassword.errors,
    userId: state.myprofile.user_id,
    email: state.changepassword.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doResult: data => dispatch(ChangePasswordActions.changepasswordSubmit(data)),
    reset: data => dispatch(ChangePasswordActions.changepasswordResetForm())
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(ModalChangePassword)
