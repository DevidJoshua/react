import React from 'react'
import { connect } from 'react-redux'
// import Immutable from 'seamless-immutable'
import { Detail, Multiselect, Table, CardWrapperCon } from '../../core/features/TablePagination'
import { FieldTextArea } from '../../features/TextEditor/components'
// import Loader from '../../core/Components/Loader/Loader'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
// import { path } from 'ramda'
import AppConfig from '../../core/Config/AppConfig'
import { upsertPageUrl, deleteService, upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'
import TokoOnlineManifest from '../TokoOnline/Manifest'
import EmailBatchManifest from '../EmailBatch/Manifest'
import ManifestCustomerEmail from '../CustomerEmail/Manifest'
import TablepaginationActions from '../../core/features/TablePagination/redux'

const ButtonSaveAndSendEmail = connect(
  (state, ownProps) => {
    var serviceName = ownProps.upsertServiceName
    var formSchema = (state.tablepagination.formSchema || {})[serviceName] || {}
    var redirectAfterUpsert = (state.tablepagination.redirectAfterUpsert || {})[serviceName]
    var fileArray = (state.tablepagination.fileArray || {})[serviceName] || {}
    return { formSchema, serviceName, fileArray, redirectAfterUpsert }
  },
  dispatch => ({ tablepaginationSubmitForm: data => dispatch(TablepaginationActions.tablepaginationSubmitForm(data)) })
)((props) => {
  const {
    tablepaginationSubmitForm,
    upsertServiceName,
    history,
    payload,
    redirectAfterUpsert,
    formSchema
  } = props
  return (
    <>
      <button type='button' className='btn btn-block bg-gradient-info btn-lg' data-toggle='modal' data-target='#modal-send-email'>Simpan dan Kirim</button>
      <div className='modal fade' id='modal-send-email'>
        <div className='modal-dialog'>
          <div className='modal-content bg-danger'>
            <div className='modal-header'>
              <h4 className='modal-title'>Konfirmasi</h4>
              <button type='button' className='close' data-dismiss='modal' aria-label='Close'>
                <span aria-hidden='true'>×</span>
              </button>
            </div>
            <div className='modal-body'>
              <p>Konfirmasi Kirim Email</p>
            </div>
            <div className='modal-footer justify-content-between'>
              <button id='buttonCloseModal' type='button' className='btn btn-outline-light' data-dismiss='modal'>Cancel</button>
              <button
                type='button' className='btn btn-outline-light' onClick={() => {
                  // tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'trigger_send', fieldValue: 'Y' })
                  // const el = document.getElementById('buttonCloseModal')
                  // if (el) el.click()
                  tablepaginationSubmitForm({
                    payload: { ...payload, trigger_send: 'Y' },
                    serviceName: upsertServiceName,
                    history,
                    redirectAfterUpsert,
                    formSchema
                  })
                  var link = document.getElementById('buttonCloseModal')
                  if (link) link.click()
                }}
              >Kirim
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>
    </>
  )
})

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    history,
    tablepaginationResetForm,
    formTitle
    // history
  } = props
  // useMemo(() => tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } }), [])
  React.useEffect(() => {
    const defaultFormValue = {}
    if (id) defaultFormValue._id = id
    tablepaginationResetForm({ isInitialReset: true, serviceName: upsertServiceName, defaultFormValue })
    // if (id) tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: '_id', fieldValue: id, resetValue: id })
  }, [tablepaginationResetForm, upsertServiceName, id])
  // if (dataDetail) {
  //   tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: id } })
  // }
  // if (dataDetail) {
  // useMemo(() => {
  //   return tablepaginationResetForm({ serviceName: upsertServiceName, defaultFormValue: { _id: dataDetail._id } })
  // }, [upsertServiceName, tablepaginationResetForm, dataDetail])
  // }
  // const [payloadValueOriginal, setPayloadValueOriginal] = React.useState([])
  // console.log('payloadpayloadpayload===>', payload.title)
  // console.log('payloadpayloadpayload===>', dataDetail.title)
  return (
    <>
      <div className='row'>
        <div className='col-sm-6'>
          <CardWrapperCon formTitle={formTitle}>
            <div className='form-group'>
              <label htmlFor='name'>Nama Email</label>
              <input type='text' className='form-control' id='name' placeholder='' value={typeof payload.name !== 'undefined' ? payload.name : dataDetail.name || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'name', fieldValue: e.target.value })} />
            </div>
            <div className='form-group'>
              <label htmlFor='subject'>Subject</label>
              <input type='text' className='form-control' id='subject' placeholder='' value={typeof payload.subject !== 'undefined' ? payload.subject : dataDetail.subject || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'subject', fieldValue: e.target.value })} />
            </div>
            <div className='form-group'>
              <label htmlFor='toko_id'>Pilih Toko</label>
              <br />
              {/* <Combobox
                className='form-control'
                label='pilih toko'
                labelButton='Pilih'
                labelColumn='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='name'
                getColumns={({ onChange }) => [
                  { Header: 'Nama Toko', accessor: 'name' }
                ]}
                listallServiceName={TokoOnlineManifest.listallService}
                upsertServiceName={upsertServiceName}
                fields={TokoOnlineManifest.fields}
                defaultValue={typeof payload.toko_id !== 'undefined' ? payload.toko_id : (dataDetail.toko_id || {})._id}
                onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val })}
              /> */}
              <Multiselect
                isMulti={false}
                className='form-control'
                label='Pilih Toko'
                labelButton='Pilih'
                labelColumn='Pilih'
                placeholder='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='name'
                payloadValue={payload.toko_id}
                defaultValueOriginal={dataDetail.toko_id}
                getColumns={({ onChange }) => []}
                listallServiceName={TokoOnlineManifest.listallService}
                fields={TokoOnlineManifest.fields}
                onChange={({ val }) => {
                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'toko_id', fieldValue: val })
                }}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='email_batch_id'>Grup Email Tujuan</label>
              <br />
              <Multiselect
                isMulti={false}
                className='form-control'
                label='Pilih Grup Email Tujuan'
                labelButton='Pilih'
                labelColumn='Pilih'
                placeholder='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='title'
                payloadValue={payload.email_batch_id}
                defaultValueOriginal={dataDetail.email_batch_id}
                getColumns={({ onChange }) => []}
                listallServiceName={EmailBatchManifest.listallService}
                fields={EmailBatchManifest.fields}
                onChange={({ val }) => {
                  tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'email_batch_id', fieldValue: val })
                }}
              />
              {/* <Combobox
                className='form-control'
                label='pilih grup email'
                labelButton='Pilih'
                labelColumn='Pilih'
                optionColumnValue='_id'
                optionColumnLabel='title'
                getColumns={({ onChange }) => [
                  { Header: 'Nama Grup Email', accessor: 'title' }
                ]}
                listallServiceName={EmailBatchManifest.listallService}
                upsertServiceName={upsertServiceName}
                fields={EmailBatchManifest.fields}
                defaultValue={typeof payload.email_batch_id !== 'undefined' ? payload.email_batch_id : (dataDetail.email_batch_id || {})._id}
                onChange={({ val }) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'email_batch_id', fieldValue: val })}
              /> */}
              {/* <br />
              <TableCon
                columns={CustomerEmailManifest.getColumns(history)}
                listallServiceName={CustomerEmailManifest.listallByBatchIdService}
                fields={CustomerEmailManifest.fields}
                history={history}
                whereCondition={JSON.stringify({ batch_id: payload.email_batch_id || (dataDetail.email_batch_id || {})._id })}
              >
                <CustomerEmail />
              </TableCon> */}
            </div>
            <div className='form-group'>
            <label htmlFor='content1'>Isi Email</label>
            <FieldTextArea textEditor forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} initValue={dataDetail.content1} defaultValue={typeof payload.content1 !== 'undefined' ? payload.content1 : dataDetail.content1} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'content1', fieldValue: v })} idElement='content1' />
          </div>
          </CardWrapperCon>
        </div>
        <div className='col-sm-6'>
          {(dataDetail.email_batch_id || {})._id &&
            <Table
              listallServiceName={ManifestCustomerEmail.listallByBatchIdService}
              fields={ManifestCustomerEmail.fields}
              columns={ManifestCustomerEmail.getColumns(history)}
              // createHref={ManifestEmailBatch.upsertPageUrl()}
              // createNewButtonLabel={ManifestEmailBatch.createNewButtonLabel}
              cardTitle={ManifestCustomerEmail.listallPageTitle}
              whereCondition={JSON.stringify({ batch_id: payload.email_batch_id !== undefined ? payload.email_batch_id : (dataDetail.email_batch_id || {})._id })}
            />}
        </div>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <ButtonSaveAndSendEmail
            upsertServiceName={upsertServiceName}
            history={history}
            payload={payload}
          />
          <br />
        </div>
      </div>
    </>
  )
}

