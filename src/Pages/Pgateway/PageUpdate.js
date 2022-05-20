import React from 'react'
import { Detail, CardWrapperCon } from '../../core/features/TablePagination'
import { FieldTextArea } from '../../features/TextEditor/components'
import ContentWrapper from '../../core/Components/Layout/ContentWrapper'
import { injectIntl } from 'react-intl'
import AppConfig from '../../core/Config/AppConfig'
import { upsertPageTitle, listallPageUrl, listallPageTitle, upsertService, fields, detailService, redirectAfterDelete } from './Manifest'

const FormUpdate = (props) => {
  const {
    tablepaginationOnChangeForm,
    dataDetail,
    payload,
    upsertServiceName,
    id,
    tablepaginationResetForm,
    formTitle
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
  console.log('payloadpayloadpayload===>', payload.title)
  console.log('payloadpayloadpayload===>', dataDetail.title)
  return (
    <div className='row'>
      <div className='col-sm-6'>
        <CardWrapperCon formTitle={formTitle}>
          <div className='form-group'>
            <label htmlFor='title'>Judul PGateway</label>
            <input type='text' className='form-control' id='title' placeholder='Masukkan judul' value={typeof payload.title !== 'undefined' ? payload.title : dataDetail.title || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'title', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='pgcode'>pgcode</label>
            <input type='text' className='form-control' id='pgcode' placeholder='' value={typeof payload.pgcode !== 'undefined' ? payload.pgcode : dataDetail.pgcode || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'pgcode', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='keyid'>keyid</label>
            <input type='text' className='form-control' id='keyid' placeholder='' value={typeof payload.keyid !== 'undefined' ? payload.keyid : dataDetail.keyid || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'keyid', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='mid'>mid</label>
            <input type='text' className='form-control' id='mid' placeholder='' value={typeof payload.mid !== 'undefined' ? payload.mid : dataDetail.mid || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'mid', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='secretkey'>secretkey</label>
            <input type='text' className='form-control' id='secretkey' placeholder='' value={typeof payload.secretkey !== 'undefined' ? payload.secretkey : dataDetail.secretkey || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'secretkey', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='backendCallbackUrl'>backendCallbackUrl</label>
            <input type='text' className='form-control' id='backendCallbackUrl' placeholder='' value={typeof payload.backendCallbackUrl !== 'undefined' ? payload.backendCallbackUrl : dataDetail.backendCallbackUrl || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'backendCallbackUrl', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='frontendCallbackUrl'>frontendCallbackUrl</label>
            <input type='text' className='form-control' id='frontendCallbackUrl' placeholder='' value={typeof payload.frontendCallbackUrl !== 'undefined' ? payload.frontendCallbackUrl : dataDetail.frontendCallbackUrl || ''} onChange={e => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'frontendCallbackUrl', fieldValue: e.target.value })} />
          </div>
          <div className='form-group'>
            <label htmlFor='configs'>configs</label>
            <FieldTextArea placeholder='Konfigurasi dalam bentuk json string' forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.configs !== 'undefined' ? payload.configs : dataDetail.configs} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'configs', fieldValue: v })} idElement='configs' />
          </div>
          <div className='form-group'>
            <label htmlFor='description'>description</label>
            <FieldTextArea forProcess={typeof id !== 'undefined' ? 'update' : 'create'} dataId={id} defaultValue={typeof payload.description !== 'undefined' ? payload.description : dataDetail.description} onChange={(v) => tablepaginationOnChangeForm({ serviceName: upsertServiceName, fieldName: 'description', fieldValue: v })} idElement='description' />
          </div>
        </CardWrapperCon>
      </div>
    </div>
  )
}
function Comp (props) {
  console.log('raysaaaaaaaa')
  const { match } = props
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
      <div className='row'>
        <div className='col-md-12'>
          <Detail
            detailServiceName={detailService}
            upsertServiceName={upsertService}
            fields={fields}
            id={match.params._id}
            formTitle={upsertPageTitle}
            redirectAfterDelete={redirectAfterDelete}
            withoutWrapper
          >
            <FormUpdate formTitle={upsertPageTitle} />
          </Detail>
        </div>
      </div>
    </ContentWrapper>
  )
}
export default injectIntl(Comp)
