import React, { Component } from 'react'
// import moment from 'moment'
import { useHistory } from 'react-router-dom'
// import Clock from 'react-live-clock'
// import { isNullOrUndefined } from 'util'
import { connect } from 'react-redux'

import { injectIntl } from 'react-intl'
import TablepaginationActions from '../../features/TablePagination/redux'
// import AppConfig from '../../Config/AppConfig'
// import {Images} from '../../Themes'
// import AppConfig from '../../Config/AppConfig'
// import { getAccessToken, getUserPrivName } from '../../Utils/Utils'

// const useravatar = Images.useravatar
class HeaderComponent extends Component {
  render () {
    // const timezone = moment.tz.guess()
    // const relates = this.props.relates
    const { apiVersion, loading, formSchema, redirectAfterUpsert, history, payload, fileArray, serviceName, tablepaginationResetForm, tablepaginationSubmitForm } = this.props
    console.log('loadingloadingloadingloading=>', redirectAfterUpsert)
    const isLoading = typeof loading !== 'undefined' && loading
    return (
      <>
        <nav className='fixed-top bg-light main-header navbar navbar-expand navbar-white navbar-light'>
          <span className='navbar-brand'>Simpan perubahan?</span>
          <form className='form-inline navbar-nav ml-auto'>
            {/* <form className="form-inline navbar-nav ml-auto"> */}
            {/* <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" /> */}
            <button disabled={isLoading} style={{ marginRight: 5 }} className='btn btn-outline-danger' type='button' data-toggle='modal' data-target='#modal-cancel-edit'>Batal</button>
            <button
              className='btn btn-outline-success' type='button' onClick={() => {
                tablepaginationSubmitForm({
                  payload,
                  serviceName,
                  history,
                  fileArray,
                  redirectAfterUpsert,
                  formSchema,
                  apiVersion
                })
              }}
              disabled={isLoading}
            >
              <div className='overlay dark'>
                {!isLoading && <><i className='fa fa-floppy-o' /> Simpan</>}
                {isLoading && <><i className='fas fa-1x fa-sync-alt fa-spin' /> Simpan</>}
              </div>
            </button>
          </form>
        </nav>
        <div className='modal fade' id='modal-cancel-edit'>
          <div className='modal-dialog'>
            <div className='modal-content bg-danger'>
              <div className='modal-header'>
                <h4 className='modal-title'>Konfirmasi</h4>
                <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                  <span aria-hidden='true'>×</span>
                </button>
              </div>
              <div className='modal-body'>
                <p>Konfirmasi Batal Ubah Data</p>
              </div>
              <div className='modal-footer justify-content-between'>
                <button id='buttonCloseModalCancelEdit' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
                <button
                  type='button' className='btn btn-outline-light' onClick={() => {
                  // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'trigger_send', fieldValue: 'Y' })
                  // const el = document.getElementById('buttonCloseModal')
                  // if (el) el.click()
                    tablepaginationResetForm({ serviceName, exceptDefaultFormValue: true })
                    var link = document.getElementById('buttonCloseModalCancelEdit')
                    if (link) link.click()
                  }}
                >Ya Batalkan
                </button>
              </div>
            </div>
            {/* /.modal-content */}
          </div>
          {/* /.modal-dialog */}
        </div>
      </>
    )
  }
}
export default connect(
  (state, ownProps) => {
    var serviceName = state.tablepagination.activeForm
    var payload = (state.tablepagination.payload || {})[serviceName] || {}
    var apiVersion = (state.tablepagination.apiVersion || {})[serviceName] || {}
    var loading = (state.tablepagination.loading || {})[serviceName]
    var formSchema = (state.tablepagination.formSchema || {})[serviceName] || {}
    var redirectAfterUpsert = (state.tablepagination.redirectAfterUpsert || {})[serviceName]
    var fileArray = (state.tablepagination.fileArray || {})[serviceName] || {}
    return { loading, formSchema, serviceName, payload, fileArray, redirectAfterUpsert, apiVersion }
  },
  dispatch => ({ tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)) })
)(injectIntl((props) => {
  var history = useHistory()
  return <HeaderComponent history={history} {...props} />
}))