function Comp (props) {
  const { match, history } = props
  // const [dataDetail, setDataDetail] = React.useState([])
  // const [dataId, setDataId] = React.useState('')
  // const [servicePayload, setServicePayload] = React.useState({})
  // useEffect(() => {
  //   const pLoad = servicePayload[paginationConfig.serviceName] || {}
  //   if (pLoad.trigger_send === 'Y' || pLoad.trigger_send === 'N') {
  //     const el = document.getElementById('button-submit-form')
  //     if (el) el.click()
  //   }
  // }, [servicePayload])
  // useEffect(() => {
  //   if (tablepaginationOnChangeFormFunc) {
  //     const dDetail = Immutable.asMutable(path([paginationConfig.serviceName], dataDetail) || {}, { deep: true })
  //     tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'name', fieldValue: dDetail.name || '' })
  //     tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'subject', fieldValue: dDetail.subject || '' })
  //     tablepaginationOnChangeFormFunc({ serviceName: paginationConfig.serviceName, fieldName: 'content1', fieldValue: dDetail.content1 || '' })
  //     setDataId('' + dDetail._id)
  //   }
  // }, [dataDetail])
  return (
    <ContentWrapper
      pageTitle={upsertPageTitle}
      breadcrumb={[
        { title: 'Beranda', link: AppConfig.appHomePage },
        { title: listallPageTitle, link: listallPageUrl() },
        { title: upsertPageTitle, link: null, isActive: true }
      ]}
      contentHeaderTitle={upsertPageTitle}
      isNeedLoggedin
    >
      <Detail
        detailServiceName={detailService}
        upsertServiceName={upsertService}
        deleteServiceName={deleteService}
        createPageUrl={upsertPageUrl()}
        fields={fields}
        id={match.params._id}
        formTitle={upsertPageTitle}
        redirectAfterDelete={redirectAfterDelete}
        withoutWrapper
      >
        <FormUpdate formTitle={upsertPageTitle} history={history} />
      </Detail>
    </ContentWrapper>
  )
  // }
}
export default injectIntl(Comp)
