import React, { useEffect } from 'react'
import { Create as Createform } from '../../core/features/TablePagination'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { createService, fields, createPageTitle } from './Manifest'
import ManifestEmailBatch from '../EmailBatch/Manifest'
import AppConfig from '../../core/Config/AppConfig'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}

let tablepaginationOnChangeFormFunc = null
function Comp (props) {
  const { history, match } = props

  useEffect(() => {
    tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'batch_id', fieldValue: match.params.batch_id || '' })
  })

  return (
    <ContentWrapper
      pageTitle={createPageTitle}
      breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Daftar Email Blast', link: '/emailblast' }, { title: 'Buat Daftar Email Customer', link: null, isActive: true }]}
      contentHeaderTitle={createPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-12'>
          <Createform
            formTitle={createPageTitle}
            paginationConfig={paginationConfig}
            redirectAfterCreateToParent={`${ManifestEmailBatch.redirectAfterCreate}/${match.params.batch_id}`}
            gotoParent
            child={(tablepaginationOnChangeForm) => {
              tablepaginationOnChangeFormFunc = tablepaginationOnChangeForm
              return (
                <div className='row'>
                  <div className='col-sm-6'>
                    <div className='form-group'>
                      <label htmlFor='title'>Email</label>
                      <input type='text' className='form-control' id='name' placeholder='Masukkan judul grup email customer' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'email', fieldValue: e.target.value })} />
                    </div>
                  </div>
                </div>
              )
            }}
            footerCard={({ tablepaginationSubmitForm, payload }) => {
              return (
                <>
                  <button style={{ width: 100 }} type='button' className='btn bg-gradient-warning' onClick={e => history.goBack()}>Batal</button>
                  <button
                    style={{ width: 100, marginLeft: 5 }} type='button' className='btn bg-gradient-primary' onClick={(e) => tablepaginationSubmitForm({
                      fields: paginationConfig.fields,
                      payload,
                      serviceName: paginationConfig.serviceName,
                      history,
                      redirectAfterCreateToParent: `${ManifestEmailBatch.redirectAfterCreate}/${match.params.batch_id}`
                    })}
                  >Kirim
                  </button>
                </>
              )
            }}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}
export default Comp
