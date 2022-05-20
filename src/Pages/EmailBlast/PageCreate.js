import React, { Component } from 'react'
import { Create as Createform, Combobox } from '../../core/features/TablePagination'
import { FieldTextArea } from '../../features/TextEditor/components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { path } from 'ramda'
import { createService, fields, createPageTitle, redirectAfterCreate } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import EmailBatchManifest from '../EmailBatch/Manifest'
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
        breadcrumb={[{ title: 'Beranda', link: AppConfig.appHomePage }, { title: 'Daftar Email Blast', link: '/emailblast' }, { title: 'Buat Email Blast Baru', link: null, isActive: true }]}
        contentHeaderTitle={createPageTitle}
        isNeedLoggedin
      >
        <div className='row'>
          <div className='col-md-12'>
            <Createform
              formTitle='Buat Email Blast Baru'
              paginationConfig={paginationConfig}
              redirectAfterCreate={redirectAfterCreate}
              child={(tablepaginationOnChangeForm, payload) => {
                return (
                  <div className='row'>
                    <div className='col-sm-6'>
                      <div className='form-group'>
                        <label htmlFor='name'>Nama Email</label>
                        <input type='text' className='form-control' id='name' placeholder='Masukkan nama email' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='subject'>Subject</label>
                        <input type='text' className='form-control' id='subject' placeholder='Masukkan subject email' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'subject', fieldValue: e.target.value })} />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='parent_id'>Dikirim dari toko:</label>
                        {/* <input type='text' className='form-control' id='grading_id' placeholder='Enter grading code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })} /> */}
                        <br />
                        <Combobox
                          className='form-control'
                          label='Pilih Toko'
                          labelButton='Pilih'
                          labelColumn='Pilih'
                          optionColumnValue='_id'
                          optionColumnLabel='name'
                          getColumns={({ onChange }) => [
                            { Header: 'Nama Toko', accessor: 'name' }
                          ]}
                          serviceName={TokoOnlineManifest.listallService}
                          fields={TokoOnlineManifest.fields}
                          // defaultValue={payload.toko_id}
                          onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: val })}
                        />
                        {/* <Combobox
                          label='Pilih Toko'
                          name='toko_id'
                          id='toko_id'
                          maxOptions={50}
                          fetchDataConfig={{
                            serviceName: TokoOnlineManifest.listallService,
                            fields: TokoOnlineManifest.fields
                          }}
                          optionColumnValue='_id'
                          optionColumnLabel='name'
                          defaultValue=''
                          onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'toko_id', fieldValue: e.target.value })}
                        /> */}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='email_batch_id'>Daftar Email Tujuan:</label>
                        <br />
                        <Combobox
                          className='form-control'
                          label='Pilih Email Grup'
                          labelButton='Pilih'
                          labelColumn='Pilih'
                          optionColumnValue='_id'
                          optionColumnLabel='title'
                          getColumns={({ onChange }) => [
                            { Header: 'Nama Email Grup', accessor: 'title' }
                          ]}
                          serviceName={EmailBatchManifest.listallService}
                          fields={EmailBatchManifest.fields}
                          // defaultValue={payload.toko_id}
                          onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'email_batch_id', fieldValue: val })}
                        />
                        {/* <input type='text' className='form-control' id='grading_id' placeholder='Enter grading code' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'grading_id', fieldValue: e.target.value })} /> */}
                        {/* <Combobox
                          label='Pilih Email Grup'
                          name='email_batch_id'
                          id='email_batch_id'
                          maxOptions={50}
                          fetchDataConfig={{
                            serviceName: EmailBatchManifest.listallService,
                            fields: EmailBatchManifest.fields
                          }}
                          optionColumnValue='_id'
                          optionColumnLabel='title'
                          defaultValue=''
                          onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'email_batch_id', fieldValue: e.target.value })}
                        /> */}
                      </div>
                      <div className='form-group'>
                        <label htmlFor='content1'>Body</label>
                        {/* <input type='text' className='form-control' id='content1' placeholder='Enter content 1' onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
                        <FieldTextArea textEditor forProcess='create' defaultValue={path([paginationConfig.serviceName, 'content1'], payload)} onChange={(v) => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: v })} idElement='content1' />
                        {/* <textarea className='textarea' id='content1' placeholder='Place some text here' style={{ width: '100%', height: 200, fontSize: 14, lineHeight: 18, border: '1px solid #dddddd', padding: 10 }} onChange={e => tablepaginationOnChangeForm({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: e.target.value })} /> */}
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
                    >simpan
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
// export default CreateTokoProduct

export default Comp
