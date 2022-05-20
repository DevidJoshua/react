import React from 'react'
// import Immutable from 'seamless-immutable'
import { Detail, Table } from '../../core/features/TablePagination'
// import { FieldUploadPictures } from '../../features/PictureUpload/components'
import { FieldTextArea } from '../../features/TextEditor/components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
// import { path } from 'ramda'
import { upsertPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'
import ManifestEmailBlast from '../EmailBlast/Manifest'
import ManifestCustomerEmail from '../CustomerEmail/Manifest'
import AppConfig from '../../core/Config/AppConfig'
const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm
    // fileArray
  } = props

  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({
      isInitialReset: true,
      serviceName: upsertServiceName,
      defaultFormValue,
      formSchema: {
        title: {
          type: 'string',
          validate: (v) => { if ((id && typeof v !== 'undefined' && !v) || (!id && !v)) return { errorMessage: 'Nama grup email harus diisi.' } }
        },
        insert_email_list: {
          type: 'string',
          validate: (v) => {
            if (typeof v !== 'undefined' && v) {
              // cek kalo ada karakter enter
              if (/\r|\n$/.test(v)) {
                // Newline
                return { errorMessage: 'Delimiter menggunakan "," bukan karakter Enter' }
              }
            }
          }
        },
        remove_email_list: {
          type: 'string',
          validate: (v) => {
            if (typeof v !== 'undefined' && v) {
              // cek kalo ada karakter enter
              if (/\r|\n$/.test(v)) {
                // Newline
                return { errorMessage: 'Delimiter menggunakan "," bukan karakter Enter' }
              }
            }
          }
        },
        onSuccess: () => {
          tablepaginationOnChangeForm({ serviceName: upsertServiceName, batchData: { insert_email_list: '', remove_email_list: '' } })
        }
      },
      needToRealoadAfterSubmit: [ManifestCustomerEmail.listallByBatchIdService]
    })
  }, [tablepaginationResetForm, upsertServiceName, id, tablepaginationOnChangeForm])
  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='form-group'>
          <label htmlFor='title'>Nama Grup Email</label>
          <input type='text' className='form-control' id='title' placeholder='' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
        </div>
        <div className='form-group'>
          <label htmlFor='content1'>Keterangan</label>
          <FieldTextArea forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: v })} idElement='description' />
        </div>
        <div className='form-group'>
          <label htmlFor='insert_email_list'>Daftar email yang akan dimasukkan</label>
          <FieldTextArea placeholder='contoh@gmail.com, contoh2@gmail.com' forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={payload.insert_email_list} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'insert_email_list', fieldValue: v })} idElement='insert_email_list' />
        </div>
        <div className='form-group'>
          <label htmlFor='remove_email_list'>Daftar email yang akan dikeluarkan</label>
          <FieldTextArea placeholder='contoh@gmail.com, contoh2@gmail.com' forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={payload.remove_email_list} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'remove_email_list', fieldValue: v })} idElement='remove_email_list' />
        </div>
      </div>
    </div>
  )
}

function Comp (props) {
  const { match, history } = props
  return (
    <ContentWrapper
      pageTitle={upsertPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: ManifestEmailBlast.listallPageTitle, link: ManifestEmailBlast.listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={upsertPageTitle}
      isNeedLoggedin
    >
      <div className='row'>
        <div className='col-md-6'>
          <Detail
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            id={match.params._id}
            formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
          >
            <FormUpdate />
          </Detail>
          <Table
            listallServiceName={ManifestCustomerEmail.listallByBatchIdService}
            fields={ManifestCustomerEmail.fields}
            columns={ManifestCustomerEmail.getColumns(history)}
            // createHref={ManifestEmailBatch.upsertPageUrl()}
            // createNewButtonLabel={ManifestEmailBatch.createNewButtonLabel}
            cardTitle={ManifestCustomerEmail.listallPageTitle}
            whereCondition={JSON.stringify({ batch_id: match.params._id })}
          />
        </div>
      </div>
    </ContentWrapper>
  )
}
export default Comp
