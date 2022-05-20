import React, { Component } from 'react'
import { Create as Createform } from '../../core/features/TablePagination'
import { FieldTextArea } from '../../features/TextEditor/components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { path } from 'ramda'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import AppConfig from '../../core/Config/AppConfig'

const paginationConfig = {
  serviceName: createService,
  fields: fields
}
class Comp extends Component {
  render () {
    const { history } = this.props
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
              formTitle='Buat Grup Email Customer'
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm, payload) => {
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='title'>Judul</label>
                        <input type='text' className='form-control' id='name' placeholder='Masukkan judul grup email customer' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'title', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='description'>Keterangan</label>
                        {/* <input type='text' className='form-control' id='description' placeholder='Enter content 1' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} /> */}
                        <FieldTextArea forProcess='create' defaultValue={path([paginationConfig.serviceName, 'description'], payload)} onChange={(v) => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: v })} idElement='description' />
                        {/* <textarea className='textarea' id='description' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'description', fieldValue: e.target.value })} /> */}
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
                        redirectAfterCreate: redirectAfterCreate
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
}
export default Comp
