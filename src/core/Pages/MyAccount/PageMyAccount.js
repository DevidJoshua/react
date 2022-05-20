import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import LoginCheck from '../../Containers/Login/LoginCheck'
// PAGES
import ModalChangePassword from './components/ModalChangePassword'
// PAGES
import MyAccountAction from '../../features/myaccount/redux'
import ContentHeader from '../../Components/ContentHeader'
import Helmet from 'react-helmet'
import AppConfig from '../../Config/AppConfig'
import { connect } from 'react-redux'

class PageMyAccount extends Component {
  _clearAllInputs(){
    document.querySelectorAll('[id=input]').forEach(element=>{
          element.value = ''
    })
  }
  render () {
    const menu = [
      { page: 'Ganti Kata Sandi', action: this.props.doResult({ page: 'changePassword' }), modalid: 'modal-change-password' }
      // { page: 'Change Email', action: this.props.doResult({page:'changeEmail'}),modalid:'modal-change-email' }
    ]
    
    return (
      <>
        <LoginCheck />
        <Helmet>
          <title>Akun Saya</title>
          <body className='hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed' />
        </Helmet>
        <div className='xxcontent-wrapper'>
          <ContentHeader
            title='Akun Saya'
            breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage, active: true }, { title: 'Akun Saya', active: true }]}
          />
          <section className='content'>
            {/* <ChangePassword /> */}
            <div className='container-fluid'>
              <div className='card card-primary'>
                <div className='card-body'>
                  <ul className='list-group list-group-unbordered mb-3'>
                    <li className='list-group-item'>
                      <b>Email</b> <span className='float-right'>{this.props.email}</span>
                    </li>
                    {menu.map((r, i) => {
                      return (
                        <li key={i} className='list-group-item'>
                          <b>{r.page}</b> <span className='float-right btn btn-outline-secondary btn-sm' data-target={'#' + r.modalid} data-widget='control-sidebar' data-toggle='modal' onClick={()=>this._clearAllInputs()}>Ganti</span>
                        </li>
                      )
                    })}

                    {/* <li class="list-group-item">
                                              <b>Change Password</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li>
                                          {/* <li class="list-group-item">
                                              <b>Change Password</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li>
                                          <li class="list-group-item">
                                              <b>Change Email</b> <a class="float-right btn btn-outline-secondary btn-sm">Change</a>
                                          </li> */}

                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
        <ModalChangePassword />
      </>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state.dashboard)

  return {
    // error: state.rptransaction.errors,
    // statusFetchUser: state.rptransaction.statu,
    email: state.myprofile.email
  }
}
const mapDispatchToProps = dispatch => {
  return {
    doResult: data => dispatch(MyAccountAction.doEditAccount())
  }
}
export default connect(
  mapStateToProps, mapDispatchToProps
)(PageMyAccount)
